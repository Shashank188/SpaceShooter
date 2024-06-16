export function Laser(options) {
    this.x = options.x + 35;
    this.y = options.y
    this.width = 6;
    this.height = 20;
    this.ctx = options.context;
    this.active = true;
}

Laser.prototype.update = function (y) {
    this.y = y;
}

Laser.prototype.draw = function () {
    this.ctx.save();
     this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
}