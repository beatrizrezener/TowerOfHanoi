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
            .setFontColor('#1C1C1C')
            .setFontSize(35)
            .setText("Tower of Hanoi")
            .setPosition(300, 22);

    var text = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(600, 10)
            .setText("The game is based of a base containing three ") // \u00e3 = ã
            .setPosition(300, 70);
   
   var text2 = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(600, -30)
            .setText("pins, one of which is arranged a few disks on the other, in ascending order in diameter from top to bottom.") 
            .setPosition(300, 70);

   var text3 = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(550, -120)
            .setText("The problem is to move all the disks of a pin any other, such as by using an auxiliary pins, so that a disk greater    never stand on top of a smaller one in any situation.") 
            .setPosition(300, 70);
   
   var text4 = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(550, -260)
            .setText("The number of discs may vary and the most simple contains only three.") 
            .setPosition(300, 70); 


     var game_instructon = new lime.Sprite()
            .setSize(550, 550)
            .setPosition(100, 175)
            .setAnchorPoint(0, 0)
            .setFill('assets/instructions3.png');

//    var txt1 = new lime.Label().setFontSize(18).setSize(600, 50).setPosition(300, 40).setAlign('left').setFontFamily('Segoe Print');
//    txt1.setText('1. A larger disk can not be placed on a smaller disk;');

    var btn_back = new towerofhanoi.makeButton("Back")
            .setPosition(100, 600)
            .setSize(125, 50);
    goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
    });

    var btn_next = new towerofhanoi.makeButton("Next")
            .setPosition(700, 600)
            .setSize(125, 50);
    goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
    });
    
    
    this.appendChild(title);
    this.appendChild(text);
    this.appendChild(text2);
    this.appendChild(text3);
    this.appendChild(text4);
    this.appendChild(game_instructon);
    this.appendChild(btn_back);
    this.appendChild(btn_next);
    

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

towerofhanoi.Help_level = function() {
};
goog.inherits(towerofhanoi.Help, lime.Scene);
