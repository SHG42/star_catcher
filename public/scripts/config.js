export default {
    type: Phaser.AUTO,
    backgroundColor: '#007396',
    scale: {
        parent: "phaser-example",
        width: window.innerWidth,
        height: window.innerHeight,
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false
        }
    }
}
