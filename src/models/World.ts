'use strict';
import SimulationParameters from './SimulationParameters';
import { Person } from './Person';

export class World {
    simParams: SimulationParameters;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    graphCanvas: HTMLCanvasElement;
    graphCtx: CanvasRenderingContext2D;
    pArray: Array<Person>;
    started: boolean;
    // totalElergy: number;
    totalIllUsingHealthCare: number;
    totalIllNotUsingHealthCare: number;
    totalIll: number;
    totalImmunized: number;
    totalDead: number;
    animationFrameID: number;
    constructor(population: number = 500, canvas: HTMLCanvasElement, graphCanvas: HTMLCanvasElement, numberInfected = 1) {
        this.simParams = new SimulationParameters(population);
        this.started = false;
        this.canvas = canvas;
        this.canvas.height = this.simParams.height;
        this.canvas.width = this.simParams.width;
        this.ctx = this.canvas.getContext('2d');
        this.graphCanvas = graphCanvas;
        this.graphCanvas.height = this.simParams.height / 2;
        this.graphCanvas.width = this.simParams.width;
        this.graphCtx = this.graphCanvas.getContext('2d');
        this.pArray = [];
        // this.totalElergy = null;
        this.totalIll = numberInfected;
        this.totalImmunized = 0;
        this.totalDead = 0;
        let leftToInfect = numberInfected;
        for (let i = 0; i < this.simParams.population; i++) {
            const p = new Person(this.simParams);
            if (leftToInfect > 0) {
                p.infect(this.simParams.timeStep);
                leftToInfect--;
            }
            p.setRndPosition();
            p.setRndVelocity();
            this.pArray.push(p);
        }
    }
    calcInteractions() {
        const infection = (p1: Person, p2: Person, distance: number) => {
            if (distance < this.simParams.distanceInfectRadius && p1.isInfectious() && p2.isUncontaminated()) {
                p2.infectChance(this.simParams.timeStep, distance);
            }
            if (distance < this.simParams.distanceInfectRadius && p2.isInfectious() && p1.isUncontaminated()) {
                p1.infectChance(this.simParams.timeStep, distance);
            }
        };
        const motion = (p1: Person, p2: Person, distance: number, distanceSquare: number, diffX: number, diffY: number) => {
            const rad = 2;
            if (distance - 1 > rad / 2 + rad / 2) {
                const totalForce = this.simParams.gForce / distanceSquare;
                const deltaX = totalForce * diffX / distance;
                const deltaY = totalForce * diffY / distance;
                p1.dx += deltaX;
                p1.dy += deltaY;
                p2.dx -= deltaX;
                p2.dy -= deltaY;
            }
        };
        const calcBounds = (p: Person) => {
            const padding = 2;
            if (p.x + padding > this.canvas.width) {
                p.x = this.canvas.width - padding;
                p.dx = p.dx * (-1 * this.simParams.boundElasticity);
            } else if (p.x < padding) {
                p.x = padding;
                p.dx = p.dx * (-1 * this.simParams.boundElasticity);
            }
            if (p.y + padding > this.canvas.height) {
                p.y = this.canvas.height - padding;
                p.dy = p.dy * (-1 * this.simParams.boundElasticity);
            } else if (p.y < padding) {
                p.y = padding;
                p.dy = p.dy * (-1 * this.simParams.boundElasticity);
            }
        };
        // let totalElergyCounter = 0;
        let totalIllCounter = 0;
        let totalImmunizedCounter = 0;
        let totalIllUsingHealthCareCounter = 0;
        let totalIllNotUsingHealthCareCounter = 0;
        let totalDeadCounter = 0;
        for (let i = 0; i < this.pArray.length; i++) {
            const p1 = this.pArray[i];
            if (i === 0) {
                p1.step();
                calcBounds(p1);
            }
            for (let j = i + 1; j < this.pArray.length; j++) {
                const p2 = this.pArray[j];
                if (i === 0) {
                    p2.step();
                    calcBounds(p2);
                }
                const diffX = p2.x - p1.x;
                const diffY = p2.y - p1.y;
                const distanceSquare = diffX * diffX + diffY * diffY;
                const distance = Math.pow(distanceSquare, 0.5);
                if (this.simParams.gForce !== 0) {
                    motion(p1, p2, distance, distanceSquare, diffX, diffY);
                }
                infection(p1, p2, distance);
            }
            // totalElergyCounter += Math.sqrt(Math.pow(p.dx, 2) + Math.pow(p.dy, 2));
            if (p1.isIll()) {
                if (!p1.isUsingHealthcare() && this.totalIllUsingHealthCare < this.simParams.healthcareCapacity) {
                    p1.setUseHealthcare();
                    this.totalIllUsingHealthCare++;
                }
                if (p1.isUsingHealthcare()) {
                    totalIllUsingHealthCareCounter++;
                } else {
                    totalIllNotUsingHealthCareCounter++;
                }
                totalIllCounter++;
            } else if ((p1.isImmunized())) {
                totalImmunizedCounter++;
            } else if (p1.isDead()) {
                totalDeadCounter++;
            }
        }
        // this.totalElergy = totalElergyCounter;
        this.totalIll = totalIllCounter;
        this.totalImmunized = totalImmunizedCounter;
        this.totalDead = totalDeadCounter;
        this.totalIllUsingHealthCare = totalIllUsingHealthCareCounter;
        this.totalIllNotUsingHealthCare = totalIllNotUsingHealthCareCounter;
    }
    step() {
        if (!this.started) {
            return;
        }
        this.calcInteractions();
        this.render();
        this.simParams.timeStep++;
        window.requestAnimationFrame(this.step.bind(this));
    }
    render() {
        const drawWorld = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.pArray.forEach((p) => {
                p.render(this.ctx);
            });
        };
        const drawGraph = () => {
            const imagedata = this.graphCtx.getImageData(1, 0, this.graphCtx.canvas.width - 1, this.graphCtx.canvas.height);
            this.graphCtx.putImageData(imagedata, 0, 0);
            this.graphCtx.clearRect(this.graphCtx.canvas.width - 1, 0, 1, this.graphCtx.canvas.height);

            const fn1 = (n: number, from: number, color: string) => {
                const to = Math.round(n * this.graphCanvas.height / this.simParams.population);
                this.graphCtx.beginPath();
                this.graphCtx.moveTo(this.graphCanvas.width - 1, from);
                this.graphCtx.lineTo(this.graphCanvas.width - 1, to + from);
                this.graphCtx.strokeStyle = color;
                this.graphCtx.stroke();
                return to;
            };
            const fn2 = (n: number, from: number, color: string) => {
                const to = Math.round(n * this.graphCanvas.height / this.simParams.population);
                this.graphCtx.beginPath();
                this.graphCtx.moveTo(this.graphCanvas.width - 1, this.graphCanvas.height - from);
                this.graphCtx.lineTo(this.graphCanvas.width - 1, this.graphCanvas.height - from - to);
                this.graphCtx.strokeStyle = color;
                this.graphCtx.stroke();
                return to;
            };
            let from = fn1(this.totalImmunized, 0, '#03a9f4');
            from = fn1(this.totalDead, from, '#000000');
            from = fn2(this.totalIllUsingHealthCare, 0, 'orangered');
            fn2(this.totalIllNotUsingHealthCare, from, '#af2f00');
            this.graphCtx.beginPath();
            this.graphCtx.moveTo(this.graphCanvas.width - 7, this.graphCanvas.height - Math.round(this.simParams.healthcareCapacity * this.graphCanvas.height / this.simParams.population));
            this.graphCtx.lineTo(this.graphCanvas.width, this.graphCanvas.height - Math.round(this.simParams.healthcareCapacity * this.graphCanvas.height / this.simParams.population));
            this.graphCtx.strokeStyle = 'lightgreen';
            this.graphCtx.stroke();
        };
        drawWorld();
        if (this.simParams.timeStep % 5 === 0) {
            drawGraph();
        }
    }
    setState(type: string) {
        switch (type) {
            case 'socialDistancing':
                this.simParams.setSocialDistancing();
                break;
            default:
                this.pArray.forEach(p => {
                    if (!p.isDead()) {
                        p.setRndVelocity();
                    } else {
                        p.dx = 0;
                        p.dy = 0;
                    }
                });
                this.simParams.setDefaultPhysics();

        }
    }
    getState() {
        return this.simParams.state;
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