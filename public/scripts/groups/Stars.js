import Star from "../sprites/Star.js";

export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);

        this.scene = scene;

        this.scene.physics.world.enable(this);

        //add the children to group
        this.stars = this.createMultiple({
            //config
            frameQuantity: 15,
            key: 'star',
            active: true, 
            visible: true
        });

        this.createStars(scene);
    }

    createStars(scene) {
        //establish empty tile vars
        this.emptyTiles = this.scene.platformLayer.filterTiles(function (tile) {
            return tile.index === -1;
        });
        
        this.stars.forEach(star => {
            this.randomTile = Phaser.Utils.Array.GetRandom(this.emptyTiles);

            this.star = new Star(scene, this.randomTile.pixelX, this.randomTile.pixelY);
            

            // star.setPosition(this.randomTile.pixelX, this.randomTile.pixelY);
            // star.setOrigin(0,0);

            this.add(this.star);
        });



        


    }
}



//ORIGINAL CODE
// const emptyTiles = foregroundLayer.filterTiles(function (tile) {
//     return tile.index === -1;
//   });
  
//   this.stars = this.physics.add.group({
//       key: 'star',
//       repeat: 14,
//       allowGravity: false
//         //immovable: true
//   });
  
//   this.stars.children.iterate(function(child){
//       for(var i=0; i<14; i++){
//           var randomTile = Phaser.Utils.Array.GetRandom(emptyTiles);
//           child.setPosition(randomTile.pixelX, randomTile.pixelY);
//           child.setOrigin(0,0);
//       }
//   });

