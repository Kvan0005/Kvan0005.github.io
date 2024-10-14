/* eslint-disable no-undef, no-unused-vars */
// global variables

var points = [];
var convexHull = [];
var mainDraw = null;
var temporaryButton = [];

// this is for the polygon
var modePolygone = false;
var polygon = null;
var pointToCheck = null;
// ---------------------------------------------------------------------view functions ---------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  // clear all buttons
  
  // Put setup code here
  fill("black");
  textSize(40);
  button = customButton(30, 85, "Clear", resetpoints);
  dropBox = createDropBox(30, 120, ["CH(S) algo", "polygon algo"]);
  changeMode("0");
}

function customButton(x, y, text, callback) {
  print("Creating button", text);
  button = createButton(text);
  button.position(x, y);
  button.mousePressed(callback);
  return button;
}

function createDropBox(x, y, options) {
  dropBox = createSelect();
  dropBox.position(x, y);
  // when choosing an option, a lambda function is called
  for (i in options) {
    dropBox.option(options[i]);
  }
  dropBox.changed(() => {
    for (i in options) {
      if (dropBox.value() === options[i]) {
        changeMode(i);
        break;
      }
    }
  });
  return dropBox;
}

function changeMode(i) {
  temporaryButton.forEach((button) => {try {button.remove();} catch (e) {print(e);}});
  temporaryButton = [];
  resetpoints();
  switch (i) {
    case "0":
      print("Convex Hull");
      temporaryButton = drawConvexHullSetup();
      mainDraw = drawConvexHull;
      break;
    case "1":
      print("Polygone");
      temporaryButton = drawPolygoneSetup();
      mainDraw = drawPolygone;
      break;
  }
}

function resetpoints() {
  points = [];
  convexHull = [];
  polygon = null;
  pointToCheck = null;
  modePolygone = false;
}

function draw() {
  // Put drawings here
  background(200);
  for (i in points) {
    ellipse(points[i].x, points[i].y, 4, 4);
  }
  // draw a gray rectangle 
  fill("gray");
  rect(0, 0, 200, height);
  fill("black");
  if (mainDraw !== null) {
    mainDraw();
  }
}

function mousePressed() {
  if (mouseX > 200){
    if (polygonPoint()) {
      pointToCheck = new PointStructure(mouseX, mouseY);
    } else {
      points.push(new PointStructure(mouseX, mouseY));
    } 
  }
}

function polygonPoint() {
  // this is for swapping between polygon point and the point that we want to check
  return window.dropBox.value() === "polygon algo" && modePolygone===true
}
// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
// ---------------------------------------------------------------------view functions ---------------------------------------------------------------------
// ---------------------------------------------------------------------Component functions ---------------------------------------------------------------------


// ------------------- Convex Hull -------------------
function ConvexHullAlgorithm() {
  // add to convexHull all the points from grahamScan which is a list of points
  convexHull = grahamScan(points);
}

function drawConvexHull() {
  for (i in convexHull) {
    ellipse(convexHull[i].x, convexHull[i].y, 4, 4);
  }
  stroke("red");
  for (let i = 0; i < convexHull.length; i++) {
    if (i == convexHull.length - 1) {
      line(convexHull[i].x, convexHull[i].y, convexHull[0].x, convexHull[0].y);
    } else {
      line(
        convexHull[i].x,
        convexHull[i].y,
        convexHull[i + 1].x,
        convexHull[i + 1].y
      );
    }
  }
  stroke("black");
}

function drawConvexHullSetup() {
  return [customButton(30, 150, "Convex Hull", ConvexHullAlgorithm)];
}
// ----------------------------------------------------
// -------------------------Polygone---------------------
function PolygoneAlgorithm() { 
  polygon = new PolygonStruct(grahamScan(points));
}

function drawPolygone() {
  if (polygon != null) {
    let polygonPoints = polygon.getPoints();
    for (i in polygonPoints) {
      ellipse(polygonPoints[i].x, polygonPoints[i].y, 4, 4);
    }
    stroke("red");
    for (let i = 0; i < polygonPoints.length; i++) {
      if (i == polygonPoints.length - 1) {
        line(polygonPoints[i].x, polygonPoints[i].y, polygonPoints[0].x, polygonPoints[0].y);
      } else {
        line(polygonPoints[i].x, polygonPoints[i].y, polygonPoints[i + 1].x, polygonPoints[i + 1].y);
      }
    }
    
    if (pointToCheck != null) {
      let isInside = polygon.isPointInside(pointToCheck);
      if (isInside === ISINSIDE.INSIDE) {
        fill("green");
        stroke("green");
      } else {
        fill("red");
        stroke("red");
        let upperTangent = polygon.getUpperTangentFacingPoint(pointToCheck);
        print("upper:=",upperTangent);
        // let lowerTangent = polygon.getLowerTangentFacingPoint(pointToCheck);
        line(pointToCheck.x, pointToCheck.y, upperTangent.x, upperTangent.y);
        // line(pointToCheck.x, pointToCheck.y, lowerTangent.x, lowerTangent.y);
      }
      ellipse(pointToCheck.x, pointToCheck.y, 4, 4);
      text("Point is inside: " + isInside, 200, 200);
    }
    
    fill("black");
    stroke("black");
  }
}

function drawPolygoneSetup() {
  return [
    customButton(30, 150, "Polygone", PolygoneAlgorithm),
    customButton(30, 200, "Toggle mode", () => { 
      print("Toggle mode");
      modePolygone = !modePolygone;
    })
  ];
}

// ---------------------------------------------------------------------Component functions ---------------------------------------------------------------------