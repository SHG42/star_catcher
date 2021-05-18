import Dude from "../sprites/Dude.js";
import Star from "../sprites/Star.js";
import Stars from "../groups/Stars.js";

export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super('GameScene'); 
    }

    init(data) {
        //store data in properties:
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
        //emit event to reset game if game over occurs and new game starts, check to see if new game
        if(this._NEWGAME) {
            this.events.emit('newGame');
        }

        //emit event when game scene runs to signal UI scene to start, so that UI scene isn't running over the boot/preloader/title
        this.events.emit('displayUI');
    }

    create() {
        console.log("this is the game scene");

        //add cursor keys input: for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        //call createMap method
        this.createMap();

        //create dude animations
        this.createAnims();

        //create player character by calling method
        this.createDude();

        //create stars and star overlap after delay
        this.addStars = this.time.delayedCall(2000, this.createStars, [], this);

        //create portal between levels from custom method
        this.createPortal();

        //create prize
        this.createPrize();

        //create collisions
        this.setCollisions();

        this.cameras.main.setZoom(2);
    }

    update() {
        //call cursor key checks from player class, pass cursor keys to player class update
        this.dude.update(this.cursors);

        //restart lvl if dude falls off map
        if (this.dude.body.position.y > this.map.heightInPixels) {
            this.cameras.main.fade(400, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', ()=>{
                this.scene.restart({level: this._LEVEL, levels: this._LEVELS, newGame: false});
            });
        }
    }

    createMap() {
        this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] }); //access level data array then access current level

        //tell tilemap to use tilesheet
        this.tiles = this.map.addTilesetImage("area01_level_tiles");
        //create layers
        this.backgroundLayer = this.map.createLayer("background", this.tiles, 0,0);

        this.platformLayer = this.map.createLayer("foreground", this.tiles, 0,0);

        this.frontLayer = this.map.createLayer("front", this.tiles, 0,0);
        this.frontLayer.setDepth(1);
        
        //set which tiles on blocked layer collide
        this.platformLayer.setCollisionByExclusion(-1);
    }

    createAnims() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
    }

    createDude() {
        if (this._NEWGAME || this._LEVEL === 1) {
            this.map.findObject('entry', (obj) =>{
                if (obj.type === 'point') {
                    this.dude = new Dude(this, obj.x, obj.y, 4);
                }
            });
        } else {
            this.map.findObject('portal', (obj) =>{
                if(obj.type === 'portalPoint') {
                    this.dude = new Dude(this, obj.x, obj.y);
                }
            });
        }
    }

    createStars() {
        const emptyTiles = this.platformLayer.filterTiles(function (tile) {
            return tile.index === -1;
        });
        
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 14,
            allowGravity: false,
            collideWorldBounds: true
        });
        
        this.stars.children.iterate(function(child){
            for(var i=0; i<14; i++){
                var randomTile = Phaser.Utils.Array.GetRandom(emptyTiles);
                child.setPosition(randomTile.pixelX, randomTile.pixelY);
                child.setOrigin(0,0);
            }
        });

        this.physics.add.overlap(this.dude, this.stars, this.getStars, null, this);
    }

    createPortal() {
        //get portal object coordinates from json
        this.map.findObject('portal', (obj) => {
            //check which lvl is loaded
            if(this._LEVEL === 1) {
                if(obj.type === 'stage2portal') {
                    this.portal = this.add.zone(obj.x, obj.y, obj.width, obj.height);
                    this.buildPortal();
                }
            } else if(this._LEVEL === 2) {
                if(obj.type === 'stage1portal') {
                    this.portal = this.add.zone(obj.x, obj.y, obj.width, obj.height);
                    this.buildPortal();
                }
            }
        });
    }

    //method to contain the portal zone setup
    buildPortal() {
        this.physics.world.enable(this.portal);
        this.portal.body.setAllowGravity(false);
        this.portal.setOrigin(0,0);
    }

    createPrize() {
        this.map.findObject('goal', (obj)=>{
            if (this._LEVEL === 2) {
                this.prize = this.add.sprite(obj.x, obj.y, "goalStar");
                this.physics.world.enable(this.prize);
                this.prize.body.setAllowGravity(false);
                this.prize.setOrigin(0,0);
            }
        });
    }

    setCollisions() {
        //set world bounds to follow camera bounds
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        //establish camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        //establish camera follow
        this.cameras.main.startFollow(this.dude);

        console.log(this.cameras.main);

        //add player-platform collisions
        this.physics.add.collider(this.dude, this.platformLayer);
        
        this.physics.add.overlap(this.dude, this.portal, this.loadNextLevel.bind(this, false)); //binding context AND a value of false for the newGame parameter, so Phaser knows we're moving to next level and NOT ending or restarting game

        this.physics.add.overlap(this.dude, this.prize, this.getPrize, null, this);
    }

    getStars(dude, star) {
        star.disableBody(true, true);
        this.events.emit("getStar");
    }

    getPrize(dude, prize) {
        console.log("winnar is u");
        this.scene.launch('WinScene');
        this.events.emit('displayWin');
    }

    loadNextLevel(endGame) {
        if (!this.loadingLevel) {
            this.cameras.main.fade(500, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                if(endGame) {
                    //restart lvl1
                    this.scene.restart({level: 1, levels: this._LEVELS, newGame: true});
                } else if (this._LEVEL === 1) {
                    this.scene.restart({ level: 2, levels: this._LEVELS, newGame: false });
                } else if (this._LEVEL === 2) {
                    this.scene.restart({ level: 1, levels: this._LEVELS, newGame: false });
                }
            });
            this.loadingLevel = true;
          }
        console.log("go to next stage");
    }

}