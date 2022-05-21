let canvasX = 400;
let canvasY = 400;

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(30);
}
let step = 1;
function mousePressed(){
    step = step < 36 ? step + 1 : 1;
}
function draw() {
  background("grey");
  noFill();
  beginShape();
  translate(canvasX / 2, canvasY / 2);
  for (let i = 0; i < 360; i+=step) {
    vertex(50 * cos(i), 50 * sin(i));
  }

  endShape(CLOSE);
}
