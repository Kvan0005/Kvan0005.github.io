import {Point, getTurn} from './base_structure/Point.js';
import {DIRECTION} from './base_structure/Const.js';

function grahamScan(points){
    let n = points.length;
    if (n < 3) {
        return points;
    }
    points.sort((a, b) => {return a.x - b.x;});
    let firstPoint = points[0];
    points.shift(); // to 

    points.sort((a, b) => { 
        let turn = getTurn(a, firstPoint, b); // this will return which point is higher the other based on the first point
        return turn === DIRECTION.RIGHT ? -1 : 1;
        // this only works for when the first point is the lowest point on the x-axis
    });
    let hull = [];
    hull.push(firstPoint);
    hull.push(points[0]);
    hull.push(points[1]);
    for (let i = 1; i < n-1; i++) {
        while(getTurn(hull[hull.length - 2], hull[hull.length - 1], points[i]) !== DIRECTION.LEFT){
            hull.pop();
        }
        hull.push(points[i]);
    }
    return hull;
}

if (window.grahamScan === undefined) {
    window.grahamScan = grahamScan;
}