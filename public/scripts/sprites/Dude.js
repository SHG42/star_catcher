export default class Dude extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'dude', 4);

        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);
        //add player to scene
        this.scene.add.existing(this);
        //set bounce
        this.setBounce(0.2);

        this.scene.events.emit("dudeCreate");
        console.log("dude created in dude class");
    }

    update(cursors, pointer) {
        if (cursors.left.isDown || (pointer.isDown && pointer.worldX < this.getCenter().x)) {
            this.setVelocityX(-160);
            this.anims.play('left', true);
        } else if (cursors.right.isDown || (pointer.isDown && pointer.worldX > this.getCenter().x)) {
            this.setVelocityX(160);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        if (cursors.up.isDown && Phaser.Input.Keyboard.JustDown(cursors.up) || (pointer.isDown && pointer.worldY < this.getCenter().y)) {
            this.setVelocityY(-330);
        }
    }
}
