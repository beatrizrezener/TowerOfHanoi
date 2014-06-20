goog.provide('lime.helper.PauseScene');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

// OBS: Substitua o arquivo do caminho 'lime\src\helper\pausescene.js' por este.

/**
 * 
 * 
 * PauseScene. This scene appears when director is paused.
 * @constructor
 * @extends lime.Scene
 */
lime.helper.PauseScene = function() {
    lime.Scene.call(this);

    this.domElement.style.cssText = 'background:rgba(255,255,255,.8)';

    var label = new lime.Label().setText('PAUSE').setPosition(400,300).setFontColor('#B6767F').setFontSize(50);
    this.appendChild(label);
    
    var btn_play = new lime.Sprite().setSize(75,75).setPosition(689,29).setAnchorPoint(0,0).setFill('assets/play.png');
    this.appendChild(btn_play);
    
    goog.events.listen(btn_play, ['mousedown', 'touchstart'], function(e){
        this.getDirector().setPaused(false); //play
    });
    
};
goog.inherits(lime.helper.PauseScene, lime.Scene);
