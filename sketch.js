let graphCenterX; 
let graphCenterY; 
let graphAmplitude = 50; 
let graphPeriod = 300; 
let sineOffset = 50; 

// Arrays to store previous points for fading effect
let cosPoints = [];
let sinPoints = [];

function setup() {
  createCanvas(450, 400);
  angleMode(DEGREES);

  // Calculate graph center
  graphCenterX = width / 2 - graphPeriod / 2; 
  graphCenterY = height / 2; 

  describe('Heart-shaped sine and cosine graphs with fading line effect.');
}

function draw() {
  background(0);

  
  let angle = frameCount % 360;

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`angle: ${angle}`, 25, 25);

  // Draw graph axes
  stroke('grey');
  strokeWeight(3);
  line(graphCenterX, graphCenterY, graphCenterX + graphPeriod, graphCenterY); // X-axis
  line(graphCenterX, graphCenterY - graphAmplitude * 2, graphCenterX, graphCenterY + graphAmplitude * 2 + sineOffset); // Y-axis

  // Draw axis labels
  fill('grey');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('0', graphCenterX, graphCenterY + graphAmplitude * 2 + 15 + sineOffset);
  text('360', graphCenterX + graphPeriod, graphCenterY + graphAmplitude * 2 + 15 + sineOffset);

  text('1', graphCenterX / 2, graphCenterY - graphAmplitude - 10);  
  text('0', graphCenterX / 2, graphCenterY + 10);  
  text('-1', graphCenterX / 2, graphCenterY + graphAmplitude + 10); 

  fill('pink');
  text('heart top', graphCenterX + graphPeriod + 20, graphCenterY - graphAmplitude);
  fill('red');
  text('heart bottom', graphCenterX + graphPeriod + 20, graphCenterY + sineOffset);

  // Draw fading line curve (two humps forming the top of the heart)
  noFill();
  stroke('pink');
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < cosPoints.length; i++) {
    let pt = cosPoints[i];
    stroke(255, 105, 180, map(i, 0, cosPoints.length, 0, 255)); 
    vertex(pt.x, pt.y);
  }
  endShape();

  // Draw fading line curve (V dip forming the bottom of the heart)
  noFill();
  stroke('red');
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < sinPoints.length; i++) {
    let pt = sinPoints[i];
    stroke(255, 0, 0, map(i, 0, sinPoints.length, 0, 255)); 
    vertex(pt.x, pt.y);
  }
  endShape();

  // Add new points to the arrays for both lines
  let cosX = map(angle, 0, 360, graphCenterX, graphCenterX + graphPeriod);
  let cosY = graphCenterY - graphAmplitude * (1 + abs(cos(angle))); // Cosine curve
  cosPoints.push({ x: cosX, y: cosY });

  let sinX = map(angle, 0, 360, graphCenterX, graphCenterX + graphPeriod);
  let sinY = graphCenterY + sineOffset - graphAmplitude * (1 - abs(sin(angle))); // Sine curve
  sinPoints.push({ x: sinX, y: sinY });

  // Keep only the latest 300 points to avoid memory overload (adjust as needed)
  if (cosPoints.length > 300) {
    cosPoints.shift();
  }
  if (sinPoints.length > 300) {
    sinPoints.shift();
  }

  // Draw moving points on graph
  noStroke();
  fill('pink');
  circle(cosX, cosY, 10);

  fill('red');
  circle(sinX, sinY, 10);
}