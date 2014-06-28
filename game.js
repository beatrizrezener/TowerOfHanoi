goog.provide('towerofhanoi.Game');
goog.require('_winner');
goog.require('towerofhanoi.SetOfDiscs');
goog.require('towerofhanoi.movementSound');
goog.require('towerofhanoi.music_sound');
goog.require('towerofhanoi.ProgressBar');
goog.require('towerofhanoi.end_game_pro');

var cont_moviments = 0;
var t = 300;
act_value = 0;
/**
 * Game scene for Tower of Hanoi game.
 */

var disks = 0;
towerofhanoi.Game = function(qtyDiscs, maxTime) {
    lime.Scene.call(this);
    
    maxTime ? this.maxTime = maxTime: this.maxTime = 0;
    this.curTime = maxTime;
    
    disks = qtyDiscs;

    this.cont_moviments = 0;

    var layer = new lime.Layer();

    var plataform = new lime.Polygon()
            .setPosition(100, 530)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.jpg')
            .addPoints(-30, 30, 0, 0, 600, 0, 630, 30, -30, 30);

    /* BASES */
    var leftTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(190, 135)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var middleTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(390, 135)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);
    var rightTower = new lime.RoundedRect()
            .setSize(15, 400)
            .setPosition(590, 135)
            .setAnchorPoint(0, 0)
            .setFill('assets/metal.png')
            .setRadius(50);

    //add elements in the scene
    layer.appendChild(leftTower);
    layer.appendChild(middleTower);
    layer.appendChild(rightTower);
    layer.appendChild(plataform);
    this.appendChild(layer);

    /* PAUSE */
    var btn_pause = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(720, 20)
            .setAnchorPoint(0, 0)
            .setFill('assets/pause.png');
    layer.appendChild(btn_pause);

    goog.events.listen(btn_pause, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.pause();
    });
    
    // Replay button
    var btn_replay = new lime.Sprite()
            .setSize(65, 65)
            .setPosition(365, 570)
            .setAnchorPoint(0, 0)
            .setFill('assets/replay.png');
    layer.appendChild(btn_replay);
    goog.events.listen(btn_replay, ['mousedown', 'touchstart'], function(e) {
        if (confirm("Restart the game?")) {
            towerofhanoi.Game.playAgain(qtyDiscs, maxTime);
        }
    });

    // Menu button
    this.btn_menu = new towerofhanoi.Button('Menu').setSize(100, 50).setPosition(140, 600);
    goog.events.listen(this.btn_menu, 'click', function() {
        towerofhanoi.loadMenu();
        towerofhanoi.Game.resetMoviments();
        towerofhanoi.play_sound_initial();
    });
    this.appendChild(this.btn_menu);

    // Rules button
    this.btn_rules = new towerofhanoi.Button('Rules').setSize(100, 50).setPosition(660, 600);
    this.appendChild(this.btn_rules);

    var rules = new lime.Layer();
    var contents = new lime.RoundedRect().setRadius(30).setFill('#fff').setSize(700, 425).setPosition(400, 350);
    rules.appendChild(contents);

    var btn_closerules = new towerofhanoi.Button('x').setSize(50, 50).setPosition(715, 130);
    rules.appendChild(btn_closerules);
    
    var title = new lime.Label().setFontSize(22).setSize(560, 100).setPosition(0, -120).setAlign('center').setFontFamily('Segoe Print');
    title.setText('Tower of Hanoi - Rules');
    contents.appendChild(title);
    var purpose = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, -50).setAlign('left').setFontFamily('Segoe Print');
    purpose.setText('The purpose is to transfer all the disks from one tower to the other, so that each movement is done only with a disc, never having a larger disk on a smaller disk.');
    contents.appendChild(purpose);
    var txt1 = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, 40).setAlign('left').setFontFamily('Segoe Print');
    txt1.setText('1. A larger disk can not be placed on a smaller disk;');
    contents.appendChild(txt1);
    var txt2 = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, 90).setAlign('left').setFontFamily('Segoe Print');
    txt2.setText('2. You can move only one disk at a time;');
    contents.appendChild(txt2);
    var txt3 = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, 140).setAlign('left').setFontFamily('Segoe Print');
    txt3.setText('3. A disc must always be one of the three rods or moving.');
    contents.appendChild(txt3);
    var txt4 = new lime.Label().setFontSize(18).setSize(560, 100).setPosition(0, 190).setAlign('left').setFontFamily('Segoe Print');
    txt4.setText('4. It is not allowed to move a disk that is below another.');
    contents.appendChild(txt4);    
      
    var current_screen = this;
    goog.events.listen(this.btn_rules, 'mousedown', function() {
        current_screen.appendChild(rules);
        goog.events.listen(btn_closerules, 'mousedown', function() {
            current_screen.removeChild(rules);
        });
    });

    // label for moviments message
    var moviments_lbl = new lime.Label()
            .setFontFamily('Trebuchet MS')
            .setFontColor('#D8BFD8')
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
    this.valid = true;

    
    // Timed Mode
    if (towerofhanoi.usemode === towerofhanoi.Mode.TIMED) {
        
        this.time_lbl = new lime.Label().setFontFamily('Trebuchet MS').setFontColor('#D8BFD8')
            .setFontSize(24).setPosition(680, 22).setText('Time left:').setAnchorPoint(1, 0)
            .setFontWeight(700).setSize(300, 30).setAlign('right');
        layer.appendChild(this.time_lbl);

        // time left progressbar
        this.time_left = new towerofhanoi.ProgressBar().setPosition(356, 90);
        layer.appendChild(this.time_left);

        //decrease time on every second
        if(this.valid == true){
        lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);
        }
     }
    

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
            towerofhanoi.movementSound(0);
            incrementMoviments(moviments, list_tower[0], list_tower[1]);
        }
        else {
            e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                var move = new lime.animation.MoveTo(origin_position);
                disck_to_move.runAction(move);
                towerofhanoi.movementSound(1);
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


/**
 * Subtract one second from left time in timed mode
 */


towerofhanoi.Game.prototype.decreaseTime = function() {
    this.curTime--;
    this.time_left.setProgress(this.curTime / this.maxTime);
    this.dataProgress(this.curTime/this.maxTime);
    //this.act_time = this.curTime / this.maxTime;
    if (this.curTime < 1) {
    //Time is over. end game;
    this.curTime = 50000000;
    towerofhanoi.end_game_pro(disks);
};
}

towerofhanoi.Game.prototype.dataProgress = function(value){
  act_value = value;
  return this.act_value;
};

towerofhanoi.Game.prototype.getMaxTime = function() {
    return this.maxTime;
}

function incrementMoviments(moviments, from_tower, to_tower) {
    if (from_tower !== to_tower) {
        cont_moviments += 1;
    }
    moviments.setText(cont_moviments);

};

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
    var obj = new _winner();
    classic_mode_args = {towers:towers,to_tower:to_tower,disks:disks,cont_moviments:cont_moviments};
    pro_mode_args = {towers:towers,to_tower:to_tower,disks:disks,cont_moviments:cont_moviments,act_time:act_value};

    if(towerofhanoi.usemode === towerofhanoi.Mode.CLASSIC) {
        obj.verifyWinner(classic_mode_args);
    } 
    else {
      obj.verifyWinner(pro_mode_args);
    }
}

towerofhanoi.Game.playAgain = function(qtyDiscs, maxTime) {
    towerofhanoi.Game.resetMoviments();
    towerofhanoi.newGame(qtyDiscs, maxTime);
};

towerofhanoi.Game.resetMoviments  = function(qtyDiscs) {
    cont_moviments = 0;
};
