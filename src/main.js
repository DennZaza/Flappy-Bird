import Phaser from 'phaser'

import MenuScene from './MenuScene';
import PlayScene from './PlayScene';
import GameOverScene from './GameOverScene';

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MenuScene, PlayScene, GameOverScene ]
};

export default new Phaser.Game(config)
