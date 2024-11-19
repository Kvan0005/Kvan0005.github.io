import { Point, Line } from "./index.js";
class PolarDual {
    constructor(primal) {
        this.primal = primal;
        this.primalType = primal instanceof Point ? "Point" : "Line";
        this.dual = this.primalType === "Point" ? this.getDualOfPoint() : this.getDualOfLine();
    }
    getDualOfPoint() {
        const { x, y } = this.primal;
        if (y === 0 && x === 0) {
            return null;
        }
        return new Line(x, y);
    }
    getDualOfLine() {
        const { a, b } = this.primal;
        return new Point(a, b);
    }
    isDualValid() {
        return this.dual !== null;
    }
    getDual() {
        return this.dual;
    }
    getPrimal() {
        return this.primal;
    }
    getPrimalType() {
        return this.primalType;
    }
    draw(p5) {
        if (this.primalType === "Point") {
            this.primal.draw(p5);
        }
        else {
            this.primal.draw(p5);
        }
    }
}
export { PolarDual };
