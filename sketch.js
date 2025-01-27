
let classifier;
let resultDiv;

const classifier = ml5.imageClassifier('MobileNet');

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  noCanvas(); 
  resultDiv = createDiv('Classifying the image...');
  resultDiv.position(10, 50);

  const img = createImg('bird.png', '', '', () => classifyImage(img));
  img.size(200, AUTO); 
  img.position(10, 10);
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
