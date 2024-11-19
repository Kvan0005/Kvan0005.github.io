import { Shape } from "./Shape.js";
class Point extends Shape {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    draw(p5: any): void {
        p5.ellipse(this.x, this.y, 4, 4);
    }
}


export { Point };