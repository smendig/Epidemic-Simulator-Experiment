export default class SimulationParameters {
    population: number;
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
    constructor(population?: number);
    setDefaultPhysics(): void;
    setSocialDistancing(): void;
}
