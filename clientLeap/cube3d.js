/*// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),

  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);*/

var objURL = "models3d/o1.obj";
var loader = new THREE.OBJLoader();
loader.load( objURL, function ( object ) {
  scene.add( object );
} );
