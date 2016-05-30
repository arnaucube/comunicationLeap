function concatData(id, data){
  return id + ": " + data + "<br>";

}

var output = document.getElementById("output");
var frameString= "", handString="", fingerString="";
var hand, finger;







var options = { enableGestures: true};

//main leap loop
Leap.loop(options, function(frame) {
  frameString = concatData("frame_id", frame.id);
  frameString += concatData("num_hands", frame.hands.length);
  frameString += concatData("num_fingers", frame.fingers.length);
  frameString += "<br>";

  //showcase some new v2 features
  for(var i=0; i<frame.hands.length; i++){
    hand= frame.hands[i];
    handString = concatData("hand_type", hand.type);
    handString += concatData("confidence", hand.confidence);
    handString += concatData("pinch_strength", hand.pinchStrength);
    handString += concatData("grab_strength", hand.grabStrength);

    handString += "<br>";
    frameString += handString;
  }


  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              /*console.log("Circle Gesture");
              toastr.info("Circle Gesture");*/
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              toastr.info("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              toastr.info("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              toastr.info("Swipe Gesture");
              break;
        }
    });

  }

  output.innerHTML = frameString;
});
