/* eslint-disable no-undef, no-unused-vars */
// global variables

var polygon = null;
var ear = null;
// ---------------------------------------------------------------------view functions ---------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  // clear all buttons
  
  // Put setup code here
  fill("black");
  textSize(40);
  button = customButton(30, 85, "Clear", resetpoints);
  button = customButton(30, 120, "find ears", () => {getEar();});
}

function customButton(x, y, text, callback) {
  print("Creating button", text);
  button = createButton(text);
  button.position(x, y);
  button.mousePressed(callback);
  return button;
}


function resetpoints() {
  let p = [];
  polygon = new PolygonStruct(p);
  ear = null;
}

function draw() {
  // Put drawings here
  if (polygon != null) {
    background(200);
    let points = polygon.getPoints();
    for (i in points) {
      ellipse(points[i].x, points[i].y, 4, 4);
    }
    // draw a gray rectangle 
    for (let i = 0; i < points.length; i++) {
      if (i == points.length - 1) {
        line(points[i].x, points[i].y, points[0].x, points[0].y);
      } else {
        line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      }
    }
    if (ear != null) {
      let a = ear;
      let b = points[(a + 1) % points.length];
      let c = points[(a - 1 + points.length) % points.length];
      fill("green");
      triangle(points[a].x, points[a].y, b.x, b.y, c.x, c.y);
    }
    fill("gray");
    rect(0, 0, 200, height);
    fill("black");
  }
}

function mousePressed() {
  if (polygon == null) {
    let p = [];
    polygon = new PolygonStruct(p);
    print("Creating new polygon");
  }
  if (mouseX > 200){
    if ( ! polygon.addNoneCrossingPoint(new PointStructure(mouseX, mouseY))) {
      print("The creable polygon is not simple");
    }
    print("Adding point");
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
// ---------------------------------------------------------------------view functions ---------------------------------------------------------------------
// ---------------------------------------------------------------------Component functions ---------------------------------------------------------------------
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
  }
}

function getEar() {
  if (polygon == null) {
    print("No polygon found");
    return;
  }
  ear = polygon.getEar();
  if (ear != null) {
    print("Ear found");
  } else {
    print("No ear found");
  }
}