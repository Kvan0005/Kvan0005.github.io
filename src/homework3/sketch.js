/* eslint-disable no-undef, no-unused-vars */
// global variables

import { Polygon } from "./src/Polygon.js"; // Import the Polygon class

let polygon = null;
let ear = null;
let wantToDrawAllTriangles = false;

const s = (p) => { // p refers to the p5 instance
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.fill("black");
    p.textSize(40);
    p.customButton(30, 85, "Clear", resetpoints);
    p.customButton(30, 120, "Find Ears", getEar);
    p.customButton(30, 155, "Draw Triangulation", () => { wantToDrawAllTriangles = !wantToDrawAllTriangles; });
  };

  p.customButton = function(x, y, text, callback) {
    let button = p.createButton(text);
    button.position(x, y);
    button.mousePressed(callback);
    return button;
  };

  function resetpoints() {
    let pnts = [];
    polygon = new Polygon(pnts);
    ear = null;
  }

  p.draw = function() {
    if (polygon != null) {
      p.background(200);
      let points = polygon.getPoints();
      for (let i in points) {
        p.ellipse(points[i].x, points[i].y, 4, 4);
      }
      // Draw lines connecting points
      for (let i = 0; i < points.length; i++) {
        if (i == points.length - 1) {
          p.line(points[i].x, points[i].y, points[0].x, points[0].y);
        } else {
          p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
      }

      if (ear != null) {
        let a = ear;
        let b = points[(a + 1) % points.length];
        let c = points[(a - 1 + points.length) % points.length];
        p.fill("green");
        p.triangle(points[a].x, points[a].y, b.x, b.y, c.x, c.y);
      }

      if (wantToDrawAllTriangles) {
        let triangles = polygon.getAllTriangle();
        let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
        for (let i = 0; i < triangles.length; i++) {
          p.fill(colors[i % colors.length]);
          let triangle = triangles[i];
          let points = triangle.getPoints();
          p.triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
        }
      }

      p.fill("gray");
      p.rect(0, 0, 200, p.height);
      p.fill("black");
    }
  };

  p.mousePressed = function() {
    if (polygon == null) {
      let pnts = [];
      polygon = new Polygon(pnts);
      console.log("Creating new polygon");
    }
    if (p.mouseX > 200) {
      if (!polygon.addNoneCrossingPoint(new PointStructure(p.mouseX, p.mouseY))) {
        console.log("The created polygon is not simple");
      }
      console.log("Adding point");
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
function getEar() {
  if (polygon == null) {
    console.log("No polygon to get ear from");
    return;
  }
  ear = polygon.getEar();
}


new p5(s); // Create a new p5 instance
