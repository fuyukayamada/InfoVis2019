function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
    [-1, 1, 0], // v0
    [-1,-1, 0], // v1
    [ 1,-1, 0], // v2
    [ 1, 1, 0]
    ];
    var faces = [
    [0,1,2], [0,2,3] // f0: v0-v1-v2
    ];

    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    var id = faces[0];
    var f0 = new THREE.Face3( id[0], id[1], id[2] );
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push( v0 );
    geometry1.vertices.push( v1 );
    geometry1.vertices.push( v2 );
    geometry1.faces.push( f0 );

/* -------- 2 -------- */
  var vertices = [
    [-1, 1, 0], // v0
    [ 1, 1, 0], // v1
    [ 1,-1, 0] // v2
  ];

    id = faces[1];
    var f1 = new THREE.Face3( id[0], id[1], id[2] );

    var geometry2 = new THREE.Geometry();

    geometry2.vertices.push( v0 );
    geometry2.vertices.push( v2 );
    geometry2.vertices.push( v3 );
    geometry2.faces.push( f1 );


    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //var material = new THREE.MeshLambertMaterial( { color: 0xaa5588 } );
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    geometry1.faces[0].color = new THREE.Color( 1, 0, 0 );
    geometry2.faces[0].color = new THREE.Color( 1, 0, 0 );

    //material.vertexColors = THREE.VertexColors;
    //geometry.faces[0].vertexColors.push(new THREE.Color(1,0,0));
    //geometry.faces[0].vertexColors.push(new THREE.Color(0,1,0));
    //geometry.faces[0].vertexColors.push(new THREE.Color(0,0,1));
    scene.add( material )

    var cube = new THREE.Mesh( geometry2, material );
    scene.add( cube );

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        renderer.render( scene, camera );
    }
}
