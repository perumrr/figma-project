let resultDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', () => {
  console.log('Model Loaded!');
  resultDiv.html('Classifying the image...');
  classifyImage(img);
});

function setup() {
  noCanvas();

  resultDiv = select('#result');
  resultDiv.html('Loading model...');

  img = createImg('bird.png', imageLoaded);
}

function imageLoaded() {
  console.log('Image loaded successfully.');
}

function classifyImage(img) {
  classifier.classify(img, (err, results) => {
     if (err) {
      console.error('Error during classification:', err);
      resultDiv.html('Error classifying the image. Please try again.', results[0].label);
      return;
    }
    
    resultDiv.html(results[0].label);
    resultDiv.html(nf(results[0].confidence, 0, 2));

    const label = results[0].label;
    const confidence = nf(results[0].confidence, 0, 2);

    resultDiv.html(`Label: ${label} <br> Confidence: ${confidence}`);
  });
}
