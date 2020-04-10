'use strict';
import simParameters from '../simParameters';
import { Person } from './Person';

const totalEnergyElement = document.getElementById('totalEnergy') as HTMLSpanElement;
const timeInfectedElement = document.getElementById('totalInfected') as HTMLSpanElement;
const timeStepElement = document.getElementById('timeStep') as HTMLSpanElement;


const calcInteractions = (allPeople: Array<Person>) => {
    const infection = (p1: Person, p2: Person, distance: number) => {
        const interactionOutcome = () => Math.random() < simParameters.infectionProbability;
        if (distance > simParameters.infectRadius) {
            return;
        }
        if (p1.status === 1 && p2.status === 0 && interactionOutcome()) {
            p2.infect(simParameters.timeStep);
        }
        if (p2.status === 1 && p1.status === 0 && interactionOutcome()) {
            p1.infect(simParameters.timeStep);
        }
    };
    const motion = (p1: Person, p2: Person, distance: number, distanceSquare: number, diffX: number, diffY: number) => {
        if (distance - 1 > rad / 2 + rad / 2) {
            const totalForce = simParameters.gForce / distanceSquare;
            const deltaX = totalForce * diffX / distance;
            const deltaY = totalForce * diffY / distance;
            p1.dx += deltaX;
            p1.dy += deltaY;
            p2.dx -= deltaX;
            p2.dy -= deltaY;
        }
    };
    const rad = 2;
    for (let i = 0; i < allPeople.length; i++) {
        const p1 = allPeople[i];
        for (let j = i + 1; j < allPeople.length; j++) {
            const p2 = allPeople[j];
            if (i !== j) {
                const diffX = p2.x - p1.x;
                const diffY = p2.y - p1.y;
                const distanceSquare = diffX * diffX + diffY * diffY;
                const distance = Math.pow(distanceSquare, 0.5);
                motion(p1, p2, distance, distanceSquare, diffX, diffY);
                infection(p1, p2, distance);
            }
        }
    }
};

const calcBounds = (allPeople: Array<Person>, height: number, width: number) => {
    const padding = 2;
    allPeople.forEach((p) => {
        if (p.x + padding > width) {
            p.x = width - padding;
            p.dx = p.dx * (-1 * simParameters.boundElasticity);
        } else if (p.x < padding) {
            p.x = padding;
            p.dx = p.dx * (-1 * simParameters.boundElasticity);
        }
        if (p.y + padding > height) {
            p.y = height - padding;
            p.dy = p.dy * (-1 * simParameters.boundElasticity);
        } else if (p.y < padding) {
            p.y = padding;
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
    totalInfected: number;
    animationFrameID: number;
    constructor(height = 500, width = 500) {
        this.started = false;
        this.canvas = document.getElementById('worldCanvas') as HTMLCanvasElement;
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = this.canvas.getContext('2d');
        this.pArray = [];
        this.totalElergy = null;
        this.totalInfected = simParameters.numberInfected;
        let leftToInfect = simParameters.numberInfected;
        for (let i = 0; i < simParameters.numberOfP; i++) {
            this.pArray.push(new Person(Math.random() * width, Math.random() * height, (Math.random() * 1) - 1 / 2, (Math.random() * 1) - 1 / 2, leftToInfect > 0 ? 1 : 0));
            leftToInfect--;
        }
    }
    step() {
        if (!this.started) {
            return;
        }
        calcBounds(this.pArray, this.canvas.height, this.canvas.width);
        calcInteractions(this.pArray);
        let totalElergyCounter = 0;
        let totalInfectedCounter = 0;
        this.pArray.forEach((p) => {
            totalElergyCounter += Math.sqrt(Math.pow(p.dx, 2) + Math.pow(p.dy, 2));
            if (p.status === 1) {
                totalInfectedCounter++;
            }
            p.step(simParameters.drag);
        });
        this.totalElergy = totalElergyCounter;
        this.totalInfected = totalInfectedCounter;
        this.draw();
        simParameters.timeStep++;
        window.requestAnimationFrame(this.step.bind(this));
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pArray.forEach((p) => {
            p.draw(this.ctx);
        });
        totalEnergyElement.innerHTML = String(this.totalElergy.toFixed(2));
        timeStepElement.innerHTML = String(simParameters.timeStep);
        timeInfectedElement.innerHTML = String(this.totalInfected);
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        this.animationFrameID = window.requestAnimationFrame(this.step.bind(this));
    }
    stop() {
        this.started = false;
        window.cancelAnimationFrame(this.animationFrameID);
        this.animationFrameID = null;
    }
}