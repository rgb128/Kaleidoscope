'use strict';

function fillAllCanvas(canvas, color) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number} strokeWidth 
 * @param {string} strokeColor 
 * @param {string} fillColor 
 */
function addRectInternal(canvas, x, y, width, height, strokeWidth, strokeColor, fillColor) {
    if (strokeColor && strokeWidth) {
        x += strokeWidth / 2;
        y += strokeWidth / 2;
        width -= strokeWidth;
        height -= strokeWidth;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    if (strokeColor && strokeWidth) {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {number} strokeWidth 
 * @param {string} strokeColor 
 * @param {string} fillColor 
 */
function addRect(canvas, x, y, width, height, strokeWidth, strokeColor, fillColor) {
    const canvasWidth = canvas.width; 
    const canvasHeight = canvas.height; 

    if ((x + width) > (canvasWidth / 2)) x = canvasWidth / 2 - width; // move left, maybe we should remake this
    if ((y + height) > (canvasHeight / 2)) y = canvasHeight / 2 - height; // move left, maybe we should remake this

    // Main (top left)
    const x1 = x;
    const y1 = y;

    // Top right
    const x2 = canvasWidth - width - x;
    const y2 = y;

    // Bottom right
    const x3 = canvasWidth - width - x;
    const y3 = canvasHeight - height - y;

    // Bottom left
    const x4 = x;
    const y4 = canvasHeight - height - y;

    addRectInternal(canvas, x1, y1, width, height, strokeWidth, strokeColor, fillColor);
    addRectInternal(canvas, x2, y2, width, height, strokeWidth, strokeColor, fillColor);
    addRectInternal(canvas, x3, y3, width, height, strokeWidth, strokeColor, fillColor);
    addRectInternal(canvas, x4, y4, width, height, strokeWidth, strokeColor, fillColor);
}

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
