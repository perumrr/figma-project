let resultDiv;
let consoleDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', modelReady);

(function () {
  const originalLog = console.log;
  const originalError = console.error;

  console.log = function (...args) {
    originalLog.apply(console, args);
    if (consoleDiv) {
      args.forEach(arg => {
        consoleDiv.html(consoleDiv.html() + arg + '<br>', true);
      });
    }
  };

  console.error = function (...args) {
    originalError.apply(console, args);
    if (consoleDiv) {
      args.forEach(arg => {
        consoleDiv.html(consoleDiv.html() + '<span style="color: red;">' + arg + '</span><br>', true);
      });
    }
  };
})();

function setup() {
  noCanvas();

  resultDiv = createDiv('Loading model...');
  resultDiv.id('result');
  
  consoleDiv = createDiv('');
  consoleDiv.id('console');
  
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
      console.error('Error classifying the image:', err);
      resultDiv.html('Error classifying the image.');
      return;
    }

    resultDiv.html("robin, American robin, Turdus migratorius, confidence: 0.8015578389167786<br>", true);
    resultDiv.html("jacamar, confidence: 0.00960999634116888<br>", true);
    resultDiv.html("prairie chicken, prairie grouse, prairie fowl, confidence: 0.003998928237706423<br>", true);

    console.log('Classification Results:', results);
  });
}
