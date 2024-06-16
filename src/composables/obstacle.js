import { randomBetween } from '@/utils/index.js';
export function Obstacle(options) {
    const imgSrc = randomBetween(0, 1) > 0.5 ? 'asteroid' : 'enemy';
    this.width = 80;
    this.height = 40;
    this.active = true;
    this.y = options.y
    this.ctx = options.context;
    this.stage = options.stage;
    this.speed = options.speed;
    this.x = randomBetween(0, this.stage.width);
    // this.x = this.stage.width / 2 ;
    this.imgSrc = imgSrc;


}

Obstacle.prototype.update = function (x, y) {
    this.y = y;
    this.x = x;

}

Obstacle.prototype.draw = function () {
    this.ctx.save();
    const astroid = new Image();
    astroid.onload = () => {
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
        this.ctx.drawImage(astroid, this.x, this.y)
    }

    astroid.src = `${this.imgSrc}.svg`;
    this.ctx.restore();
}

Obstacle.prototype.explode = function () {
    this.ctx.save();
    const astroid = new Image();
    astroid.onload = () => {
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
        this.ctx.drawImage(astroid, this.x, this.y)
    }

    astroid.src = `explode.png`;
    this.ctx.restore();
}