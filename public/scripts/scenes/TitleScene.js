export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    init(data) {
        //store data in properties:
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
        //emit event to reset health if game over occurs and new game starts, check to see if new game
        if(this._NEWGAME) {
            this.events.emit('newGame');
        }
    }

    create() {
        console.log("this is the title screen");

        //create game title image
        this.createTitle();
    }

    createTitle() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        if(width > height) {//landscape
            this.titleLogo = this.add.image(width/2, height/2, 'logo');
        } else if (height > width) {//portrait
            this.titleLogo = this.add.image(width/2, height/2, 'logo_vertical');
        }

        this.titleLogo.setScale(0.5);
        this.titleLogo.displayWidth = width-100;
        this.titleLogo.displayHeight = height-100;

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if(width > height) {//landscape
                    this.titleLogo.setTexture('instructions');
                } else if (height > width) {//portrait
                    this.titleLogo.setTexture('instructions_vertical');
                }
                
                this.titleLogo.displayWidth = width-100;
                this.titleLogo.displayHeight = height-100;
                this.createPlayButton();
            },
            callbackScope: this
        });
    }
    
    createPlayButton() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        if(width > height) {//landscape
            this.playButton = this.add.image(width/2, height/2, 'go');
        } else if (height > width) {//portrait
            this.playButton = this.add.image(width/2, height/2, 'go_vertical');
        }

        this.playButton.setScale(0.5);
        this.playButton.displayWidth = width-100;
        this.playButton.displayHeight = height-100;
        this.playButton.setInteractive();

        this.playButton.on('pointerdown', function(pointer) {
            this.scene.start('GameScene', {level: this._LEVEL, newGame: true, levels: this._LEVELS});
        }.bind(this));
    }
}