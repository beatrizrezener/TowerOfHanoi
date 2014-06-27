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
goog.require('lime.RoundedRect');
goog.require('lime.Layer');
goog.require('lime.Polygon');
goog.require('lime.transitions.Dissolve');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.ScaleTo');
goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.PauseScene');
goog.require('towerofhanoi.Button');
goog.require('towerofhanoi.play_sound');


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
	    layer = new lime.Layer().setPosition(WIDTH / 2, 0);

        var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
        scene.appendChild(maskSprite);

	var title = new lime.Sprite().setFill('assets/tof.png').setPosition(0, 160);
	title.qualityRenderer = true;
	layer.appendChild(title);

	var btns = new lime.Layer().setPosition(0, 120);
	layer.appendChild(btns);

	var btn = towerofhanoi.makeButton('Play Classic').setPosition(0, 230);
	goog.events.listen(btn, 'click', function() {
	    //towerofhanoi.usemode = towerofhanoi.Mode.CLASSIC;
	    towerofhanoi.classicMenu();
	});
	btns.appendChild(btn);

	btn = towerofhanoi.makeButton('Play Timed').setPosition(0, 330);
	goog.events.listen(btn, 'click', function() {
	    //towerofhanoi.usemode = towerofhanoi.Mode.TIMED;
	    //alert('timed');
	});
	btns.appendChild(btn);

	btn = towerofhanoi.makeButton('Help').setPosition(0, 430);
	goog.events.listen(btn, 'click', function() {
	    towerofhanoi.help();
	});
	btns.appendChild(btn);
	scene.appendChild(layer);

	// set current scene active
	towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for same size buttons
towerofhanoi.makeButton = function(text) {
    var btn = new towerofhanoi.Button(text).setSize(250, 70);
    return btn;
};

towerofhanoi.classicMenu = function() {
    var scene = new lime.Scene();
    var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    scene.appendChild(maskSprite);

  //    var title = new lime.Label().setAlign('center')
//            .setFontFamily('"Trebuchet MS"')
//            .setFontColor('#000080')
//            .setFontSize(28)
//            .setText("Tower of Hanoi")
//            .setPosition(300, 22);
 //   scene.appendChild(title);
    
//    var text = new lime.Label().setAlign('center')
//            .setFontFamily('"Trebuchet MS"')
//            .setFontColor('#000080')
//            .setFontSize(20)
//           .setText("Clique no bot\u00e3o para continuar") // \u00e3 = ã
//            .setPosition(300, 70);

    var btn_level1 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(320, 375)
            .setAnchorPoint(0, 0)
            .setFill('assets/level1.png');

    var btn_level2 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(320, 425)
            .setAnchorPoint(0, 0)
            .setFill('assets/level2.png');
    
    var btn_level3 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(320, 475)
            .setAnchorPoint(0, 0)
            .setFill('assets/level3.png');

    var btn_level4 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(320, 525)
            .setAnchorPoint(0, 0)
            .setFill('assets/level4.png');

    var btn_level5 = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(320, 575)
            .setAnchorPoint(0, 0)
            .setFill('assets/level5.png');

   var btn_help = new lime.Sprite()
            .setSize(80, 80)
            .setPosition(700, 20)
            .setAnchorPoint(0, 0)
            .setFill('assets/help.fw.png');


    var tower_imagen = new lime.Sprite()
            .setFill('assets/tof.png')
            .setPosition(400, 160);

    var logo = new lime.Sprite()
            .setSize(200, 400)
            .setPosition(100, 400)
            .setAnchorPoint(0, 0)
            .setFill('assets/inicial.jpg');

  //  scene.appendChild(title);
  //  scene.appendChild(text);
    scene.appendChild(btn_level1);
    scene.appendChild(btn_level2);
    scene.appendChild(btn_level3);
    scene.appendChild(btn_level4);
    scene.appendChild(btn_level5);
    scene.appendChild(tower_imagen);
    scene.appendChild(btn_help);
   
  goog.events.listen(btn_help, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.help();
    })

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

    towerofhanoi.director.pauseClassFactory = towerofhanoi.PauseScene;
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);

};

towerofhanoi.help = function() {

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
    
    var btn_menu = new lime.Sprite()
            .setSize(150, 50)
            .setPosition(625, 575)
            .setAnchorPoint(0, 0)
            .setFill('assets/backtomenu.png');

      scene.appendChild(title);
      scene.appendChild(text);
      scene.appendChild(btn_menu);
  
   goog.events.listen(btn_menu, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
    });

      
     towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
};

// load new game scene
towerofhanoi.newGame = function(qtyDiscs) {
    var scene = new towerofhanoi.Game(qtyDiscs);
    maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    scene.appendChild(maskSprite);
    towerofhanoi.director.replaceScene(scene, lime.transitions.Dissolve);
    towerofhanoi.play_sound();
};

towerofhanoi.pause = function() {
    towerofhanoi.director.setPaused(true);
    lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
};

towerofhanoi.play = function() {
    towerofhanoi.director.setPaused(false);
};

towerofhanoi.time = function(){
   var layer = new lime.Layer();
    if(t > 0)
    {
      var time = new lime.Label()
      .setFontFamily('Trebuchet MS')
      .setFontColor('#4f96ed').setPosition(600,280)
      .setAlign('center').setFontSize(50).setText("Faltam: " + t + " segundos.");
      //document.getElementById("txt").innerText = "Faltam: " + t + " segundos.";
      setTimeout(function(){"time()"}, 1000);
      t = t - 1;
      layer.appendChild(time);
    }
    else
    {
      towerofhanoi.youLost(); 
    }
};
