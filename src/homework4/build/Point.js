class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(p5) {
        p5.ellipse(this.x, this.y, 4, 4);
    }
    distanceTo(p) {
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    }
}
export { Point };
