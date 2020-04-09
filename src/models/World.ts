import { Person } from './Person';

const simParameters = {
    numberOfP: 10,
    gForce: 0,
    boundElasticity: 0.99,
    drag: 1,
    infectionProbability: 0.5,
    infectRadius: 10,
    numberInfected: 1
}

const totalEElement = document.getElementById('totalE') as HTMLSpanElement;

const calcGravity = (allPeople: Array<Person>) => {
    const rad = 2;
    for (let i = 0; i < allPeople.length; i++) {
        for (let j = i + 1; j < allPeople.length; j++) {
            if (i !== j) {
                var diffX = allPeople[j].x - allPeople[i].x;
                var diffY = allPeople[j].y - allPeople[i].y;
                var distanceSquare = diffX * diffX + diffY * diffY;
                var distance = Math.pow(distanceSquare, 0.5);
                if (distance - 1 > rad / 2 + rad / 2) {
                    var totalForce = simParameters.gForce / distanceSquare;
                    const deltaX = totalForce * diffX / distance;
                    const deltaY = totalForce * diffY / distance;
                    allPeople[i].dx += deltaX;
                    allPeople[i].dy += deltaY;
                    allPeople[j].dx -= deltaX;
                    allPeople[j].dy -= deltaY;
                } else {
                    // var tempX = (p.dx + obj2.dx) / 2;
                    // var tempY = (p.dy + obj2.dy) / 2;
                    // p.dx = tempX; obj2.dx = tempX;
                    // p.dy = tempY; obj2.dy = tempY;
                }
                if (allPeople[i].infected && distance < simParameters.infectRadius) {
                    allPeople[j].infected = Boolean(Math.round(Math.random() + simParameters.infectionProbability));
                }
                if (allPeople[j].infected && distance < simParameters.infectRadius) {
                    allPeople[i].infected = Boolean(Math.round(Math.random() + simParameters.infectionProbability));
                }

            }
        }
    }
};

const calcBounds = (allPeople: Array<Person>, height: number, width: number) => {
    allPeople.forEach((p) => {
        if (p.x > width || p.x < 0) {
            p.dx = p.dx * (-1 * simParameters.boundElasticity);
        }
        if (p.y > height || p.y < 0) {
            p.dy = p.dy * (-1 * simParameters.boundElasticity);
        }
    });
};

export class World {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pArray: Array<Person>;
    started: boolean;
    totalElergy: number;
    constructor(height: number = 500, width: number = 500) {
        this.started = false;
        this.canvas = document.getElementById('worldCanvas') as HTMLCanvasElement;
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
        this.pArray = [];
        this.totalElergy = null;
        let leftToInfect = simParameters.numberInfected;
        for (let i = 0; i < simParameters.numberOfP; i++) {
            this.pArray.push(new Person(Math.random() * width, Math.random() * height, (Math.random() * 1) - 1 / 2, (Math.random() * 1) - 1 / 2, leftToInfect > 0));
            leftToInfect--;
        }
    }
    step() {
        if (!this.started) {
            return;
        }
        calcBounds(this.pArray, this.canvas.height, this.canvas.width);
        calcGravity(this.pArray);
        this.totalElergy = 0;
        this.pArray.forEach((p) => {
            this.totalElergy += Math.sqrt(Math.pow(p.dx, 2) + Math.pow(p.dy, 2));
            p.step(simParameters.drag);
        });
        this.draw();
        window.requestAnimationFrame(this.step.bind(this));
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pArray.forEach((p) => {
            p.draw(this.ctx);
        });
        totalEElement.innerHTML = String(this.totalElergy.toFixed(2));
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        window.requestAnimationFrame(this.step.bind(this));
    }

}