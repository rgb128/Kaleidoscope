'use strict';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let state = 0; // 0 - filling canvas, 1 - making kaleidoscope (no click), 2 - show kaleidoscope

const colors = ['white', 'red', 'blue'];

// canvas.width = document.documentElement.clientWidth;
// canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth * 2;
canvas.height = document.documentElement.clientHeight * 2;
fillAllCanvas(canvas, 'black');

document.addEventListener('click', e => {
    console.log(e);
});

function addRandomRect() {
    const maxWidth = canvas.width / 2;
    const maxHeight = canvas.height / 2;

    let x, y, width, height;

    const side = randomInt(1, 4);
    if (side === 1) { // Top
        y = 0;
        height = map(Math.random(), 0, 1, 1, maxHeight);
        const x1 = map(Math.random(), 0, 1, 0, maxWidth);
        const x2 = map(Math.random(), 0, 1, 0, maxWidth);
        width = Math.abs(x1 - x2);
        x = Math.min(x1, x2);
    } else if (side === 2) { // Bottom
        height = map(Math.random(), 0, 1, 1, maxHeight);
        y = maxHeight - height;
        const x1 = map(Math.random(), 0, 1, 0, maxWidth);
        const x2 = map(Math.random(), 0, 1, 0, maxWidth);
        width = Math.abs(x1 - x2);
        x = Math.min(x1, x2);
    } else if (side === 3) { // Left
        x = 0;
        width = map(Math.random(), 0, 1, 1, maxWidth);
        const y1 = map(Math.random(), 0, 1, 0, maxHeight);
        const y2 = map(Math.random(), 0, 1, 0, maxHeight);
        height = Math.abs(y1 - y2);
        y = Math.min(y1, y2);
    } else if (side === 4) { // Right
        width = map(Math.random(), 0, 1, 1, maxWidth);
        x = maxWidth - width;
        const y1 = map(Math.random(), 0, 1, 0, maxHeight);
        const y2 = map(Math.random(), 0, 1, 0, maxHeight);
        height = Math.abs(y1 - y2);
        y = Math.min(y1, y2);
    } else { console.error('Unknown side, not [1..4]') }

    let strokeColor, strokeWidth;
    if (randomInt(1, 2) === 1) { // with stroke
        strokeWidth = map(Math.random(), 0, 1, 1, Math.min(width, height) / 3);
        strokeColor = colors[randomInt(0, colors.length - 1)];
    }
    const fillColor = colors[randomInt(0, colors.length - 1)];

    addRect(canvas, x, y, width, height, strokeWidth, strokeColor, fillColor);
}
