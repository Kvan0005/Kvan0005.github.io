import { Point, Line } from "./index";

type OBJECT_TYPE = "Point" | "Line";

class PolarDual {
    private primal: Point | Line;
    private dual: Line | Point | null;
    private primalType: OBJECT_TYPE;

    constructor(primal: Point | Line) {
        this.primal = primal;
        this.primalType = primal instanceof Point ? "Point" : "Line";
        this.dual = this.primalType === "Point" ? this.getDualOfPoint() : this.getDualOfLine();
    }

    private getDualOfPoint(): Line | null {
        const { x, y } = this.primal as Point;
        if (y === 0 && x === 0) {
            return null;
        }
        if (y === 0) {
            return new Line(, 1);
        }
        return new Line(-x / y, 1/y);
    }

    private getDualOfLine(): Point  | null {
        const { m, c } = this.primal as Line;
        if (c === 0 && m === 0) {
            return null
        }
        return new Point(-m/c, 1/c);
    }
}



export { PolarDual };