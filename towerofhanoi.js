var POSITION_OF_FIRST_DISC = 490;
var HEIGHT_OF_DISCS = 40;
var DISTANCE_BETWEEN_TOWERS = 200;
var NO_SUCH_OBJECT = -1;

//set main namespace
goog.provide('towerofhanoi');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.Layer');
goog.require('lime.Polygon');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.MoveInUp');
goog.require('lime.animation.MoveTo');
goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.PauseScene');
goog.require('towerofhanoi.Button');
goog.require('towerofhanoi.music_sound');
goog.require('towerofhanoi.Help');
goog.require('towerofhanoi.ClassicMenu');
goog.require('towerofhanoi.music_sound');

var WIDTH = 800;
var HEIGHT = 640;

towerofhanoi.start = function() {

    var director = new lime.Director(document.body, WIDTH, HEIGHT);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    towerofhanoi.director = director;
    towerofhanoi.director.pauseClassFactory = towerofhanoi.PauseScene;

    towerofhanoi.loadMenu();
    towerofhanoi.play_sound_initial();
};

/**
 * enum Modes
 */
towerofhanoi.Mode = {
    CLASSIC: 0,
    TIMED: 1
};

towerofhanoi.loadMenu = function(opt_transition) {
    
 var scene = new lime.Scene(),
 layer = new lime.Layer().setPosition(WIDTH / 2, 0);

 var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
 scene.appendChild(maskSprite);

	var title = new lime.Sprite().setFill('assets/toh3.png').setPosition(0, 160).setSize(490,259);
	title.qualityRenderer = true;
	layer.appendChild(title);

	var btns = new lime.Layer().setPosition(0, 120);
	layer.appendChild(btns);

        var move = new lime.animation.MoveBy(-WIDTH, 0).enableOptimizations();

	var btn = towerofhanoi.makeButton('Play Classic').setPosition(0, 230);
	goog.events.listen(btn, 'click', function() {
            towerofhanoi.usemode = towerofhanoi.Mode.CLASSIC; 
            btns.runAction(move);
	});
	btns.appendChild(btn);

	btn = towerofhanoi.makeButton('Play Timed').setPosition(0, 330);
	goog.events.listen(btn, 'click', function() {
	    towerofhanoi.usemode = towerofhanoi.Mode.TIMED;
            btns.runAction(move);
	});
	btns.appendChild(btn);

	btn = towerofhanoi.makeButton('Help').setPosition(0, 430);
	goog.events.listen(btn, ['mousedown', 'touchstart'], function() {
	    towerofhanoi.loadHelpScene();
	});
	btns.appendChild(btn);

        /* MUTE */
        var btn_mute = new lime.Sprite()
                .setSize(65, 65)
                .setPosition(720, 20)
                .setAnchorPoint(0, 0)
                .setFill('assets/mute.png');
        scene.appendChild(btn_mute);
        goog.events.listen(btn_mute, ['mousedown', 'touchstart'], function(e) {
            towerofhanoi.music_sound();
        });

        var btns2 = new towerofhanoi.ClassicMenu().setPosition(WIDTH/2, -120);;
        var move_back = new lime.animation.MoveBy(WIDTH, 0).enableOptimizations();
        var btn_back = new towerofhanoi.Button("Menu").setSize(150, 50).setPosition(700, 600);
        btns2.appendChild(btn_back);
        goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
            btns.runAction(move_back);
        });
    
        btns.appendChild(btns2);
        scene.appendChild(layer);
	
    // set current scene active
        towerofhanoi.director.replaceScene(scene, opt_transition ? lime.transitions.MoveInDown : lime.transitions.Dissolve);
};  

// helper for same size buttons
towerofhanoi.makeButton = function(text) {
    var btn = new towerofhanoi.Button(text).setSize(250, 70);
    return btn;
};

towerofhanoi.loadClassicMenu = function() {
    var scene = new towerofhanoi.ClassicMenu();
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
};

// load new help scene
towerofhanoi.loadHelpScene = function() {
    var scene = new towerofhanoi.Help();
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
};

// load new game scene
towerofhanoi.newGame = function(qtyDiscs) {
    towerofhanoi.music_sound();
    var scene = new towerofhanoi.Game(qtyDiscs);
    maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    scene.appendChild(maskSprite);
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
    towerofhanoi.pause_sound();
};

towerofhanoi.pause = function() {
    towerofhanoi.director.setPaused(true);
    lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
};

towerofhanoi.play = function() {
    towerofhanoi.director.setPaused(false);
};