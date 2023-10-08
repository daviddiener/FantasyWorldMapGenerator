import getNoise from "./simplexNoise";
import { spiralOut, spiralOutPerformance } from "./spiralOut";

export default class SettingsScene extends Phaser.Scene {
    mainScene:any
    settingsPanel: Phaser.GameObjects.Container;
    debug_checkbox = false;
    rivers_checkbox = false;
    regions_amount = 100;
    seed = '';
    jsonData = require('../../assets/world100.json');

    constructor() {
      super({ key: 'SettingsScene' });
    }

    preload() {
        // Load the checkbox textures
        this.load.image('checkbox', 'assets/checkbox.png');
        this.load.image('checkbox_checked', 'assets/checkbox_checked.png');
    }
    
    create() {  
        this.mainScene = this.scene.get('MainScene');

        // Center the settings panel on the screen
        const panelX = this.cameras.main.centerX;
        const panelY = this.cameras.main.centerY;
        this.settingsPanel = this.add.container(panelX, panelY);

        // Create a background for the settings panel
        const panelBackground = this.add.graphics();
        panelBackground.fillStyle(0xffffff, 0.7);
        panelBackground.fillRect(-150, -100, 300, 300); // Adjust the size as needed
        panelBackground.setDepth(200);

        this.settingsPanel.add(panelBackground);

        // Create checkboxes
        const debug_checkbox_text = this.add.text(-110, -90, 'Enable Debug Mode', { color: '#000' });
        const rivers_checkbox_text = this.add.text(-110, -70, 'Create Rivers', { color: '#000' });
        const debug_checkbox_sprite = this.add.sprite(-130, -80, 'checkbox').setScale(0.02).setInteractive();
        const rivers_checkbox_sprite = this.add.sprite(-130, -60, 'checkbox').setScale(0.02).setInteractive();

        const seedInput = this.add.dom(-90, -20, 'input', {
            type: 'text',
            width: '100px',
            fontSize: '14px',
            color: '#000',
        });

        const seedText = this.add.dom(40, -30, 'p', {
            width: '100px',
            fontSize: '14px',
            color: '#000',
        }, 'SEED (default: random_seed_123123)');
        
        const regionNumberInput = this.add.dom(-90, 10, 'input', {
            type: 'number',
            width: '100px',
            fontSize: '14px',
            color: '#000',
        });

        const regionNumberText = this.add.dom(40, 0, 'p', {
            width: '100px',
            fontSize: '14px',
            color: '#000',
        }, 'Region Number (default: 100)');


        // Add components to the settings panel
        this.settingsPanel.add(seedInput);
        this.settingsPanel.add(seedText);
        this.settingsPanel.add(regionNumberInput);
        this.settingsPanel.add(regionNumberText);
        this.settingsPanel.add(debug_checkbox_sprite);
        this.settingsPanel.add(rivers_checkbox_sprite);
        this.settingsPanel.add(debug_checkbox_text);
        this.settingsPanel.add(rivers_checkbox_text);

        this.settingsPanel.add(this.add.text(0, 50, 'Seed New Map', { backgroundColor: '#000', color: '#fff' })
                                        .setInteractive()
                                        .setDepth(200)
                                        .on('pointerdown', () => this.createJsonData())
        );
    
        // Handle input field events
        debug_checkbox_sprite.on('pointerdown', () => {
            this.debug_checkbox = !this.debug_checkbox;
            toggleCheckbox(debug_checkbox_sprite, this.debug_checkbox);
            this.mainScene.createMap(this.debug_checkbox, this.rivers_checkbox, this.jsonData)
        });
    
        rivers_checkbox_sprite.on('pointerdown', () => {
            this.rivers_checkbox = !this.rivers_checkbox;
            toggleCheckbox(rivers_checkbox_sprite, this.rivers_checkbox);
            this.mainScene.createMap(this.debug_checkbox, this.rivers_checkbox, this.jsonData)
        });

        // Handle events for input fields (e.g., input changes)
        seedInput.addListener('input'); // Listen for input events
        regionNumberInput.addListener('input'); // Listen for input events

        seedInput.on('input', (event) => {
            this.seed = event.target.value;
        });
        
        regionNumberInput.on('input', (event) => {
            this.regions_amount = parseFloat(event.target.value);
        });
    
        // Function to toggle the checkbox state
        function toggleCheckbox(checkbox, value) {
            if (value) {
            checkbox.setTexture('checkbox_checked');
            } else {
            checkbox.setTexture('checkbox');
            }
        }
    
        // Hide the settings panel initially
        this.settingsPanel.setVisible(true);
    
    }

    toggleVisibility() {
        this.settingsPanel.setVisible(!this.settingsPanel.visible);
    }

    createJsonData() {
        this.jsonData = []

        // iteriere von 0 bis 100
        for (let i = 0; i < this.regions_amount; i++) {
            let coordinates
            if(i === 0) {
                coordinates = spiralOut(0)
            } else {
                coordinates = spiralOutPerformance()
            }

            this.jsonData.push(this.setRegionNoise(coordinates))
        }

        this.mainScene.createMap(this.debug_checkbox, this.rivers_checkbox, this.jsonData)
    }

    setRegionNoise(coordinates: number[]): any {
        let newRegion:any = {};

        newRegion.x = coordinates[0];
        newRegion.y = coordinates[1];
        newRegion.noise = getNoise(newRegion.x, newRegion.y, 0.05, this.seed);
      
        if (newRegion.noise < 0) {
          newRegion.type = 'water';
        } else if (newRegion.noise < 0.1) {
          newRegion.type = 'sand';
        } else if (newRegion.noise < 0.6) {
          newRegion.type = 'grass';
        } else if (newRegion.noise < 0.7) {
          newRegion.type = 'snow';
        } else if (newRegion.noise < 0.85) {
          newRegion.type = 'mountain';
        } else if (newRegion.noise < 0.95) {
          newRegion.type = 'mountainpeak';
        }
      
        if (newRegion.type === 'water') {
          newRegion.cities = [];
          newRegion.name = 'The Sea';
        }
      
        return newRegion;
      }
  }
  