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
//touch controls: swipe left or right to run, tap above sprite to jump
    update(cursors) {
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }
        
        if (cursors.up.isDown && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            //second part of if statement prevents "walking/standing on air" while up key is held down, can doublejump but up key has to be pressed again to jump again, otherwise dude would stay at y-coord as long as up key is held down
            //add  && this.dude.body.onFloor() into if statement if we want to disable doublejump
            this.setVelocityY(-330);
        }
    }
}


//KEYBOARD-ONLY CONTROLS
// update(cursors) {
//     if (cursors.left.isDown) {
//         this.setVelocityX(-160);
//         this.anims.play('left', true);
//     } else if (cursors.right.isDown) {
//         this.setVelocityX(160);
//         this.anims.play('right', true);
//     } else {
//         this.setVelocityX(0);
//         this.anims.play('turn');
//     }
    
//     if (cursors.up.isDown && Phaser.Input.Keyboard.JustDown(cursors.up)) {
//         //second part of if statement prevents "walking/standing on air" while up key is held down, can doublejump but up key has to be pressed again to jump again, otherwise dude would stay at y-coord as long as up key is held down
//         //add  && this.dude.body.onFloor() into if statement if we want to disable doublejump
//         this.setVelocityY(-330);
//     }
// }