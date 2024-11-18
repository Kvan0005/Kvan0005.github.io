class Line {
    /**
     * ax + by = 1 form
     */
    readonly a: number;
    readonly b: number;

    constructor(a: number, b: number) {
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

}

export { Line };