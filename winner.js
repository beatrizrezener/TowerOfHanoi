goog.provide('towerofhanoi.verifyWinner');
goog.require('towerofhanoi.Game');


towerofhanoi.verifyWinner = function (towers, to_tower, n_disks, number_of_moviments) {
    if (towers[to_tower].length == n_disks && to_tower != 0) {
      var scene = new lime.Scene();

      var layer = new lime.Layer();

      score(number_of_moviments, n_disks);
      
      var continue_play = new lime.Sprite()
        .setSize(200, 100)
        .setPosition(370, 360)
        .setFill('assets/play_again.png');

      var back_to_menu = new lime.Sprite()
        .setSize(200, 100)
        .setPosition(370, 560)
        .setFill('assets/back_to.png');

      layer.appendChild(continue_play);
      layer.appendChild(back_to_menu);
      scene.appendChild(layer);

      this.director.replaceScene(scene);
      goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.Game.playAgain(n_disks);
      });
      goog.events.listen(back_to_menu, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.loadMenu();
      });
    }
}

function score(number_of_moviments, qtyDiscs) {
    var number_moviments_three_stars = (Math.pow(2, qtyDiscs)) - 1
    var number_moviments_two_stars = ((Math.pow(2, qtyDiscs)) - 1) + (((Math.pow(2, qtyDiscs)) - 1)/2)
    var number_moviments_one_star = ((Math.pow(2, qtyDiscs)) - 1) + ((Math.pow(2, qtyDiscs)) - 1)

    if(number_of_moviments >= number_moviments_three_stars && number_of_moviments < number_moviments_two_stars){
        var three_stars = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(350, 250)
            .setAnchorPoint(0, 0)
            .setFill('assets/three_stars.png');
        this.appendChild(three_stars);
    }
    if(number_of_moviments >= number_moviments_two_stars && number_of_moviments < number_moviments_one_star){
        var two_stars = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(350, 250)
            .setAnchorPoint(0, 0)
            .setFill('assets/two_stars.png');
        this.appendChild(two_stars);
    }
    if(number_of_moviments >= number_moviments_one_star){
        var one_star = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(350, 250)
            .setAnchorPoint(0, 0)
            .setFill('assets/one_star.png');
        this.appendChild(one_star);
    }
}
