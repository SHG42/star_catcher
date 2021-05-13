export default class BootScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('phaser_logo', 'assets/images/phaserlogo.png');
    }
      
    create() {
        this.scene.start('PreloaderScene');
        console.log('this is the boot scene');
    }
}















//NO PRELOADER VER
// import Phaser from "phaser";

// export default class BootScene extends Phaser.Scene {
//     constructor(key) {
//         super(key);
//     }

//     preload() {
//         this.stages = {
//             1: "stage1",
//             2: "stage2"
//         }

//         //load tilemaps
//         this.load.tilemapTiledJSON("stage1", "assets/tilemaps/area01.json");
//         this.load.tilemapTiledJSON("stage2", "assets/tilemaps/area01-stage2.json");

//         //load spritesheets
//         this.load.spritesheet("area01_level_tiles", "assets/images/area01_level_tiles.png", {frameWidth: 32, frameHeight: 32});
//         this.load.spritesheet("dude", "assets/images/dude.png", {frameWidth: 32, frameHeight: 48});

//         //load images
//         this.load.image("star", "assets/images/star.png");
//         this.load.image("goalStar", "assets/images/goalstar.png");

//         //load GUI images
//         this.load.image("logo", "assets/images/logo.png");
//         this.load.image("instructions", "assets/images/instructions.png");
//         this.load.image("win", "assets/images/win.png");
//     }

//     create() {
//         //this.scene.start('TitleScene');
//         this.scene.start('GameScene', {level: 1, newGame: true, levels: this.stages});
//         console.log("this is the BootScene");
//     }
// }