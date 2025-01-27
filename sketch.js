let resultDiv;
let img;

const classifier = ml5.imageClassifier('MobileNet', modelReady);

function setup() {
  noCanvas();

  resultDiv = select('#result');
  resultDiv.html('Classifying the image...');

  img = createImg('bird.png', 'Bird Image', imageLoaded);
  img.size(200, AUTO);
  img.position(10, 10);
}

function modelReady() {
  console.log('Model Loaded!');
}

function imageLoaded() {
  console.log('Image loaded successfully.');
  classifyImage(img);
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
