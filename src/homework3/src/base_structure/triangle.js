import { getTurn } from "./Point.js";
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

    isInside(p) {
        // lambda functions telling true if all parameters are on the same value
        let allSame = (a, b, c) => a === b && b === c;
        let aTurn = getTurn(this.p1, this.p2, p);
        let bTurn = getTurn(this.p2, this.p3, p);
        let cTurn = getTurn(this.p3, this.p1, p);
        return allSame(aTurn, bTurn, cTurn); 
    }
}