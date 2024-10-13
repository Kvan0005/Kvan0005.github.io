/* eslint-disable no-undef, no-unused-vars */
var points = [];

const MODE ={
  CONVEX_HULL: 0,

}
var convexHull = [];
var mainDraw = null;
var mode = MODE.CONVEX_HULL;
var temporaryButton =[];


function setup() {
  createCanvas(windowWidth, windowHeight);
  // clear all buttons
  
  // Put setup code here
  fill("black");
  textSize(40);
  button = customButton(30, 85, "Clear", resetpoints);
  dropBox = createDropBox(30, 120, ["CH(S) algo", "Option 2"]);
  changeMode("0");
}

function customButton(x, y, text, callback) {
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
        print(i);
        changeMode(i);
        break;
      }
    }
  });
  return dropBox;
}

function changeMode(i) {
  temporaryButton.forEach((button) => {
    button.remove();
  }
  );
  resetpoints();
  switch (i) {
    case "0":
      mode = MODE.CONVEX_HULL;
      temporaryButton = drawConvexHullSetup();
      mainDraw = drawConvexHull;
      break;
  }
}

function resetpoints() {
  points = [];
  convexHull = [];
}

function draw() {
  // Put drawings here
  background(200);
  for (i in points) {
    ellipse(points[i].x, points[i].y, 4, 4);
  }
  // draw a gray rectangle 
  fill(200);
  rect(0, 0, 200, height);
  fill("black");

  if (mainDraw !== null) {
    mainDraw();
  }
}

function mousePressed() {
  if (mouseX > 200){
    points.push(new PointStructure(mouseX, mouseY));
  }
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};


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