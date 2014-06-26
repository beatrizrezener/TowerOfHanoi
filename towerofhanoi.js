var POSITION_OF_FIRST_DISC = 520;
var HEIGHT_OF_DISCS = 40;
var DISTANCE_BETWEEN_TOWERS = 200;
var NO_SUCH_OBJECT = -1;

//set main namespace
goog.provide('towerofhanoi');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient'); //Classe inclu�da para criar o gradiente do c�u
goog.require('lime.Polygon');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.ScaleTo');
goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.PauseScene');


var WIDTH = 800;
var HEIGHT = 640;

towerofhanoi.start = function() {

    var director = new lime.Director(document.body, WIDTH, HEIGHT);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);

    towerofhanoi.director = director;
    towerofhanoi.loadMenu();
};

towerofhanoi.loadMenu = function() {
    var scene = new lime.Scene();

    var title = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(28)
            .setText("Tower of Hanoi")
            .setPosition(300, 22);

    var text = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setText("Clique no bot\u00e3o para continuar") // \u00e3 = ã
            .setPosition(300, 70);

    var bg_gradient = new lime.fill.LinearGradient()
            .setDirection(0.5, 0, 0.5, 1)
            .addColorStop(0, '#F0F8FF')
            .addColorStop(1, '#8470FF');

    var background = new lime.Sprite()
            .setSize(800, 640)
            .setPosition(0, 0)
            .setAnchorPoint(0, 0)
            .setFill(bg_gradient);

    var btn_level1 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 50)
            .setAnchorPoint(0, 0)
            .setFill('assets/level1.png');

    var btn_level2 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 100)
            .setAnchorPoint(0, 0)
            .setFill('assets/level2.png');

    var btn_level3 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 150)
            .setAnchorPoint(0, 0)
            .setFill('assets/level3.png');

    var btn_level4 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 200)
            .setAnchorPoint(0, 0)
            .setFill('assets/level4.png');

    var btn_level5 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 250)
            .setAnchorPoint(0, 0)
            .setFill('assets/level5.png');

    var btn_help = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(600, 300)
            .setAnchorPoint(0, 0)
            .setFill('assets/botao_help.png');


    var tower_imagen = new lime.Sprite()
            .setSize(200, 200)
            .setPosition(75, 400)
            .setAnchorPoint(0, 0)
            .setFill('assets/tower.gif');

    scene.appendChild(background);
    scene.appendChild(title);
    scene.appendChild(text);
    scene.appendChild(btn_level1);
    scene.appendChild(btn_level2);
    scene.appendChild(btn_level3);
    scene.appendChild(btn_level4);
    scene.appendChild(btn_level5);
    scene.appendChild(tower_imagen);
    scene.appendChild(btn_help);

    goog.events.listen(btn_level1, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(3);
    });

    goog.events.listen(btn_level2, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(4);
    });

    goog.events.listen(btn_level3, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(5);
    });

    goog.events.listen(btn_level4, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(6);
    });

    goog.events.listen(btn_level5, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(7);
    });

    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);

};

// load new game scene
towerofhanoi.newGame = function(qtyDiscs) {
    var scene = new towerofhanoi.Game(qtyDiscs);
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
};

towerofhanoi.pause = function() {
    towerofhanoi.director.setPaused(true);
    lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
};

towerofhanoi.play = function() {
    towerofhanoi.director.setPaused(false);
};
