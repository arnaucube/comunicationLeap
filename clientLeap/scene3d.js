var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var o1, o2, o3, o4, o5, o6;
var zoom = 1.0;
var fov = camera.fov;

var targetList = [];

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

/*var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent:true,
  opacity:0.8,
  shading: THREE.FlatShading,
  vertexColors: THREE.VertexColors
});
var cubeMaterials = [
    new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
];
var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);*/





//robot

    var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var base = new THREE.Mesh( geometry, material );
    scene.add( base );
    base.name="base";

    /* object 3d exemple */
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( './models3d/bus/' );
    mtlLoader.load( 'Ideale 770.mtl', function( materials ) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( './models3d/bus/' );
      objLoader.load( 'Ideale 770.obj', function ( object ) {
        o2=object;
        o2.name="o2";
        base.add( o2 );
      }, onProgress, onError);
    });


    /* quan tinc 6 peces
    var objURL = "./models3d/o1.obj";
    var loader = new THREE.OBJLoader();
    loader.load(objURL, function ( object ) {
      o1=object;
      o1.name="o1";
      base.add( o1 );

      objURL = "./models3d/o2.obj";
      loader = new THREE.OBJLoader();
      loader.load(objURL, function ( object ) {
        o2=object;
        o2.name="o2";
        o1.add( o2 );

        objURL = "./models3d/o3.obj";
        loader = new THREE.OBJLoader();
        loader.load(objURL, function ( object ) {
          o3=object;
          o3.name="o3";
          o2.add( o3 );

          objURL = "./models3d/o4.obj";
          loader = new THREE.OBJLoader();
          loader.load(objURL, function ( object ) {
            o4=object;
            o4.name="o4";
            o3.add( o4 );

            objURL = "./models3d/o5.obj";
            loader = new THREE.OBJLoader();
            loader.load(objURL, function ( object ) {
              o5=object;
              o5.name="o5";
              o4.add( o5 );

              objURL = "./models3d/o6.obj";
              loader = new THREE.OBJLoader();
              loader.load(objURL, function ( object ) {
                o6=object;
                o6.name="o6";
                o5.add( o6 );


                targetList.push(o1);
                targetList.push(o2);
                targetList.push(o3);
                targetList.push(o4);
                targetList.push(o5);
                targetList.push(o6);
                targetList.push(base);
              });
            });
          });
        });
      });
    });
*/









//light
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 500, 1000, 500 );
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add( spotLight );



//camera
/*camera.position.z=5;
camera.position.y=4;
camera.position.x=0;
camera.rotation.x= -0.62;*/
base.rotation.y = 2;
camera.position.z=5;
camera.position.y=2;
camera.position.x=0;
camera.rotation.x= -0.42;



//render
var render= function (){
  requestAnimationFrame(render);
  /*cube.rotation.x +=0.1;
  cube.rotation.y +=0.1;*/

  renderer.render(scene, camera);

};

render();
