import 'phaser'
import MainScene from './scenes/mainScene'
import SettingsScene from './scenes/settingsScene'

const DEFAULT_WIDTH = 1000
const DEFAULT_HEIGHT = 1000

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: DEFAULT_WIDTH,
    // height: DEFAULT_HEIGHT
  },
  scene: [MainScene, SettingsScene],
  dom: {
    createContainer: true
  },
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})