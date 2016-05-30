var hand;
var position;
var velocity;
var direction;

var actObj="o2";

Leap.loop({enableGestures: true}, function(frame){




  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){

      var clockwise = false;
      var pointableID = gesture.pointableIds[0];
      var direction = frame.pointable(pointableID).direction;
      if((direction)&&(gesture.normal))
      {
        var dotProduct = Leap.vec3.dot(direction, gesture.normal);
      }

      //hand
      hand = frame.hands[0];
      if(hand)
      {
        position = hand.palmPosition;
        velocity = hand.palmVelocity;
        direction = hand.direction;
      }

        switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              //mRotation(o4);
              if (dotProduct  >  0){
                console.log("r");
                RotationR2Server(actObj);
              }else{
                console.log("l");
                RotationL2Server(actObj);
              }
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              AddCube2Server();
              //mAddCube();
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              ZoomIn2Server();
              break;
          case "swipe":
              console.log("Swipe Gesture");
              //o4.rotation.x +=0.1;
              break;
        }
    });

    if(frame.hands.length>1)
    {
      console.log("twohands");
    }
    /*if(frame.hands.length > 0)
    {//axis rotation
      var previousFrame = controller.frame(1);
      var axis = hand.rotationAxis(previousFrame);
      console.log("Axis of Rotation: (" + axis[0] + ", " + axis[1] + ", " + axis[2] + ")");
    }*/
  }
  if(frame.hands.length > 0)
  {
    if(HandAction(frame.hands[0])=="open"){
    //  ZoomIn2Server();
    }else if(HandAction(frame.hands[0])=="close"){
      ZoomOut2Server();
    }
  }



});



function HandAction(hand){
  console.log(hand.grabStrength);
  if(hand.grabStrength > 0.99) return "close";
    else if (hand.grabStrength < 0.01) return "open";

    return"not detected";
}
