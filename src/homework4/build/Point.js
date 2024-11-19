import { Shape } from "./Shape.js";
class Point extends Shape {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    draw(p5) {
        p5.ellipse(this.x, this.y, 4, 4);
    }
}
export { Point };
