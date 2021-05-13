export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    init(data) {
        console.log(data);
        //store data in properties:
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        //console.log(this._LEVELS);
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
        this.titleLogo = this.add.image(width/2, height/2 -100, 'logo');
        this.titleLogo.displayWidth = width/1.5;
        this.titleLogo.displayHeight = height/1.5;
        this.titleLogo.setPosition(width/2, height/2);

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.titleLogo.setTexture('instructions');
                this.createPlayButton();
            },
            callbackScope: this
        });
    }
    
    createPlayButton() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.playButton = this.add.image(width/2, height/2 -100, 'go');
        this.playButton.displayWidth = width/1.5;
        this.playButton.displayHeight = height/1.5;
        this.playButton.setPosition(width/2, height/2);
        this.playButton.setInteractive();

        this.playButton.on('pointerdown', function(pointer) {
            this.scene.start('GameScene', {level: this._LEVEL, newGame: true, levels: this._LEVELS});
        }.bind(this));
    }
}