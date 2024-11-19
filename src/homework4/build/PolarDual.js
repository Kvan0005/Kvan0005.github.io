import { Point, Line } from "./index.js";
class PolarDualLine extends Line {
    getDual() {
        const { a, b } = this;
        return new PolarDualPoint(a, b);
    }
    type() {
        return "Line";
    }
}
class PolarDualPoint extends Point {
    getDual() {
        const { x, y } = this;
        if (y === 0 && x === 0) {
            throw new Error("Dual is not valid");
        }
        return new PolarDualLine(x, y);
    }
    type() {
        return "Point";
    }
}
export { PolarDualLine, PolarDualPoint };
