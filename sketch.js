let classifier;
let img;

function preload() {
    classifier = ml5.imageClassifier("MobileNet");
    img = loadImage("images/bird.png");
}

function setup() {
    createCanvas(400, 400);
    image(img, 0, 0, width, height); 
    classifier.classify(img, gotResult); 
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
  
    fill(255);
    textSize(18);
    text("Label: " + results[0].label, 10, height - 40);
    text("Confidence: " + nf(results[0].confidence, 0, 2), 10, height - 20);
}
