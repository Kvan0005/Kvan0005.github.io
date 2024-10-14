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
            return getTurn(cpoints[0], cpoints[i], point) === DIRECTION.LEFT; // this is a radial sweep then binary search to find the 2 points that the point is between
        });
        if (lower_bound === -1 || point.x < cpoints[0].x) { // case where the point is to the left of the leftmost point meaning it is outside
            return ISINSIDE.OUTSIDE;
        }
        return getTurn(cpoints[lower_bound], cpoints[lower_bound + 1], point) != DIRECTION.RIGHT? ISINSIDE.INSIDE : ISINSIDE.OUTSIDE;
    }

    _getNearAndFarSide(point){i
        let p0FarOrNear = getTurn(point, this.points[0], this.points[1]); // this will idicate the direction of the first point and also if p1 is near or far
        if (p0FarOrNear === DIRECTION.STRAIGHT) {
            // will be unhadled for now
            return null;
        }
        print("p0 status: ",p0FarOrNear);
        let oppositeofP1 = BinarySearch(1, this.length()-1, (i) => { 
            let v = getTurn(point, this.points[0], this.points[i]) === p0FarOrNear;
            return v;
        });
        print("opposite of p0: ", oppositeofP1);
        if (oppositeofP1 === -1) {
            print("Error: no opposite found");
            exit();
            return null; // this will be unhadled for now
        }

        let isP0far = p0FarOrNear===DIRECTION.LEFT;
        if (isP0far) {
            return {
                p0: DISTANCE.FAR,
                near: this.points[oppositeofP1],
                far: this.points[0]
            };
        } else{
            return {
                p0: DISTANCE.NEAR,
                near: this.points[0],
                far: this.points[oppositeofP1]
            };
        }
    }
        
    getUpperTangentFacingPoint(point){
        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
        let n = this.length();
        let nearAndFar = this._getNearAndFarSide(point);
        let upperTangent = null;

        print(nearAndFar);
        if (nearAndFar.p0 === DISTANCE.NEAR) {
            upperTangent = BinarySearch(nearAndFar.far, nearAndFar.near, (i) => {
                return getTurn(point, this.points[i], points[(i+1)%n] ) === DIRECTION.LEFT;
            });
        } else{
            upperTangent = BinarySearch(nearAndFar.near, nearAndFar.far, (i) => {
                return getTurn(point, this.points[i], points[(i+1)%n] ) === DIRECTION.RIGHT;
            });
        }
        return upperTangent;

    
    }

    getLowerTangentFacingPoint(point){

        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
        let n = this.length();
        let nearAndFar = this._getNearAndFarSide(point);
        let lowerTangent = null;
        if (nearAndFar.p0 === DISTANCE.NEAR) {
            lowerTangent = BinarySearch(nearAndFar.near, nearAndFar.far, (i) => {
                return getTurn(point, this.points[i], points[(i+1)%n] ) === DIRECTION.RIGHT;
            });
        } else{
            lowerTangent = BinarySearch(nearAndFar.far, nearAndFar.near, (i) => {
                return getTurn(point, this.points[i], points[(i+1)%n] ) === DIRECTION.LEFT;
            });
        }
        return lowerTangent;
    }


}

const DISTANCE ={
    NEAR: "near",
    FAR: "far"
}


if (window.PolygonStruct == undefined) {
    window.PolygonStruct = Polygon;
}
