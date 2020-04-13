'use strict';
import SimulationParameters from './SimulationParameters';

const rad = 2;
const piRad = 2 * Math.PI;

export class Person {
    simParams: SimulationParameters;
    x: number;
    y: number;
    dx: number;
    dy: number;
    private status: number;
    // 0 = not infected
    // 10 = incubationPeriod
    // 11 = Ill
    // 12 = Ill with healthcare treatment
    // 20 = immunized
    // 30 = death
    infectedTime: number;
    illTime: number;
    outcomeTime: number;
    constructor(simParams: SimulationParameters, x = 0, y = 0, dx = 0, dy = 0) {
        this.simParams = simParams;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.status = 0;
    }
    step() {
        if (this.simParams.drag !== 1) {
            this.dx = this.dx * this.simParams.drag;
            this.dy = this.dy * this.simParams.drag;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (this.isInIncubationPeriod() && this.simParams.timeStep > this.illTime) {
            return this.setIll();
        }
        if (this.isIll() && this.simParams.timeStep > this.outcomeTime) {
            this.setOutcome();
        }
    }
    infectChance(infectedTime: number, distance: number) {
        const rnd = Math.random();
        if (distance < this.simParams.contactInfectRadius && rnd < this.simParams.contactInfectRadius) {
            return this.infect(infectedTime);
        }
        if (rnd < this.simParams.distanceInfectionProbability) {
            this.infect(infectedTime);
        }
    }
    isUncontaminated() {
        return this.status === 0;
    }
    isInIncubationPeriod() {
        return this.status === 10;
    }
    isIll() {
        return this.status === 11 || this.status === 12;
    }
    isUsingHealthcare() {
        return this.status === 12;
    }
    isInfectious() {
        return this.status === 10 || this.status === 11 || this.status === 12;
    }
    isImmunized() {
        return this.status === 20;
    }
    isDead() {
        return this.status === 30;
    }
    infect(infectedTime: number) {
        this.status = 10;
        this.infectedTime = infectedTime;
        const incubationPeriodRnd = this.simParams.incubationPeriod + Math.round((Math.random() * (this.simParams.incubationPeriod / 4)) - this.simParams.incubationPeriod / 8);
        this.illTime = infectedTime + incubationPeriodRnd;
    }
    setIll() {
        this.status = 11;
        const illPeriodRnd = this.simParams.illPeriod + Math.round((Math.random() * (this.simParams.illPeriod / 4)) - this.simParams.illPeriod / 8);
        this.outcomeTime = this.illTime + illPeriodRnd;
    }
    setUseHealthcare() {
        this.status = 12;
    }
    setOutcome() {
        if (Math.random() < (this.status === 12 ? this.simParams.deathRateWithhealthcare : this.simParams.deathRate)) {
            this.dx = 0;
            this.dy = 0;
            this.status = 30;
            return;
        }
        this.status = 20;
    }
    setRndPosition() {
        this.x = Math.random() * this.simParams.width;
        this.y = Math.random() * this.simParams.height;
    }
    setRndVelocity() {
        this.dx = Math.random() * 1 - 1 / 2;
        this.dy = Math.random() * 1 - 1 / 2;
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0, piRad, false);
        switch (this.status) {
            case 0:
                ctx.fillStyle = 'lime';
                break;
            case 10:
                ctx.fillStyle = 'green';
                break;
            case 11:
                ctx.fillStyle = 'orangered';
                break;
            case 12:
                ctx.fillStyle = 'orangered';
                break;
            case 20:
                ctx.fillStyle = '#03a9f4';
                break;
            case 30:
                ctx.fillStyle = '#000000';
                break;
        }
        ctx.fill();
    }
}