import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('startButton', './images/StartBtn.png');
        
        this.load.image('background', './images/Background.jpg')
    }

    create() {
        this.add.image(200, 300, 'background');

        this.add.text(100, 200, 'Flappy Bird', { fontSize: '32px', color: '#fff' });
        const startButton = this.add.image(200, 300, 'startButton').setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });
    }
}
