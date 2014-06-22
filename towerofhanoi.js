//set main namespace
goog.provide('towerofhanoi');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient'); //Classe inclu�da para criar o gradiente do c�u
goog.require('lime.Polygon');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.FadeTo');
goog.require('lime.transitions.SlideInRight');
goog.require('lime.transitions.Dissolve');

// entrypoint
towerofhanoi.start = function() {

    var director = new lime.Director(document.body, 800, 640);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);

    var scene1 = new lime.Scene();

    /* fundo */
    //Definindo um gradiente linear, para o céu azul gradiente, que neste caso começa
    //no topo esquerdo da tela e termina na direita em baixo. Começa no (0,0) e termina no (1,1)
    var sky_gradient = new lime.fill.LinearGradient().setDirection(0, 0, 1, 1)
            .addColorStop(0, '#B2DFEE').addColorStop(1, '#0000CD'); //#0000CD = dark blue

    var sky = new lime.Sprite().setSize(800,640).setPosition(0,0).setAnchorPoint(0,0).setFill(sky_gradient);

    /* FOOTER */
    //setFill('rgb(0,128,0)') OU setFill(0,128,0); podemos setar a cor como HEXADECIMAL e como RGB.
    var footer = new lime.Sprite().setSize(800,40).setPosition(0,600).setAnchorPoint(0,0).setFill('rgb(0,0,0)');
    
    /* PLATAFORM*/
    var plataform = new lime.Polygon().setPosition(100,560).setAnchorPoint(0,0).setFill('assets/texturamadeira.jpg').addPoints(-40,40,0,0, 600,0, 640,40,-40,40);
    
    /* BASES */
    var base1 = new lime.Sprite().setSize(20,240).setPosition(170,320).setAnchorPoint(0,0).setFill('assets/texturamadeiraclara2.jpg');
    var base2 = new lime.Sprite().setSize(20,240).setPosition(390,320).setAnchorPoint(0,0).setFill('assets/texturamadeiraclara2.jpg');
    var base3 = new lime.Sprite().setSize(20,240).setPosition(610,320).setAnchorPoint(0,0).setFill('assets/texturamadeiraclara2.jpg');
      
    //add elements in the scene
    scene1.appendChild(sky);
    scene1.appendChild(footer);
    scene1.appendChild(plataform);
    scene1.appendChild(base1);
    scene1.appendChild(base2);
    scene1.appendChild(base3);

  /* DISCS */
  create_discs(scene1, disc_count=7);

    //PAUSE
    var btn_pause = new lime.Sprite().setSize(100,100).setPosition(675,25).setAnchorPoint(0,0).setFill('assets/pause.png');
    scene1.appendChild(btn_pause);
    
    goog.events.listen(btn_pause, ['mousedown', 'touchstart'], function(e){
        director.setPaused(true);
        lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
    });
    
    // set current scene active
    director.replaceScene(scene1);
};

function create_discs(scene, disc_count){
    var max_width  = 140;
    var min_width  = 50;
    var width_step = (max_width - min_width)/(disc_count - 1);
    var x_step     = width_step/2;
    var height     = 210/disc_count;
    var width      = max_width;
    var x          = 110;
    var y          = 560 - height;
    var discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF','#FFFF00', '#000000', '#00FFFF'];
    
    for (var i = 0; i < disc_count; ++i) {
        var disc = new lime.Sprite().setSize(width,height).setPosition(x,y).setAnchorPoint(0,0).setFill(colors[i]);
        scene.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - height;
    }
    return discs;
}