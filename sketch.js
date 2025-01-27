let classifier;
let img;

function preload() {
    classifier = ml5.imageClassifier("MobileNet");
    img = loadImage("images/bird.png");
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvas-container'); 
    
    image(img, 0, 0, width, height);
    
    classifier.classify(img, gotResult); 
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);

    let label = results[0].label;
    let confidence = nf(results[0].confidence, 0, 2);
  
    select('#label').html('Label: ' + label);
    select('#confidence').html('Confidence: ' + confidence);
}
