export default class WinScene extends Phaser.Scene {
    constructor(key) {
        super('WinScene');
    }

    init() {
        this.gameScene = this.scene.get('GameScene');
    }

    create() {
        console.log("this is the winning screen");

        //create game title image
        this.createOverlay();

        //this.launchWin();
    }

    createOverlay() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.winScreen = this.add.image(width/2, height/2 -100, 'win');
        this.winScreen.displayWidth = width/1.5;
        this.winScreen.displayHeight = height/1.5;
        this.winScreen.setPosition(width/2, height/2);

        this.restartButton = this.add.image(width/2, height/2 -100, 'restart');
        this.restartButton.displayWidth = width/1.5;
        this.restartButton.displayHeight = height/1.5;
        this.restartButton.setPosition(width/2, height/2);
        this.restartButton.setInteractive();

        this.restartButton.on('pointerdown', function(pointer) {
            this.gameScene.loadNextLevel(true);
            this.winScreen.alpha = 0;
            this.restartButton.alpha = 0;
        }.bind(this));
    }

    launchWin() {
        this.gameScene.events.on('displayWin', function() {
            this.winScreen.alpha = 1;
            this.restartButton.alpha = 1;
            console.log("Win screen is now visible");
        }.bind(this));
    }
}