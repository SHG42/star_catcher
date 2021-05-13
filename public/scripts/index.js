import config from './config.js';
import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import UIScene from './scenes/UIScene.js';
import WinScene from './scenes/WinScene.js';

class Game extends Phaser.Game {
  constructor() {
      super(config);
      this.scene.add('BootScene', BootScene);
      this.scene.add('PreloaderScene', PreloaderScene);
      this.scene.add('TitleScene', TitleScene);
      this.scene.add('GameScene', GameScene);
      this.scene.add('UIScene', UIScene);
      this.scene.add('WinScene', WinScene);
      this.scene.start('BootScene');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});