goog.provide('towerofhanoi.verifyWinner');

goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.Button');


towerofhanoi.verifyWinner = function(towers, to_tower, n_disks) {
    if (towers[to_tower].length == n_disks && to_tower != 0) {
        var scene = new lime.Scene();

        var layer = new lime.Layer();

        var winner = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#483D8B').setPosition(370, 280).setAlign('center').setFontSize(50).setText("You win");

        var continue_play = new towerofhanoi.Button("PLAY AGAIN")
                .setSize(200, 100)
                .setPosition(250, 360);

        var next_level = new towerofhanoi.Button("NEXT LEVEL")
                .setSize(200, 100)
                .setPosition(550, 360);

        var back_to_menu = new towerofhanoi.Button("Back to menu")
                .setSize(200, 100)
                .setPosition(370, 560);


        var maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
        scene.appendChild(maskSprite);

        layer.appendChild(winner);
        layer.appendChild(continue_play);
        layer.appendChild(back_to_menu);
        layer.appendChild(next_level);
        scene.appendChild(layer);

        this.director.replaceScene(scene);
        goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
            towerofhanoi.Game.playAgain(n_disks);
        });
        goog.events.listen(continue_play, ['mousedown', 'touchstart'], function(e) {
            if(n_disks === 7) {
                alert("This is the last level.");
            } else {
                towerofhanoi.Game.playAgain(n_disks+1);
            }
        });
        goog.events.listen(back_to_menu, ['mousedown', 'touchstart'], function(e) {
            towerofhanoi.loadMenu();
        });
    }
}
