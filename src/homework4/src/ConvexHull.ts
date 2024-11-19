import test from 'node:test';
import { Point } from './Point';

function grahamScan(points: Point[]): Point[] {
    const n = points.length;
    if (n < 3) {
        return points;
    }
    points.sort((a, b) => {
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    });
    const hull: Point[] = [];
    hull.push(points[0]);
    hull.push(points[1]);
    for (let i = 2; i < n; i++) {
        let top = hull.length - 1;
        while (top > 0 && !isCCW(hull[top - 1], hull[top], points[i])) {
            hull.pop();
            top--;
        }
        hull.push(points[i]);
    }
    return hull;
}

function isCCW(p1: Point, p2: Point, p3: Point): boolean {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
}


export { grahamScan };