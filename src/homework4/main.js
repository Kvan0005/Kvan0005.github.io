/* eslint-disable no-undef, no-unused-vars */
// global variables

import { Polygon } from "./src/Polygon.js"; // Import the Polygon class

let polygon = null;

const s = (p) => { // p refers to the p5 instance
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.fill("black");
    p.textSize(40);
    p.customButton(30, 85, "Clear", resetpoints);
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
    wantToDrawAllTriangles = false;
  }

  p.draw = function() {
  };

  p.mousePressed = function() {
    if (p.mouseX < 200) {
      return;
    }
    // Add a point
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

}


new p5(s); // Create a new p5 instance
