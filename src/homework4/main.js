/* eslint-disable no-undef, no-unused-vars */
// global variables
// import { Point } from "./build/index.js";
import { Line, Point, PolarDual } from "./build/index.js";
let pnts = [];
let primals = [];
let button_box = [];
const s = (p) => { // p refers to the p5 instance
  let defaultLine = [new Line(1/-p.windowWidth, 0), new Line(0, 1/-p.windowHeight), new Line(1/p.windowWidth, 0), new Line(0, 1/p.windowHeight)]; //? this is a hack for boundary lines 
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
    button_box.push(button);
    return button;
  };

  function resetpoints() {
    pnts = [];
    primals = [];
    for (let i = 0; i < defaultLine.length; i++) {
      primals.push(new PolarDual(defaultLine[i]));
    }
  }

  p.draw = function() {
    p.background(200);
    for (let i = 0; i < pnts.length; i++) {
      pnts[i].draw(p);
    }

    for (let i = 0; i < primals.length; i++) {
      primals[i].draw(p);
    }
  };

  p.mousePressed = function() {
    for (let i = 0; i < button_box.length; i++) { //TODO rectify alignment
      if (p.mouseX > button_box[i].x-30 && 
          p.mouseX < button_box[i].x + button_box[i].width+30 && 
          p.mouseY > button_box[i].y-30 && 
          p.mouseY < button_box[i].y + button_box[i].height+30) {
        return;
      }
    }
    // Add a point
    let newPoint = new Point(p.mouseX, p.mouseY);
    if (pnts.length ==  0) {
      pnts.push(newPoint);
    }else {
      primals.push(new PolarDual(Line.fromTwoPoints(pnts.shift(), newPoint)));
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

}


new p5(s); // Create a new p5 instance
