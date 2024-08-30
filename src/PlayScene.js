import Phaser from "phaser";

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        this.load.image('background', './images/Background.jpg');
        this.load.image('bird', './images/frame.png');
        this.load.image('pipe', './images/Pipe.png');
        this.load.image('pipes', './images/Pipes.png');
    }

    create() {
        this.add.image(200, 300, 'background');
        this.bird = this.physics.add.sprite(100, 300, 'bird').setCollideWorldBounds(true);
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this); // Keyboard input

        this.pipes = this.physics.add.group();
        this.timer = this.time.addEvent({
            delay: 1500,
            callback: this.addPipes,
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.bird, this.pipes, this.hitPipe, null, this);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });
        this.scoreText.setDepth(1);

        this.pipesPassed = new Set(); // Set untuk melacak pipa yang sudah dilewati
    }

    update() {
        if (this.bird.y > 600 || this.bird.y < 0) {
            this.gameOver();
        }

        this.pipes.getChildren().forEach(pipe => {
            // @ts-ignore
            if (pipe.x + pipe.width < this.bird.x && !this.pipesPassed.has(pipe)) {
                this.pipesPassed.add(pipe);
                this.score += 0.5;
                this.scoreText.setText('Score: ' + this.score);
            }
        });
    }

    flap() {
        this.bird.setVelocityY(-250);
    }

    addPipes() {
        const gap = 250; 
        const minPipeHeight = 50; 
        const maxPipeHeight = 300; 

        const pipeHeight = Phaser.Math.Between(minPipeHeight, maxPipeHeight);

        const topPipe = this.pipes.create(400, pipeHeight, 'pipes').setOrigin(0, 1);
        const bottomPipe = this.pipes.create(400, pipeHeight + gap, 'pipe').setOrigin(0, 0);

        topPipe.body.allowGravity = false;
        bottomPipe.body.allowGravity = false;

        topPipe.body.velocity.x = -200;
        bottomPipe.body.velocity.x = -200;

        topPipe.checkWorldBounds = true;
        topPipe.outOfBoundsKill = true;
        bottomPipe.checkWorldBounds = true;
        bottomPipe.outOfBoundsKill = true;
    }

    hitPipe() {
        this.gameOver();
    }

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xff0000);
        this.timer.remove(false);
        this.scene.start('GameOverScene', { score: this.score });
    }
}
