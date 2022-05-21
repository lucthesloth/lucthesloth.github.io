// bezier curve demo. drag the anchor/control points.

const clamp = (num, min, max) => Math.max(min, Math.min(max, num));

let pts = [];
let selectedPoint;
function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  frameRate(30)
}

function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(4);
  if (pts.length == 4) {
    bezier2(pts[0], pts[1], pts[2], pts[3]);
  }
  noStroke();
  fill(255);
  for (let pt of pts) {
    if (selectedPoint == pt) {
      fill(0, 255, 0);
    } else {
      fill(20, 20, 255 * (1 - pts.indexOf(pt) / pts.length));
    }
    ellipse(pt.x, pt.y, 20, 20);
  }

  if (selectedPoint) {
    selectedPoint.x = mouseX;
    selectedPoint.y = mouseY;
  }

  noStroke();
  fill(0);
}
function mousePressed() {
  for (const point of pts) {
    if (dist(mouseX, mouseY, point.x, point.y) < 20) {
      selectedPoint = point;
      return;
    }
  }
  if (pts.length > 3) return;
  pts.push(createVector(mouseX, mouseY));
}
function mouseReleased() {
  selectedPoint = null;
}
//
function bezier2(p1, p2, p3, p4) {
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(p1.x, p1.y);
  for (let i = 0; i <= 1; i += 0.01) {
    let pt = pointmath(p1, p2, p3, i);
    let pt2 = pointmath(p2, p3, p4, i);
    let pt3 = pointmath(pt, pt2, p4, i);
    vertex(pt3.x, pt3.y);
  }
  vertex(p4.x, p4.y);
  endShape();
}
function pointmath(p1, p2, p3, i) {
    let ax = p1.x + i * (p2.x - p1.x);
    let bx = p2.x + i * (p3.x - p2.x);
    let cx = ax + i * (bx - ax);
    let ay = p1.y + i * (p2.y - p1.y);
    let by = p2.y + i * (p3.y - p2.y);
    let cy = ay + i * (by - ay);
    return createVector(cx, cy);
}