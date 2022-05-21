const width = 900, height = 900;
const fps = 30;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function setup(){
    createCanvas(width, height);
    frameRate(fps);
    negativeForce = createVector(0,0.12);
    cells.push(cell1_1);
    cells.push(cell1_2);
    cells.push(cell1_3);
    cells.push(cell2_1);
    cells.push(cell2_2);
    cells.push(cell2_3);
    cells.push(cell3_1);
    cells.push(cell3_2);
    cells.push(cell3_3);
    background("grey");
}

let cells = [];

function draw(){

    for (const drawFunction of cells) {
        drawFunction()
    }
}
let dataStorage = {};
function cell1_1(){
    if (frameCount % fps*2 == 0){
        fillCell(0,0, "white");
        dataStorage.cell1_1 = dataStorage.cell1_1 ? dataStorage.cell1_1 > 12 ? 3 : dataStorage.cell1_1 + 1 : 3;
        let [a,b] = getCellBoundaries(0,0);
        let center = getCellCenter(0,0);
        let radius = (a.x-b.x)*0.4;
        drawPolygonInCircle(center.x, center.y, radius, dataStorage.cell1_1 ?? 3);
    }
}
function cell1_2(){
    if (frameCount % fps*2 == 0){
        fillCell(1,0, "red");
        dataStorage.cell1_2 = dataStorage.cell1_2 ? dataStorage.cell1_2 > 5 ? 1 : dataStorage.cell1_2 + 1 : 1;
        let [a,b] = getCellBoundaries(1,0);
        let points = getPolygonPoints(getCellCenter(1,0), (a.x-b.x)*0.4, 3);
        drawKoch(points[0], points[2], points[1], dataStorage.cell1_2 ?? 1);
    }
}
function cell1_3(){
    fillCell(2,0, "#050517");
    let center = getCellCenter(2,0);
    let [a,b] = getCellBoundaries(2,0);
    fill('yellow')
    circle(center.x, center.y, (a.x-b.x)*0.15);
    fill('aqua');
    let earthCenter = getPointFromRadius(center, (a.x-b.x)*0.30, ((frameCount % (fps*20))/(fps*20))*TWO_PI);
    circle(earthCenter.x, earthCenter.y, (a.x-b.x)*0.10);
    fill('grey');
    let moonCenter = getPointFromRadius(earthCenter, (a.x-b.x)*0.10, ((frameCount % (fps*5))/(fps*5))*TWO_PI);
    circle(moonCenter.x, moonCenter.y, (a.x-b.x)*0.05);
}
function cell2_1(){
    if (frameCount < 2 || frameCount % (fps*20) == 0) fillCell(0,1, "#969696");
    let center = getCellCenter(0,1);
    let [a,b] = getCellBoundaries(0,1);
    let earthCenter = getPointFromRadius(center, (a.x-b.x)*0.30, ((frameCount % (fps*20))/(fps*20))*TWO_PI);
    fill('grey');
    let moonCenter = getPointFromRadius(earthCenter, (a.x-b.x)*0.10, ((frameCount % (fps*5))/(fps*5))*TWO_PI);
    circle(moonCenter.x, moonCenter.y, (a.x-b.x)*0.05);
}
function cell2_2(){
    if (frameCount < 2 || frameCount % (fps*30) == 0) fillCell(1,1, "#223f45");
    let center = getCellCenter(1,1);
    let [a,b] = getCellBoundaries(1,1);
    let earthCenter = getPointFromRadius(center, (a.x-b.x)*0.20, ((frameCount % (fps*30))/(fps*30))*TWO_PI);
    fill('black');
    let moonCenter = getPointFromRadius(earthCenter, (a.x-b.x)*0.13, ((frameCount % (fps*5))/(fps*5))*TWO_PI);
    circle(moonCenter.x, moonCenter.y, (a.x-b.x)*0.05);
}
function cell2_3(){
    // if (frameCount < 2 || frameCount % (fps*5) == 0) dataStorage.cell2_3 = [] 
    if (frameCount < 2) fillCell(2,1, "white");
    // fillCell(2,1, "white");
    let u = frameCount % (fps*60);
    let x = Math.cos(u)*(Math.exp(Math.cos(u))-2*Math.cos(4*u)-Math.pow(Math.sin(u/12), 5));
    let y = Math.sin(u)*(Math.exp(Math.cos(u))-2*Math.cos(4*u)-Math.pow(Math.sin(u/12), 5));
    let [a,b] = getCellBoundaries(2,1);
    let mappedX = map(x, -5, 5, a.x, b.x);
    let mappedY = map(y, -5, 5, a.y, b.y);
    fill('black')
    //dataStorage.cell2_3.push(createVector(mappedX, mappedY));
    // for (const point of dataStorage.cell2_3) {
    //     circle(point.x, point.y, 2);
    // }
    circle(mappedX, mappedY, 2);
}
function cell3_1(){
    if (frameCount < 2) fillCell(0,2, "white");
    let a = 0.5;
    let b = 1-a;
    let r = 30;
    let c = 0;
    let d = 0;
    let pi = Math.PI*frameCount/20;
    let radius = r * (1+a*Math.cos(2*pi+c)+b*Math.cos(3*pi+d));
    let center = getCellCenter(0,2);
    let p = getPointFromRadius(center, radius, ((frameCount % (fps*5))/(fps*5))*TWO_PI);
    fill('black');
    circle(p.x, p.y,2);
}
function cell3_2(){
    if (frameCount < 2) {
        dataStorage.cell3_2 = {velX: Math.random() * 5, velY: Math.random() * 5, pos: getCellCenter(1,2)};
    }
    fillCell(1,2, "#7ede98")
    let [a,b] = getCellBoundaries(1,2);
    let {velX, velY, pos} = dataStorage.cell3_2;
    let newPos = createVector(pos.x + velX, pos.y + velY);
    let bounds = 20;
    if (newPos.x < a.x + bounds || newPos.x > b.x -bounds) velX = -velX;
    if (newPos.y > b.y - bounds || newPos.y < a.y + bounds) velY = -velY;
    dataStorage.cell3_2.velX = velX;
    dataStorage.cell3_2.velY = velY;
    dataStorage.cell3_2.pos = newPos;
    fill('black');
    circle(newPos.x, newPos.y, bounds - 5);

}
const maxParticles = 40;
let negativeForce;
function cell3_3(){
    if (frameCount < 2) dataStorage.cell3_3 = [];
    fillCell(2,2, "#ccc");
    let [a,b] = getCellBoundaries(2,2);
    let center = getCellCenter(2,2);
    let spawnerPosition = center.add(0, -75);
    let particles = dataStorage.cell3_3;
    if (particles.length < maxParticles) {
        particles.push({pos: createVector(spawnerPosition.x, spawnerPosition.y), vel: createVector(Math.random()*2-1, Math.random()*5-2.5)});
    }
    for (const particle of particles) {
        particle.pos.add(particle.vel);
        fill(`rgba(0,0,0,${map(particle.pos.y, a.y, b.y, 1, 0)})`);
        stroke(0)
        circle(particle.pos.x, particle.pos.y, 10);
        if (particle.pos.y > b.y-10) {
            particles.splice(particles.indexOf(particle), 1);
        } else {
            particle.vel.add(negativeForce);
        }
    }
}
//function to get vector from x distance from the center in a radius
function getPointFromRadius(center, radius, angle){
    return createVector(center.x + radius * cos(angle), center.y + radius * sin(angle));
}
//function to get the points of a polygon of 3 sides inscribed in a circle
function getPolygonPoints(center, radius, sides = 3){
    let angle = TWO_PI / sides;
    let points = [];
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = center.x + cos(a) * radius;
        let sy = center.y + sin(a) * radius;
        points.push(createVector(sx, sy));
    }
    return points;
}
//function to to draw polygon within circle
function drawPolygonInCircle(x, y, radius, sides = 3){
    let angle = TWO_PI / sides;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
//function to get cell center
function getCellCenter(x, y){
    let [a,b] = getCellBoundaries(x,y);
    return createVector((a.x+b.x)/2, (a.y+b.y)/2);
}
//function to get cell boundaries
function getCellBoundaries(x,y){
    let cellWidth = width / 3;
    let cellHeight = height / 3;
    return [createVector(x * cellWidth, y * cellHeight), createVector((x + 1) * cellWidth, (y + 1) * cellHeight)];

}
//function to fill the cells with a color from a 3x3 grid
function fillCell(x, y, color = "grey"){
    let cellWidth = width / 3;
    let cellHeight = height / 3;
    fill(color);
    rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
}

function drawKoch(triangleA, triangleB, triangleC, levels){
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
  