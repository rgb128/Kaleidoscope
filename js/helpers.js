'use strict';

function round(base, afterDelimiter = 0) {
    const ten = Math.pow(10, afterDelimiter);
    return Math.round(base * ten) / ten;
}
function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}
/** 
 * @param {number} from including
 * @param {number} to including 
*/
function randomInt(from, to) {
    const rnd = Math.random(); // [0..1)
    const delta = to + 1 - from;
    const res = from + Math.floor(delta * rnd);
    return Math.round(res);
}

function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
