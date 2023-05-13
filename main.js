function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' ,modleLoaded);
}

function modleLoaded() {
  console.log('Modle Loaded!');
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotReasult);
}

var previous_result = '';

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if((results[0].confidence >0.5) && (previous_result != results[0].label)){
      console.log(results);
      previous_result = results[0].label;
      var synth = Window.speechSynthesis;
      speack_data = 'Object detected is - '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speack_data);
      synth.speack(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuranccy").innerHTML = results[0].
      confedence.toFixed(3);
    }
  }
} 