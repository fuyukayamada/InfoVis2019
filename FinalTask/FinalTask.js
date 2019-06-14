function main()
{

    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
    // windowの大きさに合わせて調整
        width: window.innerWidth,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });


// 
    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var elem = document.getElementById('range')


// パラメータ宣言
    var lobster_color = "#ff0000";
    var isovalue = 128;
    var shader = 'Phong';



//初期ロブスター生成
    var surfaces = Isosurfaces( volume, isovalue, lobster_color, shader );


    console.log(volume);
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
    // windowの大きさに合わせて調整
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

// loop
    screen.loop();


// dat.guiのパラメータ
    var ParameterWindow = function() {
      this.color = "#ff0000";
      this.isovalue = 128;
      this.Shader = 'Phong';
      this.bounds = true;
};

// GUI表示
    window.onload = function() {
    param = new ParameterWindow();
    setValue();
    var gui = new dat.GUI();
// カラー選択のカーソルがぬるぬる動くようになる(mouseoffしたときに決定される)
    gui.addColor(param, 'color').onFinishChange(setValue);
    gui.add(param, 'isovalue', 0, 255).step(1).onFinishChange(setValue);
    gui.add(param, 'Shader', [ 'Phong', 'Lambertian', 'Blinn-Phong', 'Cook-Torrance', 'Toon', 'Normal' ] ).onFinishChange(setValue);
    gui.add(param, 'bounds').onChange(setBounds);
};


//設定更新処理

function setValue() {
    lobster_color = param.color;
    isovalue = param.isovalue;
    shader = param.Shader;
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces( volume, isovalue, lobster_color, shader );
    screen.scene.add( surfaces );
}

// フレームの切り替え処理
function setBounds() {
    if(param.bounds)
    {
        screen.scene.add(bounds);
    }
    else
    {
        screen.scene.remove(bounds);
    }

}

}
