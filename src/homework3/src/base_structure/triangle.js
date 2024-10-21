export class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    getPoints() {
        return [this.p1, this.p2, this.p3];
    }

    getEdges() {
        return [
            [this.p1, this.p2],
            [this.p2, this.p3],
            [this.p3, this.p1]
        ];
    }
}

if (window.TriangleStructure === undefined) {
    window.TriangleStructure = Triangle;
}
