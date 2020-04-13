import SimulationParameters from './SimulationParameters';
export declare class Person {
    simParams: SimulationParameters;
    x: number;
    y: number;
    dx: number;
    dy: number;
    private status;
    infectedTime: number;
    illTime: number;
    outcomeTime: number;
    constructor(simParams: SimulationParameters, x?: number, y?: number, dx?: number, dy?: number);
    step(): void;
    infectChance(infectedTime: number, distance: number): void;
    isUncontaminated(): boolean;
    isInIncubationPeriod(): boolean;
    isIll(): boolean;
    isUsingHealthcare(): boolean;
    isInfectious(): boolean;
    isImmunized(): boolean;
    isDead(): boolean;
    infect(infectedTime: number): void;
    setIll(): void;
    setUseHealthcare(): void;
    setOutcome(): void;
    setRndPosition(): void;
    setRndVelocity(): void;
    render(ctx: CanvasRenderingContext2D): void;
}
