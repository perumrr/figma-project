let resultDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', modelReady);

function setup() {
  noCanvas();

  resultDiv = select('#result');
  resultDiv.html('Loading model...');

}

function modelReady() {
  console.log('Model Loaded!');
  resultDiv.html('Classifying the image...');

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

    const resultsJSON = JSON.stringify(results, null, 2);
    resultDiv.html(`<pre>${resultsJSON}</pre>`);
  });
}
