let classifier;

function preload() {
    classifier = ml5.imageClassifier("MobileNet");
  }

  let img;

  function preload() {
    classifier = ml5.imageClassifier("MobileNet");
    img = loadImage("images/bird.png");
  }

  function setup() {
    createCanvas(400, 400);
    classifier.classify(img, gotResult);
  }

  function gotResult(results) {
    console.log(results);
  }

  function setup() {
    classifier.classify(img, gotResult);
    image(img, 0, 0, width, height);
  }

  function gotResult(results) {
    console.log(results);
  
    fill(255);
    stroke(0);
    textSize(18);
  }

  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2);

