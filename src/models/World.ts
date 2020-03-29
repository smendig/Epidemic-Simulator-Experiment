import { Person } from './Person';

const numberOfP = 100;

export class World {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pArray: Array<Person>;
    started: boolean;
    constructor(height: number = 500, width: number = 500) {
        this.started = false;
        this.canvas = document.getElementById('worldCanvas') as HTMLCanvasElement;
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
        this.pArray = [];
        for (let i = 0; i < numberOfP; i++) {
            this.pArray.push(new Person(Math.random() * width, Math.random() * height, (Math.random() * 1) - 1 / 2, (Math.random() * 1) - 1 / 2));
        }
    }
    step() {
        if (!this.started) {
            return;
        }
        this.pArray.forEach((p) => {
            p.step({ height: this.canvas.height, width: this.canvas.width, pArrayNotSelf: this.pArray.filter(p2 => p2 !== p) });
        });
        this.draw();
        window.requestAnimationFrame(this.step.bind(this));
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pArray.forEach((p) => {
            p.draw(this.ctx);
        });
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        window.requestAnimationFrame(this.step.bind(this));
    }

}