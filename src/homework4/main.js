/* eslint-disable no-undef, no-unused-vars */
// global variables
// import { Point } from "./build/index.js";
import { Line, Point, PolarDualLine, PolarDualPoint, grahamScan } from "./build/index.js";
let pnts = [];
let primals = [];
let button_box = [];
let cell = [];
const s = (p) => { // p refers to the p5 instance
  let defaultLine = [new PolarDualLine(-1, 0), new PolarDualLine(0, -1), new PolarDualLine(1/p.windowWidth, 0), new PolarDualLine(0, 1/p.windowHeight)]; //? this is a hack for boundary lines 
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.fill("black");
    p.textSize(40);
    p.customButton(30, 85, "Clear", resetpoints);
    p.customButton(30, 135, "Calculate the Cell", cellCalculation);
    resetpoints();
    runtests();
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
      primals.push(defaultLine[i]);
    }
    cell = [];
  }

  p.draw = function() {
    p.background(200);
    for (let i = 0; i < pnts.length; i++) {
      pnts[i].draw(p);
    }
    console.log(primals.length);
    for (let i = 0; i < primals.length; i++) {
      primals[i].draw(p);
    }
    
    if (cell.length > 0) {
      drawCell();
    }
  };

  function drawCell() {
    p.fill("red");
    p.beginShape();
    for (let i = 0; i < cell.length; i++) {
      p.vertex(cell[i].x, cell[i].y);
    }
    p.endShape(p.CLOSE);
    p.fill("black");
  }

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
      let v = Line.fromTwoPoints(pnts.shift(), newPoint);
      primals.push(new PolarDualLine(v[0],v[1]));
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  function generateDual(primal_list){
    let dual_list = [];
    if (primal_list.length > 0) {
      // replace every line with its polar representation
      for (let i = 0; i < primal_list.length; i++) {
        dual_list.push(primal_list[i].getDual());
      }
    }
    return dual_list;
  };

  function cellCalculation() {
    cell = [];
    if (primals.length == 0) {
      return;
    }
    let dual_list;
    if (primals[0].type() == "Line") {
      dual_list = generateDual(primals);
      console.log("line");
    }
    let convex_hull = grahamScan(dual_list);
    for (let i = 0; i < convex_hull.length; i++) {
      cell.push(convex_hull[i].getDual());
      let p = Line.fromTwoPoints(convex_hull[i], convex_hull[(i+1)%convex_hull.length]);
      cell.push(new PolarDualLine(p[0], p[1]).getDual());
    }
  }

  function runtests(){
    let t = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        t.push(new PolarDualPoint(i, j));
      }
    }
    console.log(t);
    let hull = grahamScan(t);
    console.log(hull);
  } 
}


new p5(s); // Create a new p5 instance
