import { DIRECTION } from "./Const.js";
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    eq(p){ // this method checks if two points are equal but is dangerous because in a floating point system, two points that are supposed to be equal may not be equal due to floating point errors
        return this.x === p.x && this.y === p.y;
    }
}

function normVectorCross(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);
}

export function getTurn(p1, p2, p3) {
    /*
    Returns the direction of the turn
    */
    let cross = normVectorCross(p1, p2, p3);
    if (cross > 0) {
        return DIRECTION.RIGHT;
    } else if (cross < 0) {
        return DIRECTION.LEFT;
    } else {
        return DIRECTION.STRAIGHT;
    }
}

if (window.PointStructure === undefined) {
    window.PointStructure = Point;
}