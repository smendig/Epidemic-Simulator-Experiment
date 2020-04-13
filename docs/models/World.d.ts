import SimulationParameters from './SimulationParameters';
import { Person } from './Person';
export declare class World {
    simParams: SimulationParameters;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    graphCanvas: HTMLCanvasElement;
    graphCtx: CanvasRenderingContext2D;
    pArray: Array<Person>;
    started: boolean;
    totalIllUsingHealthCare: number;
    totalIllNotUsingHealthCare: number;
    totalIll: number;
    totalImmunized: number;
    totalDead: number;
    animationFrameID: number;
    constructor(population: number, canvas: HTMLCanvasElement, graphCanvas: HTMLCanvasElement, numberInfected?: number);
    calcInteractions(): void;
    step(): void;
    render(): void;
    setState(type: string): void;
    getState(): string;
    start(): void;
    stop(): void;
}
