goog.provide("towerofhanoi.winner_design");
 towerofhanoi.winner_design = function winner_design(args){
   
    var n_disks = args["disks"];
    var number_of_moviments = args["cont_moviments"]


      var scene = new lime.Scene();

      var layer = new lime.Layer();

      towerofhanoi.play_sound_win();

      args["cont_moviments"] = args["cont_moviments"] += 1;
      
      score(layer,args);
      
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

      towerofhanoi.director.replaceScene(scene);
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

function score(layer,args) {
    //classic mode
    if(Object.keys(args).length == 2){
      qtyDiscs = args["disks"];
      number_of_moviments = args["cont_moviments"];
    var number_moviments_three_stars = (Math.pow(2, qtyDiscs)) - 1
    var number_moviments_two_stars = ((Math.pow(2, qtyDiscs)) - 1) + (((Math.pow(2, qtyDiscs)) - 1)/2)
    var number_moviments_one_star = ((Math.pow(2, qtyDiscs)) - 1) + ((Math.pow(2, qtyDiscs)) - 1)

    if(number_of_moviments >= number_moviments_three_stars && number_of_moviments < number_moviments_two_stars){
        var three_stars = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/three_stars.png');
        layer.appendChild(three_stars);
    }
    if(number_of_moviments >= number_moviments_two_stars && number_of_moviments < number_moviments_one_star){
        var two_stars = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/two_stars.png');
        layer.appendChild(two_stars);
    }
    if(number_of_moviments >= number_moviments_one_star){
        var one_star = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/one_star.png');
        layer.appendChild(one_star);
    }
 }
    else{

    var number_moviments_three_stars = (Math.pow(2, qtyDiscs)) - 1
    var number_moviments_two_stars = ((Math.pow(2, qtyDiscs)) - 1) + (((Math.pow(2, qtyDiscs)) - 1)/2)
    var number_moviments_one_star = ((Math.pow(2, qtyDiscs)) - 1) + ((Math.pow(2, qtyDiscs)) - 1)

    if(number_of_moviments >= number_moviments_three_stars && number_of_moviments < number_moviments_two_stars){
        var three_stars = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/three_stars.png');
        layer.appendChild(three_stars);
    }
    if(number_of_moviments >= number_moviments_two_stars && number_of_moviments < number_moviments_one_star){
        var two_stars = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/two_stars.png');
        layer.appendChild(two_stars);
    }
    if(number_of_moviments >= number_moviments_one_star){
        var one_star = new lime.Sprite()
            .setSize(512, 256)
            .setPosition(135, 60)
            .setAnchorPoint(0, 0)
            .setFill('assets/one_star.png');
        layer.appendChild(one_star);
    }
}
}
