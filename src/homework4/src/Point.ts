import { Shape } from "./Shape.js";
class Point implements Shape {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(p5: any): void {
        p5.ellipse(this.x, this.y, 4, 4);
    }

    distanceTo(p: Point): number {
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    }
}


export { Point };