'use strict';
import { World } from './models/World';
let world: World;

document.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    const resetBtnElement = document.getElementById('resetBtn') as HTMLButtonElement;
    resetBtnElement.onclick = () => {
        world.stop();
    };
    start();
};

const start = () => {
    world = new World();
    world.start();
};

