'use strict';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let state = -1; // -1 - waiting, 0 - filling canvas, 1 - making kaleidoscope (no click), 2 - show kaleidoscope

const colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'magenta', 'purple'];

canvas.width = document.documentElement.clientWidth * 2;
canvas.height = document.documentElement.clientHeight * 2;
fillAllCanvas(canvas, 'black');

let interval;

document.addEventListener('click', e => {
    if (state === -1) {
        state = 0;
        addRandomRect();
        interval = setInterval(() => {
            addRandomRect();
        }, 314);
    } else if (state === 0) {
        state = 1;
        const container = document.getElementById('container');
        const child = container.firstElementChild;
        child.style.backgroundImage = `url('${canvas.toDataURL()}')`;
        clearInterval(interval);
        canvas.style.transform = 'scale(.5)';
        setTimeout(() => {
            const childCount = randomInt(10, 10);
            const angle = 360 / childCount;
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            const triangleHalfWidth = height * Math.tan(angle / 2 * Math.PI / 180);
            const x1 = width / 2 - triangleHalfWidth;
            const x2 = width / 2 + triangleHalfWidth;
            child.style.clipPath = `polygon(50% 100%, ${x1}px 0px, ${x2}px 0px)`;
            child.style.top = '-50%';
            container.classList.remove('hidden-item');
            canvas.classList.add('hidden-item');
            //todo fix animations
        }, 0);
    }
});

