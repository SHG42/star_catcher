export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    backgroundColor: '#007396',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false
        }
    }
}