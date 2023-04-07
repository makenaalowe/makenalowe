//project 2

let recMode = false;
let can;  // create a canvas reference
let NUMSINES = 20; // how many of these things can we do at once?
let sines = new Array(NUMSINES); // an array to hold all the current angles
let rad; // an initial radius value for the central sine
let i; // a counter variable
let fund = 0.01; // the speed of the central sine
let ratio = 2; // what multiplier for speed is each additional sine?
let alpha = 50; // how opaque is the tracing system
let trace = false; // are we tracing?

let NUMSINES2 = 10;
let sines2 = new Array(NUMSINES2);
let rad2;
let fund2 = 0.02;
let ratio2 = 2.5;
let alpha2 = 100;
let trace2 = false;

let NUMSINES3 = 15;
let sines3 = new Array(NUMSINES3);
let rad3;
let fund3 = 0.1;
let ratio3 = 5;
let alpha3 = 130;
let trace3 = false;


let mlSpinner1;
let mlSpinner2;
let mlSpinner3;



function setup() {
  can = createCanvas(710, 500);
  rad = height / 5; // compute radius for central circle
  background(255); // clear the screen
  let mlSpinner;

  for (let i = 0; i<sines.length; i++) {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }

  rad2 = height / 6;
for (let i = 0; i < sines2.length; i++) {
  sines2[i] = PI;
}
  rad3 = height / 8;
for (let i = 0; i < sines2.length; i++) {
  sines3[i] = PI;
}



  fill(255);
  // frameRate(5); // slow down the framerate so everything can be drawn. no hurry.
  // noLoop();
  
}

function draw() {
  if (!trace) {
    background(255); // clear screen if showing geometry
    stroke(0); // black pen
    fill(128,0,128); // white fill
  }
  //define class
  class mlSpinner {
    // class variables that are unique to each instance of a class.
     c;
     xpos;
     ypos;
     creature;
  
    // The Constructor is like setup and helps defines the details of the object
    constructor( tempC,  tempXpos,  tempYpos,  sp) {
      // tempC, tempXpos, etc. are the argument vars that pass data to the class vars
      this.c = tempC;
      this.xpos = tempXpos;
      this.ypos = tempYpos;
      this.spinner =  "bleehhghhh" + sp;
  
    }
  }
  
  // MAIN ACTION
  push(); // start a transformation matrix
  rotate(frameCount * 0.02); // add rotation
  translate(width / 2, height / 2); // move to middle of screen

  for (let i = 0; i < sines.length; i++) {
    let erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing
    if (trace) {
      stroke(0, 0, 255 * (float(i) / sines.length), alpha); // blue
      fill(0, 0, 255, alpha / 2); // also, um, blue
      erad = 5.0 * (1.0 - float(i) / sines.length); // pen width will be related to which sine
    }
    let radius = rad / (i + 1); // radius for circle itself
    rotate(sines[i]); // rotate circle
    if (!trace) ellipse(25, 20, radius * 2, radius * 2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    if (!trace) {
      fill (0);//black fill
      ellipse(25,15, 10, 5); // draw a little circle
    }  
    if (trace) ellipse(0, 0, erad, erad); // draw with erad if tracing
    pop(); // go down one level
    translate(0, radius); // move into position for next sine
    sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; // update angle based on fundamental
  }

  pop(); // pop down final transformation
  // recordit();

  //
  //create a new instance of mlSpinner and update its position
  if (!mlSpinner) {
    mlSpinner = new mlSpinner(color(255, 0, 0), 150, 150, "spinner2");
  }
  mlSpinner.xpos += 2;
  mlSpinner.ypos += 2;
  if (mlSpinner.xpos > width || mlSpinner.ypos > height) {
    mlSpinner.xpos = 0;
    mlSpinner.ypos = 0;
  }

  //second spirograph
  translate(width/3, height/3); // move origin to center of canvas
  for (let i = 0; i < sines2.length; i++) {
    let erad2 = 0;
    if (trace2) {
      stroke(255,192,203, alpha2);
      fill(255,192,203, alpha2 / 2);
      erad2 = 5.0 * (1.0 - float(i) / sines2.length);
    }
    else {
      // set stroke and fill color for non-trace mode
      stroke(148,0,0,);
      fill(148,0,0,50);
    }
    let radius2 = rad2 / (i + 1);
    rotate(sines2[i]);
    if (!trace2) ellipse(50, 50, radius2 * 2, radius2 * 2);
    push();
    translate(0, radius2);
    if (!trace2) ellipse(50, 45, 10, 5);
    if (trace2) ellipse(0, 0, erad2, erad2);
    pop();
    translate(0, radius2);
    sines2[i] = (sines2[i] + (fund2 + (fund2 * i * ratio2))) % TWO_PI;
  }
  
  //third spirograph
  translate(width/3, height/3); // move origin to center of canvas
  for (let i = 0; i < sines3.length; i++) {
    let erad3 = 0;
    if (trace3) {
      stroke(255, 255, 0, alpha3);
      fill(255, 255, 0, alpha3 / 2);
      era3 = 5.0 * (1.0 - float(i) / sines3.length);
    }
    else {
      // set stroke and fill color for non-trace mode
      stroke(0);
      fill(0, 50);
    }
    let radius3 = rad3 / (i + 1);
    rotate(sines3[i]);
    if (!trace3) ellipse(50, 50, radius3 * 2, radius3 * 2);
    push();
    translate(0, radius3);
    if (!trace3) ellipse(50, 45, 10, 5);
    if (trace3) ellipse(0, 0, erad3, erad3);
    pop();
    translate(0, radius3);
    sines3[i] = (sines3[i] + (fund3 + (fund3 * i * ratio2))) % TWO_PI;
  }

}





function keyReleased() {
  if (key==' ') {
    trace = !trace;
    background(255);
  }
}



/////////////////////// use both keyPressed and recordit ///////////

function keyPressed() {

  if (keyIsPressed === true) {
    let k = key;
    console.log("k is " + k);

    if (k == 's' || k == 'S') {
      console.log("Stopped Recording");
      recMode = false;
      noLoop();
    }

    if (k == 'b') {
      console.log("Start Recording");
      recMode = true;
      loop(); 
    }
  }
} 
