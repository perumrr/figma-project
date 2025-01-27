// Ensure you have included ml5.js in your HTML file or installed it via npm
// Include this in your HTML if not installed via npm:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/ml5/0.12.2/ml5.min.js"></script>

// JavaScript code for bird image classification using ml5.js

let classifier;
let resultDiv;

// Pre-trained model URL for image classification (MobileNet or a custom model)
const modelURL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_URL/';

function preload() {
  // Load the pre-trained image classifier model
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  noCanvas(); // No need for a canvas

  // Create a div to display results
  resultDiv = createDiv('Classifying the image...');
  resultDiv.position(10, 50);

  // Load and classify the provided image
  const img = createImg('bird.png', '', '', () => classifyImage(img));
  img.size(200, AUTO); // Resize the image for better view
  img.position(10, 10);
}

function classifyImage(img) {
  classifier.classify(img, (err, results) => {
    if (err) {
      console.error(err);
      resultDiv.html('Error classifying the image.');
      return;
    }

    // Display the results
    const label = results[0].label;
    const confidence = nf(results[0].confidence, 0, 2); // Format confidence to 2 decimals
    resultDiv.html(`Label: ${label} <br> Confidence: ${confidence}`);
  });
}
