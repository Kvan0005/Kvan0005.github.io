class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    /**
     * Get the slope of the line
     */
    getSlope() {
        return -this.a / this.b;
    }
    /**
     * Get the y-intercept of the line
     */
    getYIntercept() {
        return 1 / this.b;
    }
    static fromTwoPoints(p1, p2) {
        if (p1.x === p2.x) {
            return [1 / p1.x, 0];
        }
        const slope = (p2.y - p1.y) / (p2.x - p1.x);
        const yIntercept = p1.y - slope * p1.x;
        if (yIntercept === 0) {
            return null;
        }
        const a = -slope / yIntercept;
        const b = 1 / yIntercept;
        return [a, b];
    }
    getYpoint(x) {
        return x * this.getSlope() + this.getYIntercept();
    }
    draw(p5) {
        const x1 = 0;
        const y1 = this.getYpoint(x1);
        const x2 = p5.windowWidth;
        const y2 = this.getYpoint(x2);
        p5.line(x1, y1, x2, y2);
    }
}
export { Line };
