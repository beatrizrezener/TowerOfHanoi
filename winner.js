goog.provide('towerofhanoi.verifyWinner');
goog.require('towerofhanoi.Game');


towerofhanoi.verifyWinner = function (towers, to_tower, n_disks) {
    if (towers[to_tower].length == n_disks && to_tower != 0) {
      var scene = new lime.Scene();

      var layer = new lime.Layer();

    var winner = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#4f96ed').setPosition(370,280).setAlign('center').setFontSize(50).setText("You win");

    var continue_play = new lime.Sprite()
      .setSize(200, 100)
      .setPosition(370, 360)
      .setFill('assets/play_again.png');

    var back_to_menu = new lime.Sprite()
      .setSize(200, 100)
      .setPosition(370, 560)
      .setFill('assets/back_to.png');

    var bg_gradient = new lime.fill.LinearGradient()
      .setDirection(0.5, 0, 0.5, 1)
      .addColorStop(0, '#F0F8FF')
      .addColorStop(1, '#8470FF');

    var background = new lime.Sprite()
      .setSize(800, 640)
      .setPosition(0, 0)
      .setAnchorPoint(0, 0)
      .setFill(bg_gradient);

    layer.appendChild(background);
    layer.appendChild(winner);
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
