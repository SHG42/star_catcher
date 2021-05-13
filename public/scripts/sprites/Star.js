export default class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'star');

        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);

        //add to scene
        this.scene.add.existing(this);
    }
}