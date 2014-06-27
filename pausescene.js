goog.provide('towerofhanoi.PauseScene');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

/**
 * PauseScene. This scene appears when director is paused.
 * @constructor
 * @extends lime.Scene
 */
towerofhanoi.PauseScene = function() {
    lime.Scene.call(this);
    var layer = new lime.Layer();
    
    this.domElement.style.cssText = 'background:rgba(255,255,255,.8)';

    var label = new lime.Label().setText('PAUSE').setPosition(400,50).setFontColor('#B6767F').setFontSize(50);
    layer.appendChild(label);

    var instructions = new lime.Sprite().setSize(600,300).setPosition(100,170).setAnchorPoint(0,0).setFill('assets/instructions.png');
    layer.appendChild(instructions);    
    
    var btn_play = new towerofhanoi.Button("RESUME GAME").setSize(220,50).setPosition(585,500).setAnchorPoint(0,0);
    layer.appendChild(btn_play);
    
    var btn_backtomenu = new towerofhanoi.Button("BACK TO MENU").setSize(220,50).setPosition(215,500);
    layer.appendChild(btn_backtomenu);

    goog.events.listen(btn_backtomenu, ['mousedown', 'touchstart'], function(e){
        towerofhanoi.play();
        towerofhanoi.Game.resetMoviments();
        towerofhanoi.loadMenu();
    });
    
    
    goog.events.listen(btn_play, ['mousedown', 'touchstart'], function(e){
        towerofhanoi.play();
    });
    
    this.appendChild(layer);
    
};
goog.inherits(towerofhanoi.PauseScene, lime.Scene);
