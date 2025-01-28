# figma-project
sample: https://capable-khapse-481ed1.netlify.app/

# step by step
use ml5 in your HTML document:

<script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js" type="text/javascript"></script>

Open the sketch.js file and define a variable to store the ImageClassifier model.

let classifier;

load the ImageClassifier model in the preload function. Using the preload function ensures that the model is loaded before the setup and draw functions are called. Note here we can specify the model name we want to use, such as MobileNet.

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}

# Load an image

In the preload function, load the image using the loadImage function.

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.png");
}

# Classify the image with the model

Within the setup function, call the classify method on the classifier object to - you guessed right - classify the image. The classify method takes the image and a callback function as parameters.

function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
}

The callback function gotResult is a function that will be called when the classify method finishes classifying the image. Now, let's define the gotResult function.

function gotResult(results) {
  console.log(results);
}

# Display the results

We need to first display the image itself on the canvas. Add the following code to the setup function.

function setup() {
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height);
}

We can then display the classification results on the canvas. With fill(), stroke(), and textSize(), we can set up the text style.

function gotResult(results) {
  console.log(results);

  fill(255);
  stroke(0);
  textSize(18);


Get the top 1 label that model feels most confident about. results[0] is the object with the highest confidence score. We can then extract the label and confidence from this object. nf() is used to format the confidence score to two decimal places.

label = "Label: " + results[0].label;
confidence = "Confidence: " + nf(results[0].confidence, 0, 2);

Finally, display the label and confidence on the canvas.

  text(label, 10, 360);
  text(confidence, 10, 380);
}