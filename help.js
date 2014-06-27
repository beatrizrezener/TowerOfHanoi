goog.provide('towerofhanoi.Help');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('towerofhanoi.Button');

/**
 * Help scene
 * @constructor
 * @extends lime.Scene
 */
towerofhanoi.Help = function() {
    lime.Scene.call(this);

    var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    this.appendChild(maskSprite);

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
            .setText("The game is based consists of a base containing three ") // \u00e3 = ã
            .setPosition(300, 70);

    var txt1 = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, 40).setAlign('left').setFontFamily('Segoe Print');
    txt1.setText('1. A larger disk can not be placed on a smaller disk;');
   // contents.appendChild(txt1);

    var btn_back = new towerofhanoi.makeButton("Back")
            .setPosition(700, 550)
            .setSize(125, 50);
    goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
    });
    
    this.appendChild(title);
    this.appendChild(text);
    this.appendChild(txt1);
    this.appendChild(btn_back);
    

    /* MUTE */
    var btn_mute = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(720, 20)
            .setAnchorPoint(0, 0)
            .setFill('assets/mute.png');
    this.appendChild(btn_mute);

    goog.events.listen(btn_mute, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.music_sound();
    });


};
goog.inherits(towerofhanoi.Help, lime.Scene);
