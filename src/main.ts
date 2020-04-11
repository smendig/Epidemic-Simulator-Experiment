'use strict';
import { World } from './models/World';
let world: World;

document.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    const resetBtnElement = document.getElementById('resetBtn') as HTMLButtonElement;
    const worldCanvasElement = document.getElementById('worldCanvas') as HTMLCanvasElement;
    const graphCanvasElement = document.getElementById('grapthCanvas') as HTMLCanvasElement;
    // const totalEnergyElement = document.getElementById('totalEnergy') as HTMLSpanElement;
    const totalHealthcareElement = document.getElementById('totalHealthcare') as HTMLSpanElement;
    const totalInfectedElement = document.getElementById('totalInfected') as HTMLSpanElement;
    const totalDeathsElement = document.getElementById('totalDeaths') as HTMLSpanElement;
    const deathRateElement = document.getElementById('deathrate') as HTMLSpanElement;
    let reflreshInterval;
    resetBtnElement.onclick = () => {
        world.stop();
        world = new World(worldCanvasElement, graphCanvasElement);
        world.start();
    };
    const socialDistancingBtnElement = document.getElementById('socialDistancingBtn') as HTMLButtonElement;
    socialDistancingBtnElement.onclick = () => {
        if (world.getState() === 'socialDistancing') {
            world.setState('default');

        } else {
            world.setState('socialDistancing');
        }
    };
    world = new World(worldCanvasElement, graphCanvasElement);
    world.start();
    reflreshInterval = setInterval(() => {
        // totalEnergyElement.innerHTML = String(world.totalElergy.toFixed(2));
        totalInfectedElement.innerHTML = String(world.totalInfected);
        totalDeathsElement.innerHTML = String(world.totalDead);
        totalHealthcareElement.innerHTML = String(world.totalUsingHealthCare);
        deathRateElement.innerHTML = String(((world.totalDead / world.pArray.length) * 100).toFixed(2));
    }, 500);
};
