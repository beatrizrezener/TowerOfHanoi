goog.require('towerofhanoi.Game');


towerofhanoi.verifyWinnerTimed = function () {
    if(ganhador){
      var scene = new lime.Scene();

      var layer = new lime.Layer();

      towerofhanoi.play_sound_win();

      number_of_moviments += 1;
      score(layer, number_of_moviments, n_disks);
      
      var continue_play = new towerofhanoi.Button("PLAY AGAIN")
        .setSize(200, 100)
        .setPosition(250, 360);
 
      var next_level = new towerofhanoi.Button("NEXT LEVEL")
        .setSize(200, 100)
        .setPosition(550, 360);

      var back_to_menu = new towerofhanoi.Button("Menu")
        .setSize(170, 70)
        .setPosition(140, 590);

      var maskSprite = new lime.Sprite()
        .setSize(800, 640).setFill(100, 0, 0, .1)
        .setAnchorPoint(0, 0);
         
      scene.appendChild(maskSprite);
      layer.appendChild(continue_play);
      layer.appendChild(back_to_menu);
      layer.appendChild(next_level);
      scene.appendChild(layer);

      this.director.replaceScene(scene);
      goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.Game.playAgain(n_disks);
      });

      goog.events.listen(next_level, ['mousedown', 'touchstart'], function(e) {
        if(n_disks === 7) {
          alert("This is the last level.");
        } else {
          towerofhanoi.Game.playAgain(n_disks+1);
        }
      });

      goog.events.listen(back_to_menu, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
        towerofhanoi.Game.resetMoviments();
      });
    }
    else{
      var scene = new lime.Scene();

      var layer = new lime.Layer();

      towerofhanoi.play_sound_lost();
      
      var continue_play = new towerofhanoi.Button("PLAY AGAIN")
        .setSize(200, 100)
        .setPosition(250, 360);

      var back_to_menu = new towerofhanoi.Button("Menu")
        .setSize(170, 70)
        .setPosition(140, 590);

      var maskSprite = new lime.Sprite()
        .setSize(800, 640).setFill(100, 0, 0, .1)
        .setAnchorPoint(0, 0);
         
      layer.appendChild(continue_play);
      layer.appendChild(back_to_menu);
      scene.appendChild(layer);

      this.director.replaceScene(scene);
      goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.Game.playAgain(n_disks);
      });

      goog.events.listen(back_to_menu, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
        towerofhanoi.Game.resetMoviments();
      });
    }
}

function score() {
    
}
