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
    [-1, 1, -1], // v0
    [-1,-1, -1], // v1
    [ 1,-1, -1], // v2
    [ 1, 1, -1],  // v3
    [-1, 1, 1], // v4
    [-1,-1, 1], // v5
    [ 1,-1, 1], // v6
    [ 1, 1, 1]  // v7
    ];
    var faces = [
    [0,2,1], [0,3,2], [4,5,6], [4,6,7],
    [3,6,2], [3,7,6], [0,5,4], [0,1,5],
    [0,4,3], [7,3,4], [2,5,1], [2,6,5]
    ];

    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    var v7 = new THREE.Vector3().fromArray( vertices[7] );

    //var id = faces[0];
    var f0 = new THREE.Face3( faces[0][0], faces[0][1], faces[0][2] );
    var f1 = new THREE.Face3( faces[1][0], faces[1][1], faces[1][2] );
    var f2 = new THREE.Face3( faces[2][0], faces[2][1], faces[2][2] );
    var f3 = new THREE.Face3( faces[3][0], faces[3][1], faces[3][2] );
    var f4 = new THREE.Face3( faces[4][0], faces[4][1], faces[4][2] );
    var f5 = new THREE.Face3( faces[5][0], faces[5][1], faces[5][2] );
    var f6 = new THREE.Face3( faces[6][0], faces[6][1], faces[6][2] );
    var f7 = new THREE.Face3( faces[7][0], faces[7][1], faces[7][2] );
    var f8 = new THREE.Face3( faces[8][0], faces[8][1], faces[8][2] );
    var f9 = new THREE.Face3( faces[9][0], faces[9][1], faces[9][2] );
    var f10 = new THREE.Face3( faces[10][0], faces[10][1], faces[10][2] );
    var f11 = new THREE.Face3( faces[11][0], faces[11][1], faces[11][2] );
    var geometry = new THREE.Geometry();

    geometry.vertices.push( v0 );
    geometry.vertices.push( v1 );
    geometry.vertices.push( v2 );
    geometry.vertices.push( v3 );
    geometry.vertices.push( v4 );
    geometry.vertices.push( v5 );
    geometry.vertices.push( v6 );
    geometry.vertices.push( v7 );
    geometry.faces.push( f0 );
    geometry.faces.push( f1 );
    geometry.faces.push( f2 );
    geometry.faces.push( f3 );
    geometry.faces.push( f4 );
    geometry.faces.push( f5 );
    geometry.faces.push( f6 );
    geometry.faces.push( f7 );
    geometry.faces.push( f8 );
    geometry.faces.push( f9 );
    geometry.faces.push( f10 );
    geometry.faces.push( f11 );


    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;

    geometry.faces[0].color = new THREE.Color( 0.7, 1, 0.7 );//green
    geometry.faces[1].color = new THREE.Color( 0.7, 1, 0.7 );
    geometry.faces[2].color = new THREE.Color( 0.7, 1, 0.5 );
    geometry.faces[3].color = new THREE.Color( 0.7, 1, 0.5 );
    geometry.faces[4].color = new THREE.Color( 0.7, 0.7, 1 );//brue
    geometry.faces[5].color = new THREE.Color( 0.7, 0.7, 1 );
    geometry.faces[6].color = new THREE.Color( 0.5, 0.7, 1 );
    geometry.faces[7].color = new THREE.Color( 0.5, 0.7, 1 );
    geometry.faces[8].color = new THREE.Color( 1, 0.5, 0.7 );//red
    geometry.faces[9].color = new THREE.Color( 1, 0.5, 0.7 );
    geometry.faces[10].color = new THREE.Color( 1, 0.5, 0.7 );
    geometry.faces[11].color = new THREE.Color( 1, 0.5, 0.7 );

    //scene.add( material )

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );
//...
 //...

    document.addEventListener( 'mousedown', mouse_down_event );

    function mouse_down_event( event )
    {
      var x_win = event.clientX;
      var y_win = event.clientY;

      var vx = renderer.domElement.offsetLeft;
      var vy = renderer.domElement.offsetTop;
      var vw = renderer.domElement.width;
      var vh = renderer.domElement.height;
      var x_NDC = 2 * ( x_win - vx ) / vw - 1;
      var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

      var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
      var p_wld = p_NDC.unproject( camera );

      var origin = camera.position;
      var direction = p_wld.sub(camera.position).normalize();

      var raycaster = new THREE.Raycaster( origin, direction );
      var intersects = raycaster.intersectObject( cube );

      if ( intersects.length > 0 )
        {
          intersects[0].face.color.setRGB( 1, 1, 1 );
          intersects[0].object.geometry.colorsNeedUpdate = true;
        }

      var x_win = event.clientX;
      var y_win = event.clientY;

      var vx = renderer.domElement.offsetLeft;
      var vy = renderer.domElement.offsetTop;
      var vw = renderer.domElement.width;
      var vh = renderer.domElement.height;
      var x_NDC = 2 * ( x_win - vx ) / vw - 1;
      var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

      var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
      var p_wld = p_NDC.unproject( camera );
    }

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
