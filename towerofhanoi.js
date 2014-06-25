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
    var scene = new lime.Scene(),
            layer = new lime.Layer().setPosition(towerofhanoi.WIDTH / 2, 0);

    var title = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(28)
            .setText("Tower of Hanoi")
            .setPosition(300, 22);
    layer.appendChild(title);
    var text = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setText("Clique no bot\u00e3o verde para continuar") // \u00e3 = ã
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
            .setSize(100, 100)
            .setPosition(675, 25)
            .setAnchorPoint(0, 0)
            .setFill('assets/imagemVerde.png');

    var btn_level2 = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(500, 25)
            .setAnchorPoint(0, 0)
            .setFill('assets/images.jpg');

    layer.appendChild(background);
    layer.appendChild(title);
    layer.appendChild(text);
    layer.appendChild(btn_level1);
    layer.appendChild(btn_level2);

    scene.appendChild(layer);

    goog.events.listen(scene, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(4);
    });

    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);

};

// load new game scene
towerofhanoi.newGame = function(qtyDiscs) {
    var scene = new towerofhanoi.Game(qtyDiscs);
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
//        towerofhanoi.Game(qtyDiscs);
};
