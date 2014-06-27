goog.provide('towerofhanoi.ClassicMenu');

goog.require('lime.Sprite');
goog.require('towerofhanoi.Button');

towerofhanoi.ClassicMenu = function() {
    lime.Scene.call(this);
    var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    this.appendChild(maskSprite);

 
    var btn_level1 = towerofhanoi.makeButton('Level 1').setPosition(390, 320).setSize(270, 50); 

    var btn_level2 = towerofhanoi.makeButton('Level 2').setPosition(390, 380).setSize(270, 50); 

    var btn_level3 = towerofhanoi.makeButton('Level 3').setPosition(390, 440).setSize(270, 50); 

    var btn_level4 =  towerofhanoi.makeButton('Level 4').setPosition(390, 500).setSize(270, 50); 

    var btn_level5 =  towerofhanoi.makeButton('Level 5').setPosition(390, 560).setSize(270, 50); 

    var btn_help =  towerofhanoi.makeButton('help').setPosition(390, 610).setSize(310, 35); 

    var btn_back = new towerofhanoi.Button("Menu")
            .setSize(150, 50)
            .setPosition(395, 590);

    var tower_imagen = new lime.Sprite()
            .setFill('assets/tof.png')
            .setPosition(400, 160);

     /* MUTE */
    var btn_mute = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(700, 20)
            .setAnchorPoint(0, 0)
            .setFill('assets/mute.png');
    this.appendChild(btn_mute);

    goog.events.listen(btn_mute, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.pause_sound();
    });

    goog.events.listen(btn_help, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadHelpScene();
    });


  //  scene.appendChild(title);
  //  scene.appendChild(text);
    this.appendChild(btn_level1);
    this.appendChild(btn_level2);
    this.appendChild(btn_level3);
    this.appendChild(btn_level4);
    this.appendChild(btn_level5);
    this.appendChild(tower_imagen);
    this.appendChild(btn_back);
    this.appendChild(btn_help);
   
  goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
    });

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
};
goog.inherits(towerofhanoi.ClassicMenu, lime.Scene);
