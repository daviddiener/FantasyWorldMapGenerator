import { Delaunay } from "d3-delaunay";
import seedrandom from 'seedrandom';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';

export default class MainScene extends Phaser.Scene {

    settingsScene:any

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        this.scene.launch('SettingsScene'); // Start the SettingsScene
        this.settingsScene = this.scene.get('SettingsScene'); // Get the SettingsScene
        this.createMap(false, false, require('../../assets/world100.json'))
    }

    createMap(debug, rivers, jsonData) {
        this.clearMap();
        
        function calculateScaleFactorForDesiredRange(data: any[], desiredRange: number): number {
            // Calculate the minimum and maximum x and y coordinates of the original points
            let minX = Number.POSITIVE_INFINITY;
            let minY = Number.POSITIVE_INFINITY;
            let maxX = Number.NEGATIVE_INFINITY;
            let maxY = Number.NEGATIVE_INFINITY;
        
            for (const point of data) {
                const originalX = point.x; // Replace with the appropriate property names
                const originalY = point.y;
        
                minX = Math.min(minX, originalX);
                minY = Math.min(minY, originalY);
                maxX = Math.max(maxX, originalX);
                maxY = Math.max(maxY, originalY);
            }
        
            // Calculate the range of x and y coordinates for the original points
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;
        
            // Calculate the scale factor based on the desired range
            const scaleFactor = desiredRange / Math.max(rangeX, rangeY);
        
            return scaleFactor;
        }
        
        const desiredRange = 950; // Replace with your desired range
        const SCALE_FACTOR = calculateScaleFactorForDesiredRange(jsonData, desiredRange);
        

        
        // Function to find downhill path for a river
        const findDownhillPath = (startIdx: number, points: any[], voronoi: any) => {
            const visited = new Set<number>();
            let currentIdx = startIdx;
            const riverPath: number[][] = [];

            while (true) {
                visited.add(currentIdx);
                let neighbors = voronoi.neighbors(currentIdx);
                let nextIdx: number | null = null;
                let minNoise = points[currentIdx].noise;

                for (const neighbor of neighbors) {
                    if (visited.has(neighbor)) continue;
                    if (points[neighbor].noise < minNoise) {
                        minNoise = points[neighbor].noise;
                        nextIdx = neighbor;
                    }
                }

                if (nextIdx !== null && points[nextIdx].type === 'water') {
                    riverPath.push([points[nextIdx].x, points[nextIdx].y]);  // Include the water cell
                    break;
                }

                if (nextIdx === null) break;

                riverPath.push([points[currentIdx].x, points[currentIdx].y]);
                currentIdx = nextIdx;
            }

            return riverPath;
        };
 
        // Perturb points based on noise and proximity to neighbors
        function perturbCoordinates(data: any[]): [number, number][] {
            const perturbedPoints: [number, number][] = [];
        
            for (const point of data) {
            // Find neighbors within a certain range (e.g., 1 unit)
            const neighbors = data.filter((neighbor) => {
                return Math.abs(point.x - neighbor.x) <= 1 && Math.abs(point.y - neighbor.y) <= 1;
            });
        
            // Use noise as a seed for randomness
            const rng = seedrandom(point.noise.toString());
        
            let dx = 0;
            let dy = 0;
        
            for (const neighbor of neighbors) {
                // Generate a random decimal number between -0.5 and 0.5
                const randomX = (rng() - 0.5);
                const randomY = (rng() - 0.5);
        
                // Limit the perturbation based on proximity to neighbors
                const distance = Math.sqrt(Math.pow(point.x - neighbor.x, 2) + Math.pow(point.y - neighbor.y, 2));
                const limitFactor = Math.max(0, 1 - distance);
        
                dx += randomX * limitFactor;
                dy += randomY * limitFactor;
            }
        
            // Apply the perturbation and scaling
            const perturbedX = (point.x + dx) * SCALE_FACTOR;
            const perturbedY = (point.y + dy) * SCALE_FACTOR;
        
            perturbedPoints.push([perturbedX, perturbedY]);
            }
        
            return perturbedPoints;
        }    

        // Get color based on type
        const getColor = (type: string) => {
            switch (type) {
            case 'grass': return 0x00ff00;                  
            case 'water': return 0x0000ff;                  
            case 'sand': return 0xffff00;                  
            case 'snow': return 0xffffff;                  
            case 'mountain': return 0x8B4513;                  
            case 'mountainpeak': return 0xC0C085;                  
            default: return 0xff0000;                  
            }
        };

        // Calculate bounding box
        const calculateBoundingBox = (data: [number, number][]) => {
            const xs = data.map(d => d[0]);
            const ys = data.map(d => d[1]);
            return [
            Math.min(...xs),
            Math.min(...ys),
            Math.max(...xs),
            Math.max(...ys)
            ];
        };

        // Create noise texture
        const createNoiseTexture = (width: number, height: number, noiseScale: number, alpha: number, intensity: number) => {
            const simplex = createNoise2D(alea(''));

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d')!;
            const imgData = ctx.createImageData(width, height);
        
            for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const noiseValue = (simplex(x * noiseScale, y * noiseScale) + 1) * 0.5;
                const adjustedNoiseValue = noiseValue * intensity;  // Adjust intensity here
                const idx = (y * width + x) * 4;
                imgData.data[idx] = imgData.data[idx + 1] = imgData.data[idx + 2] = adjustedNoiseValue * 255;
                imgData.data[idx + 3] = alpha * 255;
            }
            }
        
            ctx.putImageData(imgData, 0, 0);
            return canvas;
        };

        // Function to set up event handlers for a zone
        const setupZoneEvents = (zone: Phaser.GameObjects.Zone, x: number, y: number, polygon: number[][]) => {
            zone.on('pointerover', () => {
                hoverText.setText(`(${x}, ${y})`);
                hoverText.setVisible(true);
        
                // Draw the highlighted polygon
                highlightGraphics.clear();
                highlightGraphics.fillStyle(0xffffff, 0.5);
                highlightGraphics.beginPath();
                highlightGraphics.moveTo(polygon[0][0], polygon[0][1]);
                for (const [x, y] of polygon.slice(1)) {
                    highlightGraphics.lineTo(x, y);
                }
                highlightGraphics.closePath();
                highlightGraphics.fillPath();
            });
        
            zone.on('pointerout', () => {        
                // Clear the highlighted polygon
                highlightGraphics.clear();
            });
        };

        // Create Voronoi diagram
        const perturbedPoints = perturbCoordinates(jsonData);
        const delaunay = Delaunay.from(perturbedPoints);
        const bounds = calculateBoundingBox(perturbedPoints)
        const voronoi = delaunay.voronoi(bounds);
        this.cameras.main.setBounds(bounds[0], bounds[1], bounds[2], bounds[3]);

        // Create GameObjects
        const graphics = this.add.graphics({ lineStyle: { width: 5, color: 0xff0000 }}).setDepth(1);
        const hoverText = this.add.text(bounds[0], bounds[1], '', { backgroundColor: '#000', color: '#fff' }).setDepth(200);
        const highlightGraphics = this.add.graphics({ lineStyle: { width: 5 }}).setDepth(200);
        const riverGraphics = this.add.graphics({ lineStyle: { width: 3, color: 0x0000ff }}).setDepth(2);
        const debugCircleGraphics = this.add.graphics({ lineStyle: { width: 1, color: 0xff0000 }, fillStyle: { color: 0xff0000 } }).setDepth(100);
        const debugText = this.add.container().setDepth(100);

        const clickButton = this.add.text(bounds[3]-100, bounds[1], 'Settings', { backgroundColor: '#000', color: '#fff' })
        .setInteractive()
        .setDepth(200)
        .on('pointerdown', () => this.settingsScene.toggleVisibility());

        // Create noise texture and apply it as a bitmap
        const width = Math.ceil(Math.abs(bounds[0]) + Math.abs(bounds[2]))
        const height = Math.ceil(Math.abs(bounds[1]) + Math.abs(bounds[3]))
        const noiseTexture = createNoiseTexture(width, height, 0.3, 0.5, 1.2);
        const texture = this.textures.createCanvas('noise', width, height);

        texture.context.drawImage(noiseTexture, 0, 0);
        texture.refresh();
        this.add.image(bounds[0], bounds[1], 'noise').setBlendMode(Phaser.BlendModes.OVERLAY)
                .setDepth(1)
                .setOrigin(0, 0);
        
        // Draw Voronoi polygons and color them
        let index = 0

        for (let polygon of voronoi.cellPolygons()) {  
            if (polygon && polygon.length > 0) {
                graphics.fillStyle(getColor(jsonData[index].type), 1);
                graphics.beginPath();
                graphics.moveTo(polygon[0][0], polygon[0][1]);
                for (const [x, y] of polygon.slice(1)) {
                  graphics.lineTo(x, y);
                }
                graphics.closePath();
                graphics.fillPath();

                // Create a zone for this polygon
                const bounds = Phaser.Geom.Polygon.GetAABB(new Phaser.Geom.Polygon(polygon));
                const zone = this.add.zone(bounds.x, bounds.y, bounds.width, bounds.height).setOrigin(0);
                zone.setInteractive();

               // Attach event handlers to the zone
                setupZoneEvents(zone, jsonData[index].x, jsonData[index].y, polygon);

                if(debug){
                    graphics.strokePath();

                    // Draw debug circles for perturbed points
                    debugCircleGraphics.fillCircle(perturbedPoints[index][0], perturbedPoints[index][1], 5).setDepth(100)
                            
                    // Draw debug text
                    debugText.add(this.add.text(perturbedPoints[index][0], perturbedPoints[index][1]+10, `(${jsonData[index].x}, ${jsonData[index].y})`, {
                    backgroundColor: '#000',
                    })
                    .setOrigin(0.5, 0)
                    .setDepth(100))
                }    
            }

             // Check if this cell should start a river
             if (rivers && jsonData[index].type === 'mountainpeak') {
                const riverPath = findDownhillPath(index, jsonData, voronoi);
                if (riverPath.length > 1) {
                    riverGraphics.beginPath();
                    riverGraphics.moveTo(riverPath[0][0] * SCALE_FACTOR, riverPath[0][1] * SCALE_FACTOR);
                    for (let i = 1; i < riverPath.length; i++) {
                        riverGraphics.lineTo(riverPath[i][0] * SCALE_FACTOR, riverPath[i][1] * SCALE_FACTOR);
                    }
                    riverGraphics.strokePath();
                }
            }
   
            index++  
        } 
    }

    clearMap() {
        this.textures.remove('noise');
        this.children.removeAll()
    }
}