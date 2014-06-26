goog.provide('towerofhanoi.verifyWinner');
goog.require('towerofhanoi.Game');


towerofhanoi.verifyWinner = function (towers, to_tower, n_disks) {
    if (towers[to_tower].length == n_disks && towers[towers] != 0) {
      var scene = new lime.Scene();

      var layer = new lime.Layer();

    var winner = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#4f96ed').setPosition(370,280).setAlign('center').setFontSize(50).setText("You win");

      var continue_play = new lime.Sprite()
              .setSize(200, 100)
              .setPosition(370, 360)
              .setFill('assets/play_again.png');

    var bg_gradient = new lime.fill.LinearGradient()
            .setDirection(0.5, 0, 0.5, 1)
            .addColorStop(0, '#F0F8FF')
            .addColorStop(1, '#8470FF');

    var background = new lime.Sprite()
            .setSize(800, 640)
            .setPosition(0, 0)
            .setAnchorPoint(0, 0)
            .setFill(bg_gradient);

      /* BASES */

      //add elements in the scene
      layer.appendChild(background);
      layer.appendChild(winner);
      layer.appendChild(continue_play);
      scene.appendChild(layer);

      this.director.replaceScene(scene);
    goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.newGame(n_disks);
    });
  }
}
