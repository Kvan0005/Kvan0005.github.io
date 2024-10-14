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
        return getTurn(cpoints[lower_bound], cpoints[(lower_bound + 1)%n], point) != DIRECTION.RIGHT? ISINSIDE.INSIDE : ISINSIDE.OUTSIDE;
    }

    _getNearAndFarSide(point){
        let p0FarOrNear = getTurn(point, this.points[0], this.points[1]); // this will idicate the direction of the first point and also if p1 is near or far
        if (p0FarOrNear === DIRECTION.STRAIGHT) {
            // will be unhadled for now
            return null;
        }
        let oppositeofP1 = BinarySearch(1, this.length()-1, (i) => {  // todo check if the point is on the line for oppite == 0
            let v = getTurn(point, this.points[0], this.points[i]) === p0FarOrNear;
            return v;
        });
        print("opo=:",oppositeofP1);
        if (oppositeofP1 === -1) {
            exit();
            return null; // this will be unhadled for now
        }

        let isP0far = p0FarOrNear===DIRECTION.LEFT;
        if (isP0far) {
            return {
                p0: DISTANCE.FAR,
                compl: oppositeofP1,
            };
        } else{
            return {
                p0: DISTANCE.NEAR,
                compl: oppositeofP1,
            };
        }
    }
        
    getUpperTangentFacingPoint(point){
        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
        let nearAndFar = this._getNearAndFarSide(point);
        let upperTangent = null;

        let dir = nearAndFar.p0 === DISTANCE.NEAR? DIRECTION.LEFT : DIRECTION.RIGHT;
        let functionToUse = (i) => { return getTurn(point, this.points[i], this.points[(i+1)%this.length()] ) === dir; };
        if (nearAndFar.compl ===  this.length()-1) {
            upperTangent = BinarySearch(1, nearAndFar.compl, functionToUse);
        }else{
            upperTangent = BinarySearch(nearAndFar.compl, this.length()-1, functionToUse);
        }
        print("upperTangent=:",upperTangent);
        return this.points[upperTangent];

    
    }

    getLowerTangentFacingPoint(point){

        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
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
