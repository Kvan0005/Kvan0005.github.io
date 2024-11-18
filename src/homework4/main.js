/* eslint-disable no-undef, no-unused-vars */
// global variables
// import { Point } from "./build/index.js";
import { Point } from "./build/index.js";
let pnts = [];

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
    pnts = [];
  }

  p.draw = function() {
    p.background(255);
    p.text("Click to add a point", 10, 30
    );
    for (let i = 0; i < pnts.length; i++) {
      p.ellipse(pnts[i].x, pnts[i].y, 10, 10);
    }
  };

  p.mousePressed = function() {
    if (p.mouseX < 200) {
      return;
    }
    // Add a point
    pnts.push(new Point(p.mouseX, p.mouseY));
    pnts.push(new Point("a", "b"));
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

}


new p5(s); // Create a new p5 instance
