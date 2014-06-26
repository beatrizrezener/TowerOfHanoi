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

    var instructions = new lime.Sprite().setSize(600,300).setPosition(100,170).setAnchorPoint(0,0).setFill('assets/instructions2.png');
    layer.appendChild(instructions);    
    
    var btn_play = new lime.Sprite().setSize(75,75).setPosition(689,29).setAnchorPoint(0,0).setFill('assets/play.png');
    layer.appendChild(btn_play);
    
    goog.events.listen(btn_play, ['mousedown', 'touchstart'], function(e){
        towerofhanoi.play();
    });
    
    this.appendChild(layer);
    
};
goog.inherits(towerofhanoi.PauseScene, lime.Scene);
