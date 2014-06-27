goog.provide('towerofhanoi.ClassicMenu');
goog.require('lime.Sprite');
goog.require('towerofhanoi.Button');
goog.require('towerofhanoi.music_sound');

towerofhanoi.ClassicMenu = function() {
    lime.Layer.call(this);
    
    var btn_level1 = towerofhanoi.makeButton('Level 1').setPosition(390, 320).setSize(270, 50); 

    var btn_level2 = towerofhanoi.makeButton('Level 2').setPosition(390, 380).setSize(270, 50); 

    var btn_level3 = towerofhanoi.makeButton('Level 3').setPosition(390, 440).setSize(270, 50); 

    var btn_level4 =  towerofhanoi.makeButton('Level 4').setPosition(390, 500).setSize(270, 50); 

    var btn_level5 =  towerofhanoi.makeButton('Level 5').setPosition(390, 560).setSize(270, 50); 

    var btn_help = new lime.Sprite().setSize(65, 65).setPosition(650, 20).setAnchorPoint(0, 0).setFill('assets/help.fw.png');
    this.appendChild(btn_help);

     /* MUTE */
    var btn_mute = new lime.Sprite().setSize(65, 65).setPosition(720, 20).setAnchorPoint(0, 0).setFill('assets/mute.png');

    goog.events.listen(btn_mute, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.music_sound();
    });

    goog.events.listen(btn_help, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadHelpScene();
    });

    this.appendChild(btn_level1);
    this.appendChild(btn_level2);
    this.appendChild(btn_level3);
    this.appendChild(btn_level4);
    this.appendChild(btn_level5);

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
goog.inherits(towerofhanoi.ClassicMenu, lime.Layer);
