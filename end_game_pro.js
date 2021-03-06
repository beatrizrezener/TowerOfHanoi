goog.provide("towerofhanoi.end_game_pro");

towerofhanoi.end_game_pro = function(n_disks) {
    var scene = new lime.Scene();
    var layer = new lime.Layer();

    towerofhanoi.play_sound_lost();

    maskSprite = new lime.Sprite().setSize(800, 640).setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    layer.appendChild(maskSprite);

    var loose = new lime.Sprite()
            .setSize(512, 150)
            .setPosition(150, 100)
            .setAnchorPoint(0, 0)
            .setFill('assets/gameover.png');

    var continue_play = new towerofhanoi.Button("PLAY AGAIN")
            .setSize(200, 100)
            .setPosition(400, 400);

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

};
