'use strict';
import { World } from './models/World';
let world: World;
const initialPopulation = 500;

document.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    const resetBtnElement = document.getElementById('resetBtn') as HTMLButtonElement;
    const worldCanvasElement = document.getElementById('worldCanvas') as HTMLCanvasElement;
    const graphCanvasElement = document.getElementById('grapthCanvas') as HTMLCanvasElement;
    // const totalEnergyElement = document.getElementById('totalEnergy') as HTMLSpanElement;
    const populationElement = document.getElementById('population') as HTMLSpanElement;
    const healthcareCapacityElement = document.getElementById('healthcareCapacity') as HTMLSpanElement;
    const totalHealthcareElement = document.getElementById('totalHealthcare') as HTMLSpanElement;
    const totalInfectedElement = document.getElementById('totalInfected') as HTMLSpanElement;
    const totalDeathsElement = document.getElementById('totalDeaths') as HTMLSpanElement;
    const deathRateElement = document.getElementById('deathrate') as HTMLSpanElement;
    const populationRangeElement = document.getElementById('populationRange') as HTMLInputElement;
    const healthcareRangeElement = document.getElementById('healthcareRange') as HTMLInputElement;
    const gravityRangeElement = document.getElementById('gravityRange') as HTMLInputElement;
    const dragRangeElement = document.getElementById('dragRange') as HTMLInputElement;
    let reflreshInterval;

    const reset = (population: number = 500) => {
        world.stop();
        world = new World(population, worldCanvasElement, graphCanvasElement);
        world.start();
    };

    resetBtnElement.onclick = () => {
        reset();
    };
    const socialDistancingBtnElement = document.getElementById('socialDistancingBtn') as HTMLButtonElement;
    socialDistancingBtnElement.onclick = () => {
        if (world.getState() === 'socialDistancing') {
            world.setState('default');

        } else {
            world.setState('socialDistancing');
        }
    };
    populationRangeElement.onchange = () => {
        reset(Number(populationRangeElement.value));
        populationRangeElement.nextElementSibling.innerHTML = populationRangeElement.value;
    };
    healthcareRangeElement.onchange = () => {
        world.simParams.healthcareCapacity = Number(healthcareRangeElement.value);
        healthcareRangeElement.nextElementSibling.innerHTML = healthcareRangeElement.value;
    };
    gravityRangeElement.onchange = () => {
        world.simParams.gForce = Number(gravityRangeElement.value);
    };
    dragRangeElement.onchange = () => {
        world.simParams.drag = Number(dragRangeElement.value);
    };
    world = new World(initialPopulation, worldCanvasElement, graphCanvasElement);
    world.start();
    reflreshInterval = setInterval(() => {
        // totalEnergyElement.innerHTML = String(world.totalElergy.toFixed(2));
        populationElement.innerHTML = String(world.simParams.population);
        healthcareCapacityElement.innerHTML = String(world.simParams.healthcareCapacity);
        totalInfectedElement.innerHTML = String(world.totalIll);
        totalDeathsElement.innerHTML = String(world.totalDead);
        totalHealthcareElement.innerHTML = String(world.totalIllUsingHealthCare);
        deathRateElement.innerHTML = world.totalImmunized ? String(((world.totalDead / world.totalImmunized) * 100).toFixed(1)) + '%' : '-';
        healthcareRangeElement.value = String(world.simParams.healthcareCapacity);
        healthcareRangeElement.nextElementSibling.innerHTML = String(world.simParams.healthcareCapacity);
        gravityRangeElement.value = String(world.simParams.gForce);
        gravityRangeElement.nextElementSibling.innerHTML = String(world.simParams.gForce);
        dragRangeElement.value = String(world.simParams.drag);
        dragRangeElement.nextElementSibling.innerHTML = String(world.simParams.drag);
    }, 500);
};