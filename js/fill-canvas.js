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
