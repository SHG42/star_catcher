export default class UIScene extends Phaser.Scene {
    constructor() {
        super({key: 'UIScene', active: true});
    }

    init() {
        this.gameScene = this.scene.get('GameScene');

        this.starsCollected = 0;
     }

    create() {
        this.createUIElements();

        this.launchUI();

        this.gameScene.events.on('newGame', () => {
            this.starsCollected = 0;
            this.scoreText.setText(`Stars Collected: ${this.starsCollected}`);
        });
    }

    createUIElements() {
        //create scoreboard text
        this.scoreText = this.add.text(12, 30, `Stars Collected: ${this.starsCollected}`, {
            fontSize: '32px',
            fill: '#fff'
        });

        //listen for events from that scene
        this.gameScene.events.on('getStar', () => {
            //update score text
            this.starsCollected++;
            this.scoreText.setText(`Stars Collected: ${this.starsCollected}`);
        });

        //hide UI elements by default
        this.hideUIElements();
    }

    hideUIElements() {
        this.scoreText.alpha = 0;
    }

    launchUI() {
        this.gameScene.events.on('displayUI', function() {
            this.scoreText.alpha = 1;
            console.log("UI is now visible");
        }.bind(this));
    }
}