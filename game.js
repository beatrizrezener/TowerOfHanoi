goog.provide('towerofhanoi.Game');
goog.require('towerofhanoi.verifyWinner');
goog.require('towerofhanoi.SetOfDiscs');

var cont_moviments = 0;
/**
 * Game scene for Tower of Hanoi game.
 */

var disks = 0;
towerofhanoi.Game = function(qtyDiscs) {
    disks  = qtyDiscs;

  lime.Scene.call(this);

  var layer = new lime.Layer();

  var bg_gradient = new lime.fill.LinearGradient()
    .setDirection(0.5, 0, 0.5, 1)
    .addColorStop(0, '#F0F8FF')
    .addColorStop(1, '#8470FF');

  var background = new lime.Sprite()
    .setSize(800, 640)
    .setPosition(0, 0)
    .setAnchorPoint(0, 0)
    .setFill(bg_gradient);

  var plataform = new lime.Polygon()
    .setPosition(100, 560)
    .setAnchorPoint(0, 0)
    .setFill('assets/metal.jpg')
    .addPoints(-30, 30, 0, 0, 600, 0, 630, 30, -30, 30);

    /* BASES */
    var leftTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(190, 165)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var middleTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(390, 165)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var rightTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(590, 165)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);

    //add elements in the scene
    layer.appendChild(background);
    layer.appendChild(leftTower);
    layer.appendChild(middleTower);
    layer.appendChild(rightTower);
    layer.appendChild(plataform);
    this.appendChild(layer);

    /* PAUSE */
    var btn_pause = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(675, 25)
            .setAnchorPoint(0, 0)
            .setFill('assets/pause.png');
    layer.appendChild(btn_pause);

    goog.events.listen(btn_pause, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.pause();
    });
    
    /* REPLAY */
    var btn_replay = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(600, 35)
            .setAnchorPoint(0, 0)
            .setFill('assets/replay.png');
    layer.appendChild(btn_replay);
    goog.events.listen(btn_replay, ['mousedown', 'touchstart'], function(e) {
        if(confirm("Restart the game?")){towerofhanoi.Game.playAgain(qtyDiscs);}
    });
    /* BACK */
    var btn_back = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(1, 575)
            .setAnchorPoint(0, 0)
            .setFill('assets/back.png');
    layer.appendChild(btn_back);
    goog.events.listen(btn_back, ['mousedown', 'touchstart'], function(e) {
        if(confirm("Back to menu page?")){towerofhanoi.loadMenu(); cont_moviments = 0;} 
    });
    
    // label for moviments message
    var moviments_lbl = new lime.Label()
            .setFontFamily('Trebuchet MS')
            .setFontColor('#4f96ed')
            .setFontSize(24)
            .setPosition(30, 22)
            .setText('Moviments:')
            .setAnchorPoint(0, 0)
            .setFontWeight(700);
    layer.appendChild(moviments_lbl);

    // moviments message label
    var moviments = new lime.Label()
            .setFontColor('#fff')
            .setFontSize(92)
            .setText(0)
            .setPosition(30, 40)
            .setAnchorPoint(0, 0)
            .setFontWeight(700);
    layer.appendChild(moviments);

    /* DISCS */
    var setofdiscs = new towerofhanoi.SetOfDiscs(layer, qtyDiscs);
    var discsLeftTower = setofdiscs.getDiscs();

    var towers = new Array(3);
    towers[0] = discsLeftTower;
    towers[1] = new Array();
    towers[2] = new Array();

    /* validation methods */

    function checkTowerPositToMoveDisk(actual_disk, actual_tower) {
        var list_tower = [];
        if (parseInt(actual_disk.getPosition().x) > 220 && parseInt(actual_disk.getPosition().x) < 420) {
            list_tower = [actual_tower, 1, actual_disk.getSize().width];
            return list_tower;
        }
        else if (parseInt(actual_disk.getPosition().x) > 430 && parseInt(actual_disk.getPosition().x) < 630) {
            list_tower = [actual_tower, 2, actual_disk.getSize().width];
            return list_tower;
        }
        else if (parseInt(actual_disk.getPosition().x) > -60 && parseInt(actual_disk.getPosition().x) < 200) {
            list_tower = [actual_tower, 0, actual_disk.getSize().width];
            return list_tower;
        }
        return [actual_tower, 0, actual_disck.getSize().width];  
    }
     function moveOnlyFromTop(towers, list_tower, disck_to_move, origin_position, e) {
        disk_of_top = towers[list_tower[0]][towers[list_tower[0]].length - 1];
        var disk_to_move_size = list_tower[2];
        if (parseInt(disk_to_move_size) == parseInt(disk_of_top.getSize().width) && verifyDiscSize(towers, list_tower[0], list_tower[1])) {
            moveDisc(towers, list_tower[0], list_tower[1], origin_position);
            incrementMoviments(moviments, list_tower[0], list_tower[1]);        }
        else {
            e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                var move = new lime.animation.MoveTo(origin_position);
                disck_to_move.runAction(move);
            });
        }
    }

    var listenDiscs = function(e) {
        var origin_position = this.getPosition();
        e.swallow(['touchmove', 'mousemove'], function(e) {
            this.setPosition(this.localToNode(e.position, layer));
        });

        e.swallow(['touchend', 'touchcancel', 'mouseup'], function() {

            if (jQuery.inArray(this, towers[0]) !== NO_SUCH_OBJECT) {
                var list = [];
                list = checkTowerPositToMoveDisk(this, 0);
                moveOnlyFromTop(towers, list, this, origin_position, e);
            }
            else if (jQuery.inArray(this, towers[1]) !== NO_SUCH_OBJECT) {
                var list = [];
                list = checkTowerPositToMoveDisk(this, 1);
                moveOnlyFromTop(towers, list, this, origin_position, e);

            }
            else if (jQuery.inArray(this, towers[2]) !== NO_SUCH_OBJECT) {
                var list = [];
                list = checkTowerPositToMoveDisk(this, 2);
                moveOnlyFromTop(towers, list, this, origin_position, e);
            }
        });
        e.event.stopPropagation();
    };

    /* MAKING DISCS LISTENABLE */
    for (var c = 0; c < qtyDiscs; c++) {
        goog.events.listen(discsLeftTower[c], ['mousedown', 'touchstart'], listenDiscs);
    }

};
goog.inherits(towerofhanoi.Game, lime.Scene);

function incrementMoviments(moviments, from_tower, to_tower) {
    if(from_tower !== to_tower){
        cont_moviments += 1;
    }
    moviments.setText(cont_moviments);

}
;

function verifyDiscSize(towers, from_tower, to_tower) {
    if (towers[to_tower].length === 0) {
        return true;
    } else if (from_tower === to_tower) {
        return true;
    } else {
        var top_disc_size = towers[from_tower].pop();
        var top_disc_size2 = towers[to_tower].pop();
        if (top_disc_size.getSize().width < top_disc_size2.getSize().width) {
            towers[from_tower].push(top_disc_size);
            towers[to_tower].push(top_disc_size2);
            return true;
        }
        else {
            towers[from_tower].push(top_disc_size);
            towers[to_tower].push(top_disc_size2);
            return false;
        }
    }
    return;
}


function moveDisc(towers, from_tower, to_tower, old_position) {
    var from_top_disc = towers[from_tower].pop();
    var x_move = (to_tower - from_tower) * DISTANCE_BETWEEN_TOWERS;
    var new_position_x = (parseInt(old_position.x) + x_move);
    var new_position_y = (POSITION_OF_FIRST_DISC - (towers[to_tower].length * HEIGHT_OF_DISCS));
    towers[to_tower].push(from_top_disc);
    var disc_movement = new lime.animation
            .MoveTo(new_position_x, new_position_y)
            .setDuration(1);
    from_top_disc.runAction(disc_movement);
    towerofhanoi.verifyWinner(towers, to_tower,disks);
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

towerofhanoi.Game.playAgain = function(qtyDiscs) {
     cont_moviments = 0;
     towerofhanoi.newGame(qtyDiscs);
}
