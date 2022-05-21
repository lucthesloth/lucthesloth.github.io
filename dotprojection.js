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
  if (pts.length == 3) {
    line(pts[0].x, pts[0].y, pts[1].x, pts[1].y);
    noStroke()
    circle(pts[1].x, pts[1].y, 20);
    circle(pts[2].x, pts[2].y, 20);
    circle(getTVect(pts[0], pts[1], pts[2]).x, getTVect(pts[0], pts[1], pts[2]).y, 20);
    stroke(0);
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
  if (pts.length > 2) return;
  pts.push(createVector(mouseX, mouseY));
}
function mouseReleased() {
  selectedPoint = null;
}

function getT(p1, p2, p3) {
    let A = p2.sub(p1)
    let B = p3.sub(p1)
    return A.dot(A, B) / A.mag()
}
function getTVect(p1, p2, p3) {
    let t = getT(p1, p2, p3);
    return p1.add(p2.sub(p1).mult(t));
}