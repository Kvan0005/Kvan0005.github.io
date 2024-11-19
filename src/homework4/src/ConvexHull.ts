import { Point } from './Point';

function orientation_determinant(a:Point, b:Point, c:Point): number {
	// > 0 is RIGHT, < 0 is LEFT, = 0 is colinear
	return (b.x * c.y) - (a.x * c.y) + (a.x * b.y) - (b.y * c.x) + (a.y * c.x) - (a.y * b.x);
}

function getMinimalX(points_list: Point[]): Point {
	let min = points_list[0];
	for (let i = 0; i < points_list.length; i++) {
		if (points_list[i].x < min.x) {
			min = points_list[i];
		}
	}
	return min;
}
function grahamScan(points: Point[]): Point[] {
    if (points.length <= 2) {
		return points;
	}
	let copy = points.slice();
	let min_x = getMinimalX(copy);
	copy = copy.filter((x) => x !== min_x);
	copy.sort( (a, b) => {
        let orientation = orientation_determinant(min_x, a, b);
        if (orientation === 0) {
            return a.distanceTo(min_x) - b.distanceTo(min_x);
        }
        return orientation;
    });

	copy.unshift(min_x);
	let result = [copy[0], copy[1]];
	for (let i = 2; i < copy.length; i++) {
		while (result.length >= 2 && orientation_determinant(result[result.length-2], result[result.length-1], copy[i]) >= 0) {
			result.pop();
		}
		result.push(copy[i]);
	}
	return result;
}


export { grahamScan };