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
            .setPosition(400, 55);

    var text = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(700, 10)
            .setText("The game is based of a base containing three pins, one of which is arranged a few disks on the other, in ascending order in diameter from top to bottom.The problem is to move all the disks of a pin any other, such as by using an auxiliary pins, so that a disk greater    never stand on top of a smaller one in any situation.The number of discs may vary and the most simple contains only three.") // 
            .setPosition(400, 110);

     var game_instructon = new lime.Sprite()
            .setSize(550, 550)
            .setPosition(100, 175)
            .setAnchorPoint(0, 0)
            .setFill('assets/instructions3.png');

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
  
     goog.events.listen(btn_next, ['mousedown', 'touchstart'], function(e) {
        scene = new towerofhanoi.Help_level(); 
        towerofhanoi.director.replaceScene(scene);
    }); 
    
    this.appendChild(title);
    this.appendChild(text);
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

 lime.Scene.call(this);
    var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);      
    this.appendChild(maskSprite);

      var title = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#1C1C1C')
            .setFontSize(35)
            .setText("Tower of Hanoi")
            .setPosition(400, 50); 

       var text = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#1C1C1C')
            .setFontSize(23)
            .setSize(200, -50)
            .setText("Level 1") 
            .setPosition(150, 70);      

       var text1 = new lime.Label().setAlign('center')
            .setFontFamily('"Trebuchet MS"')
            .setFontColor('#000080')
            .setFontSize(20)
            .setSize(600, -100)
            .setText("The first larval level contains only three discs, with the objetido pass these three discs without any disc is higher upon lower using the three towers as aids in this task. This nivem is suitable for beginners.") 
            .setPosition(400, 70); 

       var text2 = new lime.Label().setAlign('center')
             .setFontFamily('"Trebuchet MS"')
             .setFontColor('#1C1C1C')
             .setFontSize(23)
             .setSize(600, -250)
             .setText("Level 2") 
             .setPosition(150, 70);  
       
      var text3 = new lime.Label().setAlign('center')
             .setFontFamily('"Trebuchet MS"')
             .setFontColor('#000080')
             .setFontSize(20)
             .setSize(600, -300)
             .setText("The second level is increased one pocuo the difficulty instead of three disks on the second level we have a total of four drives.") 
             .setPosition(400, 70);  
  
       var text4 = new lime.Label().setAlign('center')
             .setFontFamily('"Trebuchet MS"')
              .setFontColor('#1C1C1C')
             .setFontSize(23)
             .setSize(600, -400)
             .setText("Level 3.") 
             .setPosition(150, 70);

     var text5 = new lime.Label().setAlign('center')
             .setFontFamily('"Trebuchet MS"')
              .setFontColor('#000080')
             .setFontSize(20)
             .setSize(600, -450)
             .setText("The third level is further increased the degree of difficulty instead of three disks on the second level we have a total of five discs.") 
             .setPosition(400, 70);
    
 //      var text3 = new lime.Label().setAlign('center')
 //           .setFontFamily('"Trebuchet MS"')
 //           .setFontColor('#000080')
 //           .setFontSize(28)
 //           .setSize(600, -200)
 //           .setText("Level 4: Contains four disks") 
 //           .setPosition(300, 70);
     
 //       var text4 = new lime.Label().setAlign('center')
 //           .setFontFamily('"Trebuchet MS"')
 //           .setFontColor('#000080')
 //           .setFontSize(28)
 //           .setSize(600, -260)
 //           .setText("Level 5: Contains five disks") 
 //           .setPosition(300, 70);
       
      
//        var text5 = new lime.Label().setAlign('center')
//            .setFontFamily('"Trebuchet MS"')
//            .setFontColor('#000080')
//            .setFontSize(28)
//            .setSize(600, -360)
//            .setText("Em construcao!! ") 
//            .setPosition(300, 70);

     var btn_previous = new towerofhanoi.makeButton("Previous")
            .setPosition(100, 600)
            .setSize(125, 50);
    
     var btn_menu = new towerofhanoi.makeButton("Menu")
            .setPosition(700, 600)
            .setSize(125, 50);

    goog.events.listen(btn_menu, ['mousedown', 'touchstart'], function(e) {
           towerofhanoi.loadMenu();
    });

    goog.events.listen(btn_previous, ['mousedown', 'touchstart'], function(e) {
        scene = new towerofhanoi.Help(); 
        towerofhanoi.director.replaceScene(scene);
    });
  
    this.appendChild(title);
    this.appendChild(text);
    this.appendChild(text1);
    this.appendChild(text2);
    this.appendChild(text3);
    this.appendChild(text4);
    this.appendChild(text5);
      this.appendChild(btn_previous);  
      this.appendChild(btn_menu);

     /* MUTE */
    var btn_mute = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(720, 30)
            .setAnchorPoint(0, 0)
            .setFill('assets/mute.png');
    this.appendChild(btn_mute);

    goog.events.listen(btn_mute, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.music_sound();
    });

};
goog.inherits(towerofhanoi.Help_level, lime.Scene);
goog.inherits(towerofhanoi.Help, lime.Scene);
