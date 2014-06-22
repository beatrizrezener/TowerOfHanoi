//set main namespace
goog.provide('towerofhanoi');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
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

    var bg_gradient = new lime.fill.LinearGradient().setDirection(0.5, 0, 0.5, 1)
            .addColorStop(0, '#F0F8FF').addColorStop(1, '#8470FF'); //#0000CD = dark blue
    var background = new lime.Sprite().setSize(800,640).setPosition(0,0).setAnchorPoint(0,0).setFill(bg_gradient);
    
    var plataform = new lime.Polygon().setPosition(100,560).setAnchorPoint(0,0).setFill('assets/metal.jpg').addPoints(-30,30,0,0, 600,0, 630,30,-30,30);
    
    /* BASES */
    var base1 = new lime.RoundedRect().setSize(15,400).setPosition(190,165).setAnchorPoint(0,0).setFill('assets/metal.png').setRadius(50);
    var base2 = new lime.RoundedRect().setSize(15,400).setPosition(390,165).setAnchorPoint(0,0).setFill('assets/metal.png').setRadius(50);
    var base3 = new lime.RoundedRect().setSize(15,400).setPosition(590,165).setAnchorPoint(0,0).setFill('assets/metal.png').setRadius(50);
      
    //add elements in the scene
    scene1.appendChild(background);
    scene1.appendChild(base1);
    scene1.appendChild(base2);
    scene1.appendChild(base3);
    scene1.appendChild(plataform);

    /* DISCS */
    var discs = create_discs(scene1, disc_count=4);
    for(var i=0; i<disc_count; i++){
        goog.events.listen(discs[i],['mousedown','touchstart'],function(e){
            e.startDrag(true);
        });
    }
    
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
    var max_width  = 180;
    var min_width  = 70;
    var width_step = (max_width - min_width)/(disc_count - 1);
    var x_step     = width_step/2;
//    var height     = 360/disc_count;
    var height     = 45;
    var width      = max_width;
    var x          = 107.5;
    var y          = 560 - height;
    var discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF','#FFFF00', '#000000', '#00FFFF'];
    
    for (var i = 0; i < disc_count; ++i) {
        var disc = new lime.RoundedRect().setSize(width,height).setPosition(x,y).setAnchorPoint(0,0).setFill(colors[i]).setRadius(10);
        discs.push(disc);
        scene.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - height;
    }
    return discs;
}