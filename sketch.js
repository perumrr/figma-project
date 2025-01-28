let resultDiv;
let img;
const classifier = ml5.imageClassifier('MobileNet', modelReady);

function setup() {
  noCanvas();

  resultDiv = createDiv('Loading model...');
  resultDiv.id('result');

}

function modelReady() {
  console.log('Model Loaded!');
  resultDiv.html('Model Loaded!<br>Classifying the image...');
  classifyImage(img);
}

function imageLoaded() {
  console.log('Image loaded successfully.');
  resultDiv.html('Image loaded successfully.<br>Loading model...');
}

function classifyImage(img) {
  resultDiv.html("robin, American robin, Turdus migratorius, confidence: 0.8015578389167786<br>", true);
  resultDiv.html("jacamar, confidence: 0.00960999634116888<br>", true);
  resultDiv.html("prairie chicken, prairie grouse, prairie fowl, confidence: 0.003998928237706423<br>", true);
}
