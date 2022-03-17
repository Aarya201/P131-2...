objectDetector = "";

img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('https://th.bing.com/th/id/OIP.N6GOTwXpI3Q_wd8y6icaBQHaFj?w=257&h=193&c=7&r=0&o=5&pid=1.7');
}

function setup() {
    canvas = createCanvas(640,420)
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status  : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(img,0,0,640,420);

    if(status != "")
      {
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";

          fill(255,0,0);
          percent = floor(objects[i].confidence *100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill(); 
         stroke(255,0,0);
         rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height)
        }
      }
}