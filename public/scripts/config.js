export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#007396',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false
        }
    },
    input: {
        activePointers: 2
    }
}
