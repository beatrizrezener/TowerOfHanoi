goog.provide("towerofhanoi.end_game_pro");

towerofhanoi.end_game_pro = function(n_disks){
    var scene = new lime.Scene();
    var layer = new lime.Layer();

    towerofhanoi.play_sound_lost();

      var loose  = new lime.Label().setText("YOU LOSE").setFontFamily('Verdana')
        .setFontColor('#c00').setFontSize(40)
        .setPosition(250, 200);
  
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
    layer.appendChild(loose);
    scene.appendChild(layer);

    towerofhanoi.director.replaceScene(scene);
    goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
      towerofhanoi.Game.playAgain(n_disks);
    });

    goog.events.listen(back_to_menu, ['mousedown', 'touchstart'], function(e) {
      towerofhanoi.loadMenu();
      towerofhanoi.Game.resetMoviments();
    });

    }
