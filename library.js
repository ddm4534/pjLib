/********* arrays *********/
var points = [];
var rects = [];
var ells = [];
var lines = [];


/********* variables *********/
var wow = window.outerWidth;
var woh = window.outerHeight;
var rotateCenterX = wow/2;
var rotateCenterY = woh/2 - 60;
var translateXFloat = 0;
var translateYFloat = 0;
var rotateFloat = 0;
var dotnum = 0;
var rectnum = 0;
var ellnum = 0;
var linenum = 0;
var strokeWeightFloat = 1;
var strokeString = "(0,0,0)";
var fillString = "(0,0,0)";
var backgroundString = "(0,0,0)";
var mouseMoved;
var mousePressed;
var mouseReleased;
var mouseClicked;
var keyPressed;
var keyReleased;
var mouseIsPressed = false;
var keyIsPressed = false;
var draw;
var mouseX;
var mouseY;
var mouseXS;
var mouseYS;
var xPos;
var yPos

/********* functions *********/
const sin = (num) => Math.sin(num);
const cos = (num) => Math.cos(num);
const tan = (num) => Math.tan(num);
const asin = (num) => Math.asin(num);
const acos = (num) => Math.acos(num);
const atan = (num) => Math.atan(num);
const round = (num) => Math.round(num);
const PI = (num) => Math.PI(num);
var strokeWeight = function(strokeweight){
  strokeWeightFloat = strokeweight;
};
const stroke = function(r, g, b){
  strokeString = "rgb("+r+","+g+","+b+")";
};
const fill = function(r, g, b){
  fillString = "rgb("+r+","+g+","+b+")";
};
const println = function(print){
  console.log(print);
};
const translate = function(x, y){
  translateXFloat = translateXFloat + x;
  translateYFloat = translateYFloat + y;
  mouseX = mouseX - x;
  mouseY = mouseY - y;
};
const rotate = function(angle){
  rotateFloat = angle + rotateFloat;
  xPos = mouseX;
  yPos = mouseY;
  rotateF(xPos, yPos);
  mouseX = xPos;
  mouseY = yPos;
};
var rotateF = function(x, y){
  if (x !== 0) {
    var len = Math.sqrt( x*x + y*y );
    var theta1 = Math.atan( y/x );
    if ((x < 0 && y < 0) || ((x > 0 && y < 0))){
      theta1 = theta1 + Math.PI;
    }
    xPos = len*Math.cos( theta1 + rotateFloat*Math.PI/180 );
    yPos = len*Math.sin( theta1 + rotateFloat*Math.PI/180 );
  }
};
const background = function(r, g, b){
  document.body.style.backgroundColor = "rgb("+r+","+g+","+b+")";
  for (var i = 0; i < ells.length; i++){
    ells[i].parentNode.removeChild(ells[i]);
  }
  ells = [];
  for (var i = 0; i < points.length; i++){
    points[i].parentNode.removeChild(points[i]);
  }
  points = [];
  for (var i = 0; i < rects.length; i++){
    rects[i].parentNode.removeChild(rects[i]);
  }
  rects = [];
  for (var i = 0; i < lines.length; i++){
    lines[i].parentNode.removeChild(lines[i]);
  }
  lines = [];
};
const point = function( x, y){
  xPos = x;
  yPos = y;
  rotateF(xPos, yPos);
  x = xPos;
  y = yPos;
  points.push(document.createElement("div"));
  var el = points[points.length - 1];
  el.style.width = strokeWeightFloat + "px";
  el.style.height = strokeWeightFloat + "px";
  el.style.borderRadius = strokeWeightFloat + "px";
  el.style.position = "absolute";
  el.style.left = x + translateXFloat + "px";
  el.style.top = y + translateYFloat + "px";
  el.style.backgroundColor = strokeString;
  document.body.appendChild(el);
  dotnum++;
};
const rect = function( x, y ,width, height, radius = 0){
  xPos = x;
  yPos = y;
  rotateF(xPos, yPos);
  x = xPos;
  y = yPos;
  
  rects.push(document.createElement("div"));
  var el = rects[rects.length - 1]
  el.style.width = width + "px";
  el.style.height = height + "px";
  el.style.position = "absolute";
  el.style.left = x + translateXFloat + "px";
  el.style.top = y + translateYFloat + "px";
  el.style.backgroundColor = fillString;
  el.style.border = strokeWeightFloat + "px " + "solid " + strokeString;
  el.style.borderRadius = radius + "px";
  el.style.transform = "rotate(" + rotateFloat + "deg)"; 
  document.body.appendChild(el);
  rectnum++;
};
const ellipse = function( x, y ,width, height){
  xPos = x;
  yPos = y;
  rotateF(xPos, yPos);
  x = xPos;
  y = yPos;
  var xp = x - width/2;
  var yp = y - height/2;
  ells.push(document.createElement("div"));
  var el = ells[ells.length - 1];
  el.style.width = width + "px";
  el.style.height = height + "px";
  el.style.position = "absolute";
  el.style.left = xp + translateXFloat + "px";
  el.style.top = yp + translateYFloat + "px";
  el.style.backgroundColor = fillString;
  el.style.borderRadius = "50%";
  el.style.border = strokeWeightFloat + "px " + "solid " + strokeString;
  document.body.appendChild(el);
  ellnum++;
};
const line = function( x1, y1, x2, y2){
  xPos = x1;
  yPos = y1;
  rotateF(xPos, yPos);
  x1 = xPos;
  y1 = yPos;
  xPos = x2;
  yPos = y2;
  rotateF(xPos, yPos);
  x2 = xPos;
  y2 = yPos;
  var t = 0 - (Math.atan((x2 - x1)/(y2 - y1)))*180/Math.PI;
  var xp = (x1 + x2)/2;
  var yp = (y1 + y2)/2;
  var l = Math.sqrt((x2 - x1)*(x2 - x1)+(y2 - y1)*(y2 - y1));
  lines.push(document.createElement("div"));
  var el = lines[lines.length - 1];
  el.style.width = strokeWeightFloat + "px";
  el.style.height = l + "px";
  el.style.position = "absolute";
  el.style.left = xp + translateXFloat - strokeWeightFloat/2 + "px";
  el.style.top = yp + translateYFloat - l/2 + "px";
  el.style.backgroundColor = strokeString;
  el.style.transform = "rotate(" + t + "deg)";
  document.body.appendChild(el);
  linenum++;
};
var mouseHasMoved = function(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseXS = e.clientX + window.scrollX;
  mouseYS = e.clientY + window.scrollY;
  if (mouseMoved === undefined){
    
  } else {
    mouseMoved();
  }
};
var mouseHasPressed = function(){
  mouseIsPressed = true;
  if (mousePressed === undefined){
    
  } else {
    mousePressed();
  }
};
var mouseHasReleased = function(){
  mouseIsPressed = false;
  if (mouseReleased === undefined){
    
  } else {
    mouseReleased();
  }
};
var mouseHasClicked = function(){
  if (mouseClicked === undefined){
    
  } else {
    mouseClicked();
  }
};
var keyHasPressed= function(){
  keyIsPressed = true;
  if (keyPressed === undefined){
    
  } else {
    keyPressed();
  }
};
var keyHasReleased= function(){
  keyIsPressed = false;
  if (keyReleased === undefined){
    
  } else {
    keyReleased();
  }
};
var drawing = function(){
  if (draw === undefined){
    
  } else {
    draw();
  }
};

/********* animation *********/
document.body.addEventListener("mousemove", mouseHasMoved);
document.body.addEventListener("mousedown", mouseHasPressed);
document.body.addEventListener("mouseup", mouseHasReleased);
document.body.addEventListener("click", mouseHasClicked);
document.body.addEventListener("keydown", keyHasPressed);
document.body.addEventListener("keyup", keyHasReleased);
window.setInterval(drawing, 10);

/********* program *********/
fill(255,255,255);
stroke(0,0,0);
background(255,255,255);

