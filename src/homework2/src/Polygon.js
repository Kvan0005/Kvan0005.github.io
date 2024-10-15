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
        let type = TYPE.NORMAL;
        if (getTurn(point, this.points[0], this.points[1]) === DIRECTION.RIGHT && getTurn(point, this.points[0], this.points[this.length()-1]) === DIRECTION.LEFT) {
            type = TYPE.INVERSE;
        }
        let oppositeofP1 = BinarySearch(1, this.length()-1, (i) => {  // todo check if the point is on the line for oppite == 0
            let v = getTurn(point, this.points[0], this.points[i]) === (type===TYPE.NORMAL ? DIRECTION.LEFT:DIRECTION.RIGHT);
            // the rule of the TYPE is for the case where the point is on the blue region in the referece image
            return v;
        });
        
        if (oppositeofP1 === -1) {
            if (type === TYPE.INVERSE){
                print("oppositeofP1=:",oppositeofP1);
                exit();
            }
            oppositeofP1 = 0;
        }

        return {
            p0: type,
            compl: oppositeofP1
        };
        

    }
        
    getUpperTangentFacingPoint(point){
        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
        let nearAndFar = this._getNearAndFarSide(point);
        let upperTangent = null;
        let lowerBound = nearAndFar.compl;
        let upperBound = this.length()-1;
        if (nearAndFar.p0 === TYPE.INVERSE) {
            lowerBound = 0;
            upperBound = nearAndFar.compl;
        }
        let functionToUse = (i) => { return getTurn(point, this.points[i], this.points[(i+1)%this.length()] ) === DIRECTION.RIGHT; };
        upperTangent = BinarySearch(lowerBound,upperBound, functionToUse);
        
        if (upperTangent === -1) {
            upperTangent = lowerBound;
        }else {
            upperTangent = (1+upperTangent)%this.length();
        }
        return this.points[upperTangent];
    }

    getLowerTangentFacingPoint(point){
        if (this.isPointInside(point) === ISINSIDE.INSIDE) {
            return null;
        }
        let nearAndFar = this._getNearAndFarSide(point);
        let upperTangent = null;
        let lowerBound = 0;
        let upperBound = nearAndFar.compl;
        if (nearAndFar.p0 === TYPE.INVERSE) {
            lowerBound = nearAndFar.compl;
            upperBound = this.length()-1;
        }
        let functionToUse = (i) => { return getTurn(point, this.points[i], this.points[(i+1)%this.length()] ) === DIRECTION.LEFT; };
        upperTangent = BinarySearch(lowerBound,upperBound, functionToUse);
        if (upperTangent === -1) {
            upperTangent = lowerBound;
        }else {
            upperTangent = (1+upperTangent)%this.length();
        }
        return this.points[upperTangent];
    }


}

const TYPE ={
    NORMAL: 0,
    INVERSE: 1,
}


if (window.PolygonStruct == undefined) {
    window.PolygonStruct = Polygon;
}
