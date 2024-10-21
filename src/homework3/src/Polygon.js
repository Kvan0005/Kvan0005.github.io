import { getTurn, isALeftTurn , normVectorCross } from "./base_structure/Point.js";
import { DIRECTION , ISINSIDE, DISTANCE} from "./base_structure/Const.js";
import { Triangle } from "./base_structure/triangle.js";
export class Polygon{
    constructor(points){
        this.points = points;
        this.earSet = [];
        this.modified = false;
    }
    
    last(){
        return this.points[this.length()-1];
    }

    first(){
        return this.points[0];
    }

    addNoneCrossingPoint(point){
        if (this.length() < 3) {
            this.points.push(point);
            this.modified = true;
            return true;
        }
        this._sortReverseClockwise();
        const doesIntersect = (p1, p2, p3, p4) => {
            return normVectorCross(p1, p2, p3) * normVectorCross(p1, p2, p4) < 0 &&
                   normVectorCross(p3, p4, p1) * normVectorCross(p3, p4, p2) < 0;
        };
    
        for (let i = 0; i < this.length() - 1; i++) {
            if (doesIntersect(point, this.last(), this.points[i], this.points[i + 1]) ||
                doesIntersect(point, this.first(), this.points[i], this.points[i + 1])) {
                return false;
            }
        }
        this.points.push(point);
        this.modified = true;
        return true;
    }

    getEar(){
        return this._getEarUsingConvexProperty();
    }

    getAllTriangle(){
        if (this.modified === false) {
            return this.earSet;
        }
        let base_set = this.getPoints();
        let n = this.length();
        let triangles = [];
        while (n > 3) {
            let ear = this.getEar();
            if (ear === null) {
                return [];
            }
            triangles.push(new Triangle(this.points[(ear-1+n)%n], this.points[ear], this.points[(ear+1)%n]));
            // eject the ear from the polygon
            this.points.splice(ear, 1);
            n -= 1;
        }
        triangles.push(new Triangle(this.points[0], this.points[1], this.points[2]));
        this.earSet = triangles;
        this.modified = false;
        this.points = base_set;
        return triangles;
    }

    _getEarUsingConvexProperty(){
        let n = this.length();
        let i = 0;
        while (true) {
            let pi_convexity = isALeftTurn(this.points[(i-1+n)%n], this.points[i], this.points[(i+1)%n]);
            if (pi_convexity === true) {
                let piminus1_convexity = isALeftTurn(this.points[(i-2+n)%n], this.points[(i-1+n)%n], this.points[i]);
                let piplus1_convexity = isALeftTurn(this.points[i], this.points[(i+1)%n], this.points[(i+2)%n]);
                if (piminus1_convexity === true && piplus1_convexity === true) {
                    return i;
                }
            }
            i += 1;
            if (i >= n) {
                return null;
            }
            
        }
    }

    _sortReverseClockwise(){
        let n = this.length();
        let min_index = 0;
        for (let i = 1; i < n; i++) {
            if (this.points[i].x < this.points[min_index].x) {
                min_index = i;
            }
        }
        if (getTurn(this.points[(min_index-1+n)%n], this.points[min_index], this.points[(min_index+1)%n]) === DIRECTION.RIGHT) {
            this.points.reverse();
        }
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
        upperTangent = BinarySearch(nearAndFar.compl, this.length()-1, functionToUse)+1;
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