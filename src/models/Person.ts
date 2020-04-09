const rad = 2;
const piRad = 2 * Math.PI;

export class Person {
    x: number;
    y: number;
    dx: number;
    dy: number;
    infected: boolean;
    constructor(x: number = 0, y: number = 0, dx: number = 0, dy: number = 0, infected = false) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.infected = infected;
    }
    step(drag: number = 1) {
        this.dx = this.dx * drag;
        this.dy = this.dy * drag;
        this.x += this.dx;
        this.y += this.dy;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, piRad, false);
        ctx.fillStyle = this.infected ? 'red' : 'green';
        ctx.fill();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }
}