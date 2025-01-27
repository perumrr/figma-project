let resultDiv;
let img;
let downloadButton;

const classifier = ml5.imageClassifier('MobileNet', modelReady);

function setup() {
  noCanvas();

  resultDiv = createDiv('Classifying the image...');
  resultDiv.position(10, 50);

  img = createImg('bird.png', 'Bird Image', imageLoaded);
  img.size(200, AUTO);
  img.position(10, 10);

  downloadButton = createButton('Download Image with Classification');
  downloadButton.position(10, 250);
  downloadButton.mousePressed(downloadImage);
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

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(16);
    text(`${label} (${confidence})`, img.width / 2, img.height + 20);
  });
}

function downloadImage() {
  let canvas = createCanvas(img.width, img.height);
  canvas.parent(document.body); 
  image(img, 0, 0);

  const label = resultDiv.html().split('<br>')[0].replace('Label: ', '');
  const confidence = resultDiv.html().split('<br>')[1].replace('Confidence: ', '');
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  textSize(16);
  text(`${label} (${confidence})`, width / 2, height - 10);

  saveCanvas(canvas, 'classified_bird_image', 'png');
}
