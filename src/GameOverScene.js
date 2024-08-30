import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    preload() {
        this.load.image('restartButton', './images/ReplayBtn.png');
        this.load.image('background', './images/Background.jpg');
    }

    create() {
        this.add.image(200, 300, 'background');

        this.add.text(100, 200, 'Game Over', { fontSize: '32px', color: '#fff' });
        this.add.text(100, 250, `Score: ${this.finalScore}`, { fontSize: '24px', color: '#fff' });

        const restartButton = this.add.image(200, 350, 'restartButton').setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });
    }
}
