'use strict';
import simParameters from '../simParameters';

const rad = 2;
const piRad = 2 * Math.PI;

export class Person {
    x: number;
    y: number;
    dx: number;
    dy: number;
    status: number;
    infectedTime: number;
    constructor(x = 0, y = 0, dx = 0, dy = 0, status = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.status = status; // 0 = not infected, 1 = infected, 2 = immunized
        this.infectedTime = null;
    }
    step(drag: number = 1) {
        this.dx = this.dx * drag;
        this.dy = this.dy * drag;
        this.x += this.dx;
        this.y += this.dy;
        if (this.status === 1 && (simParameters.timeStep - this.infectedTime) > simParameters.infectionTime) {
            this.status = 2;
        }
    }
    infect(infectedTime: number) {
        if (this.status === 0) {
            this.status = 1;
            this.infectedTime = infectedTime;
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, piRad, false);
        switch (this.status) {
            case 0:
                ctx.fillStyle = 'green';
                break;
            case 1:
                ctx.fillStyle = 'red';
                break;
            case 2:
                ctx.fillStyle = 'blue';
                break;
        }
        ctx.fill();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }
}