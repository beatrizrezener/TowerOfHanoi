var POSITION_OF_FIRST_DISC = 520;
var HEIGHT_OF_DISCS = 40;
var DISTANCE_BETWEEN_TOWERS = 200;


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
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.FadeTo');
goog.require('lime.transitions.SlideInRight');
goog.require('lime.transitions.Dissolve');

// entrypoint
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
    var discsLeftTower = createDiscs(scene1, disc_count=4);
    var towers = new Array(3);
    towers[0] = discsLeftTower;
    towers[1] = new Array();
    towers[2] = new Array();
    
    goog.events.listen(leftTower,['mousedown','touchstart'],function(){
        
        goog.events.listen(rightTower,['mousedown','touchstart'],function(){
            moveDisc(towers, 0, 2);
        });
        
        goog.events.listen(middleTower,['mousedown','touchstart'],function(e){
            moveDisc(towers, 0, 1);
        });
        
    });  

    goog.events.listen(rightTower,['mousedown','touchstart'],function(e){
        
        goog.events.listen(leftTower,['mousedown','touchstart'],function(e){
            moveDisc(towers, 2, 0);
        });
        
        goog.events.listen(middleTower,['mousedown','touchstart'],function(e){
            moveDisc(towers, 2, 1);
        });
        
    }); 

    goog.events.listen(middleTower,['mousedown','touchstart'],function(e){
        
        goog.events.listen(rightTower,['mousedown','touchstart'],function(e){
            moveDisc(towers, 1, 2);
        });
        
        goog.events.listen(leftTower,['mousedown','touchstart'],function(e){
            moveDisc(towers, 1, 0);
        });
        
    });       

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
//    var height     = 360/disc_count;
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

function verifyDiscSize(towers,from_tower,to_tower){

  if(towers[to_tower].length == 0){
    alert("vazia");
    return true;
    }
  else{
 var top_disc_size = towers[from_tower].pop();
 var top_disc_size2 = towers[to_tower].pop();
 if(top_disc_size.getSize().width < top_disc_size2.getSize().width){
   alert("valido");
   alert("size do disco menor: " + top_disc_size.getSize());
   alert("size do disco maior : " + top_disc_size2.getSize());
   towers[from_tower].push(top_disc_size);
   towers[to_tower].push(top_disc_size2);
   return true;
  }
 else{
   alert("Invalido");
   alert("size do disco menor: " + top_disc_size2.getSize());
   alert("size do disco maior : " + top_disc_size.getSize());
   alert("Maior");
   towers[from_tower].push(top_disc_size);
   towers[to_tower].push(top_disc_size2);
   return false;
   }
}
return;
}

function moveDisc(towers, from_tower, to_tower){
  if (verifyDiscSize(towers,from_tower,to_tower) == true){
    var from_top_disc = towers[from_tower].pop();
    var x_move = (to_tower - from_tower) * DISTANCE_BETWEEN_TOWERS;
    var old_position = from_top_disc.getPosition();
    var new_position_x = (parseInt(old_position.x) + x_move); 
    var new_position_y = (POSITION_OF_FIRST_DISC  - (towers[to_tower].length * HEIGHT_OF_DISCS));
    towers[to_tower].push(from_top_disc);
    var disc_movement = new lime.animation
            .MoveTo(new_position_x, new_position_y)
            .setDuration(1);
    from_top_disc.runAction(disc_movement);
    return;
  }
}
