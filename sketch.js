let resultDiv;
let consoleDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// Override console.log to display messages on the webpage
(function () {
  const originalLog = console.log;
  console.log = function (...args) {
    originalLog.apply(console, args); // Keep original console.log functionality
    if (consoleDiv) {
      args.forEach(arg => {
        consoleDiv.html(consoleDiv.html() + arg + '<br>', true);
      });
    }
  };
})();

function setup() {
  noCanvas();

  // Create result and console divs
  resultDiv = createDiv('Loading model...');
  resultDiv.id('result');
  
  consoleDiv = createDiv('');
  consoleDiv.id('console');
  consoleDiv.html('<strong>Console Output:</strong><br>');
  
  // Load the image
  img = createImg('bird.png', imageLoaded);
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

    console.log('Classification Results:', results);

    resultDiv.html(`<pre>${JSON.stringify(results, null, 2)}</pre>`);
  });
}
