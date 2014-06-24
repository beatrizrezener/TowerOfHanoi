var POSITION_OF_FIRST_DISC = 520;
var HEIGHT_OF_DISCS = 40;
var DISTANCE_BETWEEN_TOWERS = 200;
var NO_SUCH_OBJECT = -1;

//set main namespace
goog.provide('towerofhanoi');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('lime.fill.LinearGradient'); //Classe inclu�da para criar o gradiente do c�u
goog.require('lime.Polygon');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.ScaleTo');

towerofhanoi.start = function() {

    var director = new lime.Director(document.body, 800, 640);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);

    var scene1 = new lime.Scene();

    var bg_gradient = new lime.fill.LinearGradient()
            .setDirection(0.5, 0, 0.5, 1)
            .addColorStop(0, '#F0F8FF')
            .addColorStop(1, '#8470FF');
    
    var background = new lime.Sprite()
            .setSize(800,640)
            .setPosition(0,0)
            .setAnchorPoint(0,0)
            .setFill(bg_gradient);
    
    var plataform = new lime.Polygon()
            .setPosition(100,560)
            .setAnchorPoint(0,0)
            .setFill('assets/metal.jpg')
            .addPoints(-30,30,0,0, 600,0, 630,30,-30,30);
    
    /* BASES */
    var leftTower = new lime.RoundedRect()
            .setSize(15,400)
            .setPosition(190,165)
            .setAnchorPoint(0,0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var middleTower = new lime.RoundedRect()
            .setSize(15,400)
            .setPosition(390,165)
            .setAnchorPoint(0,0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var rightTower = new lime.RoundedRect()
            .setSize(15,400)
            .setPosition(590,165)
            .setAnchorPoint(0,0)
            .setFill('assets/metal.png')
            .setRadius(50);
      
    //add elements in the scene
    scene1.appendChild(background);
    scene1.appendChild(leftTower);
    scene1.appendChild(middleTower);
    scene1.appendChild(rightTower);
    scene1.appendChild(plataform);
    
    /* DISCS */
    var qty_discs = 1; //É necessário capturar esse valor quando o jogador escolher o nível!!
    
    var discsLeftTower = createDiscs(scene1, qty_discs);
    var towers = new Array(3);
    towers[0] = discsLeftTower;
    towers[1] = new Array();
    towers[2] = new Array();
    
    var game = function(e) {
        var origin_position = this.getPosition();
        
        e.swallow(['touchmove', 'mousemove'], function(e) {
            this.setPosition(this.localToNode(e.position, scene1));
        });
        
        e.swallow(['touchend', 'touchcancel', 'mouseup'], function() {
            alert(this.getPosition().x);
            if(jQuery.inArray(this, towers[0]) !== NO_SUCH_OBJECT){
                if(parseInt(this.getPosition().x) > 220 && parseInt(this.getPosition().x) < 420){
                    moveDisc(towers, 0, 1, origin_position);
                } else if(parseInt(this.getPosition().x) > 430 && parseInt(this.getPosition().x) < 630){
                    moveDisc(towers, 0, 2, origin_position);
                } else {
                    moveDisc(towers, 0, 0, origin_position);
                }
            } else if(jQuery.inArray(this, towers[1]) !== NO_SUCH_OBJECT){
                if(parseInt(this.getPosition().x) > -60 && parseInt(this.getPosition().x) < 200){
                    moveDisc(towers, 1, 0, origin_position);
                } else if(parseInt(this.getPosition().x) > 430 && parseInt(this.getPosition().x) < 630){
                    moveDisc(towers, 1, 2, origin_position);
                } else {
                    moveDisc(towers, 1, 1, origin_position);
                }
            } else if(jQuery.inArray(this, towers[2]) !== NO_SUCH_OBJECT){
                if(parseInt(this.getPosition().x) > -60 && parseInt(this.getPosition().x) < 200){
                    moveDisc(towers, 2, 0, origin_position);
                } else if(parseInt(this.getPosition().x) > 220 && parseInt(this.getPosition().x) < 420){
                    moveDisc(towers, 2, 1, origin_position);
                } else {
                    moveDisc(towers, 2, 2, origin_position);
                }
            };
        });
        e.event.stopPropagation();
    };
    
    /* MAKING DISCS LISTENABLE */
    for(var c = 0; c < qty_discs; c++){
       goog.events.listen(discsLeftTower[c], ['mousedown', 'touchstart'], game);
    }
    
    /* PAUSE */
    var btn_pause = new lime.Sprite()
            .setSize(100,100)
            .setPosition(675,25)
            .setAnchorPoint(0,0)
            .setFill('assets/pause.png');
    scene1.appendChild(btn_pause);
    
    goog.events.listen(btn_pause, ['mousedown', 'touchstart'], function(e){
        director.setPaused(true);
        lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
    });
    
    // set current scene active
    director.replaceScene(scene1);
};

function createDiscs(scene, disc_count){
    var max_width  = 180;
    var min_width  = 70;
    var width_step = (max_width - min_width)/(disc_count - 1);
    var x_step     = width_step/2;
    var height     = HEIGHT_OF_DISCS;
    var width      = max_width;
    var x          = 107.5;
    var y          = 560 - height;
    var discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF','#FFFF00', '#000000', '#00FFFF'];
    
    for (var i = 0; i < disc_count; ++i) {
        var disc = new lime.RoundedRect().setSize(width,height).setPosition(x,y).setAnchorPoint(0,0).setFill(colors[i]).setRadius(10);
        discs.push(disc);
        scene.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - height;
    }
    return discs;
}

function moveDisc(towers, from_tower, to_tower, old_position){
    var from_top_disc = towers[from_tower].pop();
    var x_move = (to_tower - from_tower) * DISTANCE_BETWEEN_TOWERS;
    var new_position_x = (parseInt(old_position.x) + x_move); 
    var new_position_y = (POSITION_OF_FIRST_DISC  - (towers[to_tower].length * HEIGHT_OF_DISCS));
    towers[to_tower].push(from_top_disc);
    var disc_movement = new lime.animation
            .MoveTo(new_position_x, new_position_y)
            .setDuration(1);
    from_top_disc.runAction(disc_movement);
}