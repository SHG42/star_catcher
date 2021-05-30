export default {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: window.screen.availWidth,
    height: window.screen.availHeight,
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
