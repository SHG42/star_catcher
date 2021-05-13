export default class PreloaderScene extends Phaser.Scene {
    constructor(key) {
        super('PreloaderScene');
    }

    init() {
        this.readyCount = 0;
    }

    preload() {
        //time event for showing logo
        this.timedEvent = this.time.delayedCall(1, this.ready, [], this); 

        this.createPreloader();

        //preload assets
        this.loadAssets();
    }

    createPreloader() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.add.image(width/2, height/2 -100, 'phaser_logo');

         //display progress bar
         var progressBar = this.add.graphics(); 
         var progressBox = this.add.graphics();
 
         progressBox.fillStyle(0x222222, 0.8); 
         progressBox.fillRect(width/2 - 160, height/2 - 30, 320, 50);

         //loading text
        var loadingText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 - 50,
            text: 'Loading...',
            style: {
                //config object
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        //percent text
        var percentText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 - 5,
            text: '0%',
            style: {
                //config object
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        //loading assets text
        var assetText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 + 50,
            text: '',
            style: {
                //config object
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //listen for loading events: update progress bar
        this.load.on('progress', function(value) { 
            percentText.setText(parseInt(value * 100) + '%'); 
            progressBar.clear(); 
            progressBar.fillStyle(0xffffff, 1); 
            progressBar.fillRect(width/2 - 150, height/2 - 20, 300*value, 30);
        });

        //listen for loading events: update file progress text
        this.load.on('fileprogress', function(file) { 
            //console.log(file);
            assetText.setText('Loading asset: ' + file.key); 
        });

        //remove progressbar when complete
        this.load.on('complete', function() {
            progressBox.destroy();
            progressBar.destroy();
            assetText.destroy();
            loadingText.destroy();
            percentText.destroy();

            this.ready();
        }.bind(this)); 
    }

    loadAssets() {
        this.stages = {
            1: "stage1",
            2: "stage2"
        }
        
        //load tilemaps
        this.load.tilemapTiledJSON("stage1", "assets/tilemaps/area01.json");
        this.load.tilemapTiledJSON("stage2", "assets/tilemaps/area01-stage2.json");
        
        //load spritesheets
        this.load.spritesheet("area01_level_tiles", "assets/images/area01_level_tiles.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("dude", "assets/images/dude.png", {frameWidth: 32, frameHeight: 48});
        
        //load images
        this.load.image("star", "assets/images/star.png");
        this.load.image("goalStar", "assets/images/goalstar.png");
        
        //load GUI images
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("instructions", "assets/images/instructions.png");
        this.load.image("go", "assets/images/gobutton.png");
        this.load.image("win", "assets/images/win.png");
        this.load.image("restart", "assets/images/restartbutton.png");
    }

    ready() {
        this.readyCount++;
        if(this.readyCount === 2) {
            //this leaves logo on splash screen for a short interval before launching next scene
            //this.scene.start('GameScene', {level: 1, newGame: true, levels: this.stages});
            this.scene.start('TitleScene', {level: 1, newGame: true, levels: this.stages});
        }
    }

    create() {
        console.log("this is the PreloaderScene");
    }
}

