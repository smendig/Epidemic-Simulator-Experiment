'use strict';
export default class SimulationParameters {
    numberOfP: number;
    gForce: number;
    boundElasticity: number;
    drag: number;
    distanceInfectionProbability: number;
    distanceInfectRadius: number;
    contactInfectionProbability: number;
    contactInfectRadius: number;
    incubationPeriod: number;
    illPeriod: number;
    timeStep: number;
    healthcareCapacity: number;
    deathRate: number;
    deathRateWithhealthcare: number;
    width: number;
    height: number;
    state: string;
    constructor() {
        this.timeStep = 0;
        this.width = 500;
        this.height = 500;
        this.setDefaultPhysics();
    }
    setDefaultPhysics() {
        this.numberOfP = 500;
        this.gForce = 0;
        this.boundElasticity = 0.99;
        this.drag = 1;
        this.distanceInfectionProbability = 0.0001;
        this.distanceInfectRadius = 50;
        this.contactInfectionProbability = 0.10;
        this.contactInfectRadius = 3;
        this.incubationPeriod = 300;
        this.illPeriod = 700;
        this.healthcareCapacity = 100;
        this.deathRate = 0.15;
        this.deathRateWithhealthcare = 0.02;
        this.state = 'default';
    }
    setSocialDistancing() {
        this.gForce = -10;
        this.drag = 0.95;
        this.state = 'socialDistancing';
    }
}