let resultDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', modelReady);

function setup() {
  noCanvas();

  resultDiv = select('#result');
  resultDiv.html('Loading model...');

  img = createImg('bird.png', imageLoaded);
  img.hide(); 
}

function modelReady() {
  console.log('Model Loaded!');
  resultDiv.html('Model loaded! Now, classifying the image...');
  
  classifyImage(img);
}

function imageLoaded() {
  console.log('Image loaded successfully.');
}

function classifyImage(img) {
  classifier.classify(img, (err, results) => {
    if (err) {
      console.error(err);
      resultDiv.html('Error classifying the image.');
      return;
    }

    const label = results[0].label;
    const confidence = nf(results[0].confidence, 0, 2);
    
    resultDiv.html(`Label: ${label} <br> Confidence: ${confidence}`);
  });
}
