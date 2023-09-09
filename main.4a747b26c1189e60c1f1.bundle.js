/*! For license information please see main.4a747b26c1189e60c1f1.bundle.js.LICENSE.txt */
(()=>{var e,f={94:(e,f,t)=>{"use strict";t(260);var d=t(411),i=t(377),n=t.n(i),s=t(48);class o extends Phaser.Scene{constructor(){super({key:"MainScene"})}create(){const e=t(574),f=100,i=(e,f,t)=>{const d=new Set;let i=e;const n=[];for(;;){d.add(i);let e=t.neighbors(i),s=null,o=f[i].noise;for(const t of e)d.has(t)||f[t].noise<o&&(o=f[t].noise,s=t);if(null!==s&&"water"===f[s].type){n.push([f[s].x,f[s].y]);break}if(null===s)break;n.push([f[i].x,f[i].y]),i=s}return n},o=e=>{switch(e){case"grass":return 65280;case"water":return 255;case"sand":return 16776960;case"snow":return 16777215;case"mountain":return 9127187;case"mountainpeak":return 12632197;default:return 16711680}},a=(e,f,t,d)=>{e.on("pointerover",(()=>{x.setText(`(${f}, ${t})`),x.setVisible(!0),l.clear(),l.fillStyle(16777215,.5),l.beginPath(),l.moveTo(d[0][0],d[0][1]);for(const[e,f]of d.slice(1))l.lineTo(e,f);l.closePath(),l.fillPath()})),e.on("pointerout",(()=>{x.setVisible(!1),l.clear()}))},r=function(e){const t=[];for(const d of e){const i=e.filter((e=>Math.abs(d.x-e.x)<=1&&Math.abs(d.y-e.y)<=1)),s=n()(d.noise.toString());let o=0,a=0;for(const e of i){const f=s()-.5,t=s()-.5,i=Math.sqrt(Math.pow(d.x-e.x,2)+Math.pow(d.y-e.y,2)),n=Math.max(0,1-i);o+=f*n,a+=t*n}const r=(d.x+o)*f,y=(d.y+a)*f;t.push([r,y])}return t}(e),y=d.Z.from(r),b=(e=>{const f=e.map((e=>e[0])),t=e.map((e=>e[1]));return[Math.min(...f),Math.min(...t),Math.max(...f),Math.max(...t)]})(r),p=y.voronoi(b);this.cameras.main.setBounds(b[0],b[1],b[2],b[3]);const c=this.add.graphics({lineStyle:{width:5,color:16711680}}).setDepth(1),x=this.add.text(b[0],b[1],"",{backgroundColor:"#000",color:"#fff"}).setDepth(200),l=this.add.graphics({lineStyle:{width:5}}).setDepth(200),_=this.add.graphics({lineStyle:{width:3,color:255}}).setDepth(2),h=(this.add.graphics({lineStyle:{width:1,color:16711680},fillStyle:{color:16711680}}).setDepth(100),this.add.container().setDepth(100),Math.ceil(Math.abs(b[0])+Math.abs(b[2]))),u=Math.ceil(Math.abs(b[1])+Math.abs(b[3])),w=((e,f,t,d,i)=>{const n=(0,s.hA)(),o=document.createElement("canvas");o.width=e,o.height=f;const a=o.getContext("2d"),r=a.createImageData(e,f);for(let t=0;t<f;t++)for(let f=0;f<e;f++){const d=.5*(n(.3*f,.3*t)+1)*1.2,i=4*(t*e+f);r.data[i]=r.data[i+1]=r.data[i+2]=255*d,r.data[i+3]=127.5}return a.putImageData(r,0,0),o})(h,u),g=this.textures.createCanvas("noise",h,u);g.context.drawImage(w,0,0),g.refresh(),this.add.image(b[0],b[1],"noise").setBlendMode(Phaser.BlendModes.OVERLAY).setDepth(1).setOrigin(0,0);let m=0;for(let t of p.cellPolygons()){if(t&&t.length>0){c.fillStyle(o(e[m].type),1),c.beginPath(),c.moveTo(t[0][0],t[0][1]);for(const[e,f]of t.slice(1))c.lineTo(e,f);c.closePath(),c.fillPath();const f=Phaser.Geom.Polygon.GetAABB(new Phaser.Geom.Polygon(t)),d=this.add.zone(f.x,f.y,f.width,f.height).setOrigin(0);d.setInteractive(),a(d,e[m].x,e[m].y,t)}if("mountainpeak"===e[m].type){const t=i(m,e,p);if(t.length>1){_.beginPath(),_.moveTo(t[0][0]*f,t[0][1]*f);for(let e=1;e<t.length;e++)_.lineTo(t[e][0]*f,t[e][1]*f);_.strokePath()}}m++}}}const a={type:Phaser.AUTO,backgroundColor:"#ffffff",scale:{parent:"phaser-game",mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:1600,height:1200},scene:[o]};window.addEventListener("load",(()=>{new Phaser.Game(a)}))},204:()=>{console.log("%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template","background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none")},42:()=>{},574:e=>{"use strict";e.exports=JSON.parse('[{"_id":"64f90f3393eac1e75c1c486c","type":"sand","x":0,"y":0,"noise":0},{"_id":"64f90fddf551f9467fb08b84","type":"grass","x":1,"y":0,"noise":0.21440770326171876},{"_id":"64f90fddf551f9467fb08b8d","type":"sand","x":1,"y":1,"noise":0},{"_id":"64f90fddf551f9467fb08b93","type":"water","x":0,"y":1,"noise":-0.21440770326171876},{"_id":"64f90fddf551f9467fb08b9b","type":"water","x":-1,"y":1,"noise":-0.4202607543750001},{"_id":"64f90fddf551f9467fb08ba5","type":"water","x":-1,"y":0,"noise":-0.21440770326171896},{"_id":"64f90fddf551f9467fb08bad","type":"sand","x":-1,"y":-1,"noise":0},{"_id":"64f90fddf551f9467fb08bb9","type":"grass","x":0,"y":-1,"noise":0.21440770326171896},{"_id":"64f90fddf551f9467fb08bc1","type":"grass","x":1,"y":-1,"noise":0.4202607543750001},{"_id":"64f90fddf551f9467fb08bc7","type":"grass","x":2,"y":-1,"noise":0.5930451782226563},{"_id":"64f90fddf551f9467fb08bcf","type":"grass","x":2,"y":0,"noise":0.40353607},{"_id":"64f90fddf551f9467fb08bd5","type":"grass","x":2,"y":1,"noise":0.19768172607421874},{"_id":"64f90fddf551f9467fb08bdb","type":"water","x":2,"y":2,"noise":-0.00012838323696722604},{"_id":"64f90fddf551f9467fb08be3","type":"water","x":1,"y":2,"noise":-0.19768172607421874},{"_id":"64f90fddf551f9467fb08be7","type":"water","x":0,"y":2,"noise":-0.40353607},{"_id":"64f90fddf551f9467fb08bef","type":"water","x":-1,"y":2,"noise":-0.5930451782226563},{"_id":"64f90fddf551f9467fb08bf3","type":"water","x":-2,"y":2,"noise":-0.7431767164125416},{"_id":"64f90fddf551f9467fb08bfb","type":"water","x":-2,"y":1,"noise":-0.5930451782226561},{"_id":"64f90fddf551f9467fb08c05","type":"water","x":-2,"y":0,"noise":-0.40353606999999986},{"_id":"64f90fdef551f9467fb08c0d","type":"water","x":-2,"y":-1,"noise":-0.19768172607421847},{"_id":"64f90fdef551f9467fb08c11","type":"sand","x":-2,"y":-2,"noise":0.00012838323696722604},{"_id":"64f90fdef551f9467fb08c17","type":"grass","x":-1,"y":-2,"noise":0.19768172607421847},{"_id":"64f90fdef551f9467fb08c1b","type":"grass","x":0,"y":-2,"noise":0.40353606999999986},{"_id":"64f90fdef551f9467fb08c25","type":"grass","x":1,"y":-2,"noise":0.5930451782226561},{"_id":"64f90fdef551f9467fb08c2b","type":"mountain","x":2,"y":-2,"noise":0.7431800098765431},{"_id":"64f90fdef551f9467fb08c31","type":"mountain","x":3,"y":-2,"noise":0.8362452680910011},{"_id":"64f90fdef551f9467fb08c35","type":"mountain","x":3,"y":-1,"noise":0.7129081346598354},{"_id":"64f90fdef551f9467fb08c3b","type":"grass","x":3,"y":0,"noise":0.5459368244512729},{"_id":"64f90fdef551f9467fb08c3f","type":"grass","x":3,"y":1,"noise":0.3562645371024646},{"_id":"64f90fdef551f9467fb08c47","type":"grass","x":3,"y":2,"noise":0.16503909622429477},{"_id":"64f90fdef551f9467fb08c4f","type":"water","x":3,"y":3,"noise":-0.009860825007391135},{"_id":"64f90fdef551f9467fb08c55","type":"water","x":2,"y":3,"noise":-0.16910408530309384},{"_id":"64f90fdef551f9467fb08c59","type":"water","x":1,"y":3,"noise":-0.3564091712037382},{"_id":"64f90fdef551f9467fb08c65","type":"water","x":0,"y":3,"noise":-0.545710461334588},{"_id":"64f90fdef551f9467fb08c6b","type":"water","x":-1,"y":3,"noise":-0.7120563061702903},{"_id":"64f90fdef551f9467fb08c75","type":"water","x":-2,"y":3,"noise":-0.8344290739094732},{"_id":"64f90fdef551f9467fb08c79","type":"water","x":-3,"y":3,"noise":-0.8973244358022491},{"_id":"64f90fdef551f9467fb08c81","type":"water","x":-3,"y":2,"noise":-0.8355949357666005},{"_id":"64f90fdef551f9467fb08c87","type":"water","x":-3,"y":1,"noise":-0.7124778028401648},{"_id":"64f90fdef551f9467fb08c91","type":"water","x":-3,"y":0,"noise":-0.5457870263690398},{"_id":"64f90fdef551f9467fb08c99","type":"water","x":-3,"y":-1,"noise":-0.35625279181059044},{"_id":"64f90fdef551f9467fb08c9d","type":"water","x":-3,"y":-2,"noise":-0.16503909622429486},{"_id":"64f90fdef551f9467fb08ca3","type":"sand","x":-3,"y":-3,"noise":0.009860825007391135},{"_id":"64f90fdef551f9467fb08cad","type":"grass","x":-2,"y":-3,"noise":0.16910408530309393},{"_id":"64f90fdef551f9467fb08cb5","type":"grass","x":-1,"y":-3,"noise":0.35643200392365615},{"_id":"64f90fdef551f9467fb08cc3","type":"mountain","x":1,"y":-3,"noise":0.7135447972395452},{"_id":"64f90fdef551f9467fb08cbb","type":"grass","x":0,"y":-3,"noise":0.5460882885268411},{"_id":"64f90fdef551f9467fb08ccb","type":"mountain","x":2,"y":-3,"noise":0.8377245736046005},{"_id":"64f90fdef551f9467fb08cd3","type":"mountainpeak","x":3,"y":-3,"noise":0.9030296468364195},{"_id":"64f90fdef551f9467fb08cd9","type":"mountainpeak","x":4,"y":-3,"noise":0.9029445919837475},{"_id":"64f90fdef551f9467fb08cdf","type":"mountainpeak","x":4,"y":-2,"noise":0.8642380401234564},{"_id":"64f90fdef551f9467fb08ce3","type":"mountain","x":4,"y":-1,"noise":0.7696376443775237},{"_id":"64f90fdef551f9467fb08cef","type":"snow","x":4,"y":0,"noise":0.628902900535647},{"_id":"64f90fdef551f9467fb08cf5","type":"grass","x":4,"y":1,"noise":0.4594830118443082},{"_id":"64f90fdef551f9467fb08cfd","type":"grass","x":4,"y":2,"noise":0.2777980111811935},{"_id":"64f90fdef551f9467fb08d03","type":"grass","x":4,"y":3,"noise":0.10019142126307742},{"_id":"64f90fdef551f9467fb08d09","type":"water","x":4,"y":4,"noise":-0.05666581493654253},{"_id":"64f90fdef551f9467fb08d11","type":"water","x":3,"y":4,"noise":-0.1529846223021125},{"_id":"64f90fdef551f9467fb08d19","type":"water","x":2,"y":4,"noise":-0.2943302525003686},{"_id":"64f90fdef551f9467fb08d1f","type":"water","x":1,"y":4,"noise":-0.4598454072388755},{"_id":"64f90fdef551f9467fb08d25","type":"water","x":0,"y":4,"noise":-0.6231512149545213},{"_id":"64f90fdef551f9467fb08d2f","type":"water","x":-1,"y":4,"noise":-0.7587698719612612},{"_id":"64f90fdef551f9467fb08d37","type":"water","x":-2,"y":4,"noise":-0.8478980506181685},{"_id":"64f90fdef551f9467fb08d3d","type":"water","x":-3,"y":4,"noise":-0.878994591431061},{"_id":"64f90fdef551f9467fb08d45","type":"water","x":-4,"y":4,"noise":-0.8484966465504983},{"_id":"64f90fdef551f9467fb08d4b","type":"water","x":-4,"y":3,"noise":-0.8922933894570445},{"_id":"64f90fdef551f9467fb08d53","type":"water","x":-4,"y":2,"noise":-0.8580248002659394},{"_id":"64f90fdef551f9467fb08d57","type":"water","x":-4,"y":1,"noise":-0.7636810757396638},{"_id":"64f90fdef551f9467fb08d5b","type":"water","x":-4,"y":0,"noise":-0.62475671913308},{"_id":"64f90fdef551f9467fb08d63","type":"water","x":-4,"y":-1,"noise":-0.4575578212565488},{"_id":"64f90fdef551f9467fb08d6b","type":"water","x":-4,"y":-2,"noise":-0.27735264592494047},{"_id":"64f90fdef551f9467fb08d71","type":"water","x":-4,"y":-3,"noise":-0.10017749555085383},{"_id":"64f90fdef551f9467fb08d75","type":"sand","x":-4,"y":-4,"noise":0.05666581493654257},{"_id":"64f90fdef551f9467fb08d7f","type":"grass","x":-3,"y":-4,"noise":0.15300034739610424},{"_id":"64f90fdef551f9467fb08d83","type":"grass","x":-2,"y":-4,"noise":0.2949496980839655},{"_id":"64f90fdef551f9467fb08d8d","type":"grass","x":-1,"y":-4,"noise":0.4632196048736464},{"_id":"64f90fdef551f9467fb08d95","type":"snow","x":0,"y":-4,"noise":0.6326278956941465},{"_id":"64f90fdef551f9467fb08d9f","type":"mountain","x":1,"y":-4,"noise":0.7775271324748569},{"_id":"64f90fdef551f9467fb08da7","type":"mountainpeak","x":2,"y":-4,"noise":0.8774505401234569},{"_id":"64f90fdef551f9467fb08dad","type":"mountainpeak","x":3,"y":-4,"noise":0.9183425981686437},{"_id":"64f90fdef551f9467fb08db7","type":"mountainpeak","x":4,"y":-4,"noise":0.8944913185185183},{"_id":"64f90fdef551f9467fb08dbd","type":"mountain","x":5,"y":-4,"noise":0.8099376203093653},{"_id":"64f90fdef551f9467fb08dc5","type":"mountain","x":5,"y":-3,"noise":0.8412733351620371},{"_id":"64f90fdef551f9467fb08dd1","type":"mountain","x":5,"y":-2,"noise":0.830154033912278},{"_id":"64f90fdef551f9467fb08dd7","type":"mountain","x":5,"y":-1,"noise":0.7648169400848973},{"_id":"64f90fdef551f9467fb08ddd","type":"snow","x":5,"y":0,"noise":0.6516392360461098},{"_id":"64f90fdef551f9467fb08de3","type":"grass","x":5,"y":1,"noise":0.5022277995944359},{"_id":"64f90fdef551f9467fb08de9","type":"grass","x":5,"y":2,"noise":0.3294858548447262},{"_id":"64f90fdef551f9467fb08ded","type":"grass","x":5,"y":3,"noise":0.15021395791131673},{"_id":"64f90fdef551f9467fb08df5","type":"water","x":5,"y":4,"noise":-0.016464805323560046},{"_id":"64f90fdef551f9467fb08dff","type":"water","x":5,"y":5,"noise":-0.15263425013483586},{"_id":"64f90fdef551f9467fb08e07","type":"water","x":4,"y":5,"noise":-0.17751059445734052},{"_id":"64f90fdef551f9467fb08e11","type":"water","x":3,"y":5,"noise":-0.25188581017003575},{"_id":"64f90fdef551f9467fb08e19","type":"water","x":2,"y":5,"noise":-0.36508761623838293},{"_id":"64f90fdef551f9467fb08e1d","type":"water","x":1,"y":5,"noise":-0.49746598367198486},{"_id":"64f90fdef551f9467fb08e23","type":"water","x":0,"y":5,"noise":-0.6243687974719909},{"_id":"64f90fdef551f9467fb08e2d","type":"water","x":-1,"y":5,"noise":-0.7217802353589766},{"_id":"64f90fdef551f9467fb08e33","type":"water","x":-2,"y":5,"noise":-0.7728416987210006},{"_id":"64f90fdef551f9467fb08e3d","type":"water","x":-3,"y":5,"noise":-0.7704497619426088},{"_id":"64f90fdef551f9467fb08e43","type":"water","x":-4,"y":5,"noise":-0.7164885171464125},{"_id":"64f90fdef551f9467fb08e4b","type":"water","x":-5,"y":5,"noise":-0.6211056943886143}]')}},t={};function d(e){var i=t[e];if(void 0!==i)return i.exports;var n=t[e]={id:e,loaded:!1,exports:{}};return f[e].call(n.exports,n,n.exports,d),n.loaded=!0,n.exports}d.m=f,d.amdD=function(){throw new Error("define cannot be used indirect")},d.amdO={},e=[],d.O=(f,t,i,n)=>{if(!t){var s=1/0;for(y=0;y<e.length;y++){for(var[t,i,n]=e[y],o=!0,a=0;a<t.length;a++)(!1&n||s>=n)&&Object.keys(d.O).every((e=>d.O[e](t[a])))?t.splice(a--,1):(o=!1,n<s&&(s=n));if(o){e.splice(y--,1);var r=i();void 0!==r&&(f=r)}}return f}n=n||0;for(var y=e.length;y>0&&e[y-1][2]>n;y--)e[y]=e[y-1];e[y]=[t,i,n]},d.n=e=>{var f=e&&e.__esModule?()=>e.default:()=>e;return d.d(f,{a:f}),f},d.d=(e,f)=>{for(var t in f)d.o(f,t)&&!d.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:f[t]})},d.o=(e,f)=>Object.prototype.hasOwnProperty.call(e,f),d.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};d.O.j=f=>0===e[f];var f=(f,t)=>{var i,n,[s,o,a]=t,r=0;if(s.some((f=>0!==e[f]))){for(i in o)d.o(o,i)&&(d.m[i]=o[i]);if(a)var y=a(d)}for(f&&f(t);r<s.length;r++)n=s[r],d.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return d.O(y)},t=self.webpackChunkFantasyWorldMapGenerator=self.webpackChunkFantasyWorldMapGenerator||[];t.forEach(f.bind(null,0)),t.push=f.bind(null,t.push.bind(t))})(),d.O(void 0,[216],(()=>d(94)));var i=d.O(void 0,[216],(()=>d(204)));i=d.O(i)})();