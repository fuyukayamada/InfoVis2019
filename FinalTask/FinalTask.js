function main()
{

    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
    // window�̑傫���ɍ��킹�Ē���
        width: window.innerWidth,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });


// 
    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var elem = document.getElementById('range')


// �p�����[�^�錾
    var lobster_color = "#ff0000";
    var isovalue = 128;
    var shader = 'Phong';



//�������u�X�^�[����
    var surfaces = Isosurfaces( volume, isovalue, lobster_color, shader );


    console.log(volume);
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
    // window�̑傫���ɍ��킹�Ē���
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

// loop
    screen.loop();


// dat.gui�̃p�����[�^
    var ParameterWindow = function() {
      this.color = "#ff0000";
      this.isovalue = 128;
      this.Shader = 'Phong';
      this.bounds = true;
};

// GUI�\��
    window.onload = function() {
    param = new ParameterWindow();
    setValue();
    var gui = new dat.GUI();
// �J���[�I���̃J�[�\�����ʂ�ʂ铮���悤�ɂȂ�(mouseoff�����Ƃ��Ɍ��肳���)
    gui.addColor(param, 'color').onFinishChange(setValue);
    gui.add(param, 'isovalue', 0, 255).step(1).onFinishChange(setValue);
    gui.add(param, 'Shader', [ 'Phong', 'Lambertian', 'Blinn-Phong', 'Cook-Torrance', 'Toon', 'Normal' ] ).onFinishChange(setValue);
    gui.add(param, 'bounds').onChange(setBounds);
};


//�ݒ�X�V����

function setValue() {
    lobster_color = param.color;
    isovalue = param.isovalue;
    shader = param.Shader;
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces( volume, isovalue, lobster_color, shader );
    screen.scene.add( surfaces );
}

// �t���[���̐؂�ւ�����
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
