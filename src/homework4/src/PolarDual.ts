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
        return new Line(x, y);
    }

    private getDualOfLine(): Point {
        const { a, b } = this.primal as Line;
        return new Point(a, b);
    }

    isDualValid(): boolean {
        return this.dual !== null;
    }

    getDual(): Line | Point | null {
        return this.dual;
    }

    getPrimal(): Point | Line {
        return this.primal;
    }

    getPrimalType(): OBJECT_TYPE {
        return this.primalType;
    }
}

export { PolarDual };