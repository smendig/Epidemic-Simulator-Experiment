const rad = 2;
const piRad = 2 * Math.PI;

interface WorldInterface {
    height: number;
    width: number;
    pArrayNotSelf: Array<Person>;
}

const calcGravity = (p: Person, allObjs: Array<Person>) => {
    allObjs.forEach(function (obj2) {
        var diffX = obj2.x - p.x;
        var diffY = obj2.y - p.y;
        var distSquare = diffX * diffX + diffY * diffY;
        var dist = Math.sqrt(distSquare);
        if (dist - 5 > rad / 2 + rad / 2) {
            var totalForce = 5 / distSquare;
            p.dx += totalForce * diffX / dist;
            p.dy += totalForce * diffY / dist;
        } else {
            // var tempX = (p.dx + obj2.dx) / 2;
            // var tempY = (p.dy + obj2.dy) / 2;
            // p.dx = tempX; obj2.dx = tempX;
            // p.dy = tempY; obj2.dy = tempY;
        }
    });
};

export class Person {
    x: number;
    y: number;
    dx: number;
    dy: number;
    constructor(x: number = 0, y: number = 0, dx: number = 0, dy: number = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    step({ height, width, pArrayNotSelf }: WorldInterface) {
        calcGravity(this, pArrayNotSelf);
        if (this.x > width || this.x < 0) {
            this.dx = this.dx * -1;
        }
        if (this.y > height || this.y < 0) {
            this.dy = this.dy * -1;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, piRad, false);
        // ctx.fillStyle = 'green';
        ctx.fill();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }
}