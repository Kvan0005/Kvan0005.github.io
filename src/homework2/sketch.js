/* eslint-disable no-undef, no-unused-vars */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Put setup code here
  fill("black");
  textSize(40);
  button = createButton("Clear");
  button.position(30, 85);
  button.mousePressed(resetpoints);
}

function resetpoints() {
  points = [];
}

function draw() {
  // Put drawings here
  background(200);
  for (i in points) {
    ellipse(points[i].x, points[i].y, 4, 4);
  }
  text("Hello world", 30, 50);
}

function mousePressed() {
  points.push(new Point(mouseX, mouseY));
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
