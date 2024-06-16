export function Ship(options) {
    this.x = options.x
    this.y = options.y
    this.left = false;
    this.right = false;
    this.ctx = options.context;
    this.stage = options.stage;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
}

Ship.prototype.update = function (x) {
    this.x = x;
    // this.y = this.stage.height - this.radius - 30;
}

Ship.prototype.draw = function () {
    this.ctx.save();
    const spaceShip = new Image();
    spaceShip.onload = () => {
        // this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
        this.ctx.drawImage(spaceShip, this.x, this.y)
    }
    spaceShip.src = "./spaceship.svg";
    this.ctx.restore();
}

Ship.prototype.onKeyDown = function (e) {
    if (e.keyCode === 39) this.right = true;
    else if (e.keyCode === 37) this.left = true;

    if (e.keyCode == 32 && !this.shooting) {
        this.shooting = true;
    }

}

Ship.prototype.onKeyUp = function (e) {
    if (e.key === 'ArrowRight') this.right = false;
    else if (e.key === 'ArrowLeft') this.left = false;
    else if (e.keyCode == 32) this.shooting = false;
}