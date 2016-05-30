function mRotationR(obj){
  switch(obj.name){
    case "o2":
      obj.rotation.y += 0.03;
      break;
    case "o3":
      obj.rotation.z += 0.03;
      break;
    case "o4":
      obj.rotation.z += 0.03;
      break;
    case "o5":
      obj.rotation.x += 0.03;
      break;
    case "o6":
      obj.rotation.z += 0.03;
      break;
  }
  msg("mRotationR");

}
function mRotationL(obj){
  switch(obj.name){
    case "o2":
      obj.rotation.y -= 0.03;
      break;
    case "o3":
      obj.rotation.z -= 0.03;
      break;
    case "o4":
      obj.rotation.z -= 0.03;
      break;
    case "o5":
      obj.rotation.x -= 0.03;
      break;
    case "o6":
      obj.rotation.z -= 0.03;
      break;
  }
  msg("mRotationL");
}

function mZoomIn(){
  zoom=zoom-0.4;
  camera.fov = fov * zoom;
  camera.updateProjectionMatrix();
  msg("mZoomIn");
}
function mZoomOut(){
  zoom=zoom+0.05;
  camera.fov = fov * zoom;
  camera.updateProjectionMatrix();
  msg("mZoomOut");
}


function mAddCube(){
  var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  var cube = new THREE.Mesh( geometry, material );
  base.add( cube );
  cube.position.x = 0.5;
  cube.position.y = 0.5;
  msg("mAddCube");
}

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};
var onError = function ( xhr ) { };

var bus;
function mAddBus(){
  if(scene.getObjectByName("bus")){
    o6.remove( o6.getObjectByName("bus") );
    msg("delete Bus");
  }else{
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( './models3d/bus/' );
    mtlLoader.load( 'Ideale 770.mtl', function( materials ) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( './models3d/bus/' );
      objLoader.load( 'Ideale 770.obj', function ( object ) {
        bus=object;
        bus.name="bus";
        o6.add( bus );
        bus.scale.x=0.1;
        bus.scale.y=0.1;
        bus.scale.z=0.1;
        bus.position.x= 0.5;
        bus.position.y= 0.5;
      }, onProgress, onError);
    });
    msg("mAddBus");
  }

}




function remove3dObject(object) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove( selectedObject );
}
