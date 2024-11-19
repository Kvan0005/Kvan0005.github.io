import { Point } from "./Point.js";
import { Shape } from "./Shape.js";
class Line extends Shape {
    /**
     * ax + by = 1 form
     */
    readonly a: number;
    readonly b: number;

    constructor(a: number, b: number) {
        super();
        this.a = a;
        this.b = b;
    }

    /**
     * Get the slope of the line
     */
    getSlope(): number {
        return -this.a / this.b;
    }

    /**
     * Get the y-intercept of the line
     */
    getYIntercept(): number {
        return 1 / this.b;
    }

    static fromTwoPoints(p1: Point, p2: Point): Line | null {
        if (p1.x === p2.x) {
            return new Line(1/p1.x, 0);
        }
        const slope = (p2.y - p1.y) / (p2.x - p1.x);
        const yIntercept = p1.y - slope * p1.x;
        if (yIntercept === 0) {
            null;
        }
        const a = -slope / yIntercept;
        const b = 1 / yIntercept;
        return new Line(a, b);
    }

    getYpoint(x: number): number {
        return x*this.getSlope() + this.getYIntercept();
    }


    draw(p5: any): void {
        const x1 = 0;
        const y1 = this.getYpoint(x1);
        const x2 = p5.windowWidth;
        const y2 = this.getYpoint(x2);
        p5.line(x1, y1, x2, y2);
    }

}

export { Line };