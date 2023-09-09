import 'phaser'
import MainScene from './scenes/mainScene'

const DEFAULT_WIDTH = 1600
const DEFAULT_HEIGHT = 1200

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [MainScene],
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})