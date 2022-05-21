let canvasX = 400;
let canvasY = 400;

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(30);
}
let levels = 3;
function mousePressed() {
  levels = levels < 6 ? levels + 1 : 0;
}
function draw() {
  background("grey");

  let pointA = createVector(0, canvasY/2 + 50);
  let pointB = createVector(canvasX, canvasY/2 + 50);

  let triangleA = getPoint(pointA, pointB, 3);
  let triangleB = getPoint(pointA, pointB, 3, 2);
  let triangleC = getVectorUsingTranslation(triangleA, triangleB);

  drawKoch(triangleA, triangleB, triangleC);
}
function drawKoch(triangleA, triangleB, triangleC){
  koch(triangleB, triangleA, levels);
  koch(triangleA, triangleC, levels);
  koch(triangleC, triangleB, levels);
}
function getPoint(a, b, segments, offset = 1) {
  let x = a.x + ((b.x - a.x) / segments) * offset;
  let y = a.y + ((b.y - a.y) / segments) * offset;
  return createVector(x, y);
}
function getHalfPoints(a, b) {
  return [getPoint(a, b, 3), getPoint(a, b, 3, 2)];
}
function getVectorUsingTranslation(c, d) {
  let t = 1;
  let x = (d.x - c.x) * cos(t) + (d.y - c.y) * sin(t) + c.x;
  let y = (d.y - c.y) * cos(t) - (d.x - c.x) * sin(t) + c.y;
  let newVector = createVector(x, y);
  console.log(x, y);
  return newVector;
}
function koch(a, b, n) {
  if (n == 0) {
    line(a.x, a.y, b.x, b.y);
    return;
  } else {
    let c = getPoint(a, b, 3);
    let d = getPoint(a, b, 3, 2);
    let e = getVectorUsingTranslation(c, d);
    koch(a, c, n - 1);
    koch(c, e, n - 1);
    koch(e, d, n - 1);
    koch(d, b, n - 1);
  }
}
