import { getTurn } from "./base_structure/Point.js";
import { DIRECTION , ISINSIDE} from "./base_structure/Const.js";

class Polygon{
    constructor(points){
        this.points = points;
    }

    getPoints(){
        return this.points.slice();
    }

    length(){
        return this.points.length;
    }

    isPointInside(point){
        let n = this.length(); 
        let cpoints = this.getPoints();
        let lower_bound = BinarySearch(1, n-1, (i) => {
            return getTurn(cpoints[0], cpoints[i], point) === DIRECTION.LEFT;
        });
        if (lower_bound === -1) {
            return ISINSIDE.OUTSIDE;
        }
        return getTurn(cpoints[lower_bound], cpoints[lower_bound + 1], point) != DIRECTION.RIGHT? ISINSIDE.INSIDE : ISINSIDE.OUTSIDE;
    }
}

if (window.PolygonStruct == undefined) {
    window.PolygonStruct = Polygon;
}
