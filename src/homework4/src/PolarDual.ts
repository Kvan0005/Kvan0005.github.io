import { Point, Line } from "./index.js";
import { Shape } from "./Shape.js";
type OBJECT_TYPE = "Point" | "Line";

class PolarDual {
    private primal: Shape;
    private dual: Shape | null;
    private primalType: OBJECT_TYPE;

    constructor(primal: Shape) {
        this.primal = primal;
        this.primalType = primal instanceof Point ? "Point" : "Line";
        this.dual = this.primalType === "Point" ? this.getDualOfPoint() : this.getDualOfLine();
    }

    private getDualOfPoint(): Line | null {
        const { x, y } = this.primal as Point;
        if (y === 0 && x === 0) {
            return null;
        }
        return new Line(x, y);
    }

    private getDualOfLine(): Point {
        const { a, b } = this.primal as Line;
        return new Point(a, b);
    }

    isDualValid(): boolean {
        return this.dual !== null;
    }

    getDual(): Shape {
        if (this.dual === null) {
            throw new Error("Dual is not valid");
        }
        return this.dual;
    }

    getPrimal(): Shape {
        return this.primal;
    }

    getPrimalType(): OBJECT_TYPE {
        return this.primalType;
    }

    draw(p5: any): void {
        if (this.primalType === "Point") {
            this.primal.draw(p5);
        } else {
            this.primal.draw(p5);
        } 
    }
}

export { PolarDual };