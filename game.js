goog.provide('towerofhanoi.Game');

/**
 * Game scene for Tower of Hanoi game.
 */
towerofhanoi.Game = function(qtyDiscs) {
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

    /* DISCS */

    var discsLeftTower = createDiscs(layer, qtyDiscs);
    var towers = new Array(3);
    towers[0] = discsLeftTower;
    towers[1] = new Array();
    towers[2] = new Array();

    function moveOnlyFromTop(origin_position, towers, from_tower) {
        this.getPosition().x === towers[0][towers[0].length - 1].getPosition().x
    }

    var listenDiscs = function(e) {
        var origin_position = this.getPosition();
        e.swallow(['touchmove', 'mousemove'], function(e) {
            this.setPosition(this.localToNode(e.position, layer));
        });

        e.swallow(['touchend', 'touchcancel', 'mouseup'], function() {
            if (jQuery.inArray(this, towers[0]) !== NO_SUCH_OBJECT) {
                if (parseInt(this.getPosition().x) > 220 && parseInt(this.getPosition().x) < 420) {
                    if (this.getPosition().x === towers[0][towers[0].length - 1].getPosition().x && verifyDiscSize(towers, 0, 1)) {
                        moveDisc(towers, 0, 1, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (parseInt(this.getPosition().x) > 430 && parseInt(this.getPosition().x) < 630) {
                    if (this.getPosition().x === towers[0][towers[0].length - 1].getPosition().x && verifyDiscSize(towers, 0, 2)) {
                        moveDisc(towers, 0, 2, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (this.getPosition().x === towers[0][towers[0].length - 1].getPosition().x && verifyDiscSize(towers, 0, 0)) {
                    moveDisc(towers, 0, 0, origin_position);
                }
                else {
                    e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                        var move = new lime.animation.MoveTo(origin_position);
                        this.runAction(move);
                    });
                }
            }
            else if (jQuery.inArray(this, towers[1]) !== NO_SUCH_OBJECT) {
                if (parseInt(this.getPosition().x) > -60 && parseInt(this.getPosition().x) < 200) {
                    if (this.getPosition().x === towers[1][towers[1].length - 1].getPosition().x && verifyDiscSize(towers, 1, 0)) {
                        moveDisc(towers, 1, 0, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (parseInt(this.getPosition().x) > 430 && parseInt(this.getPosition().x) < 630) {
                    if (this.getPosition().x === towers[1][towers[1].length - 1].getPosition().x && verifyDiscSize(towers, 1, 2)) {
                        moveDisc(towers, 1, 2, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (this.getPosition().x === towers[1][towers[1].length - 1].getPosition().x && verifyDiscSize(towers, 1, 1)) {
                    moveDisc(towers, 1, 1, origin_position);
                }
                else {
                    e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                        alert("entrou");
                        var move = new lime.animation.MoveTo(origin_position);
                        this.runAction(move);
                    });
                }

            }
            else if (jQuery.inArray(this, towers[2]) !== NO_SUCH_OBJECT) {
                if (parseInt(this.getPosition().x) > -60 && parseInt(this.getPosition().x) < 200) {
                    if (this.getPosition().x === towers[2][towers[2].length - 1].getPosition().x && verifyDiscSize(towers, 2, 0)) {
                        moveDisc(towers, 2, 0, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (parseInt(this.getPosition().x) > 220 && parseInt(this.getPosition().x) < 420) {
                    if (this.getPosition().x === towers[2][towers[2].length - 1].getPosition().x && verifyDiscSize(towers, 2, 1)) {
                        moveDisc(towers, 2, 1, origin_position);
                    }
                    else {
                        e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                            var move = new lime.animation.MoveTo(origin_position);
                            this.runAction(move);
                        });
                    }
                }
                else if (this.getPosition().x === towers[2][towers[2].length - 1].getPosition().x && verifyDiscSize(towers, 2, 2)) {
                    moveDisc(towers, 2, 2, origin_position);
                }
                else {
                    e.swallow(['touchend', 'touchcancel', 'mouseup'], function(e) {
                        var move = new lime.animation.MoveTo(origin_position);
                        this.runAction(move);
                    });
                }
            }
        });
        e.event.stopPropagation();
    };

    /* MAKING DISCS LISTENABLE */
    for (var c = 0; c < qtyDiscs; c++) {
        goog.events.listen(discsLeftTower[c], ['mousedown', 'touchstart'], listenDiscs);
    }

    /* PAUSE */
    var btn_pause = new lime.Sprite()
            .setSize(100, 100)
            .setPosition(675, 25)
            .setAnchorPoint(0, 0)
            .setFill('assets/pause.png');
    this.appendChild(btn_pause);

    goog.events.listen(btn_pause, ['mousedown', 'touchstart'], function(e) {
        towerofhanoi.director.setPaused(true);
        lime.updateDirtyObjects(); //acrescentei para resolver bug relatado em: https://groups.google.com/forum/?fromgroups=#!topic/limejs/pFxUh_VoFF8
    });

};
goog.inherits(towerofhanoi.Game, lime.Scene);

function createDiscs(layer, disc_count) {
    var max_width = 180;
    var min_width = 70;
    var width_step = (max_width - min_width) / (disc_count - 1);
    var x_step = width_step / 2;
    var height = HEIGHT_OF_DISCS;
    var width = max_width;
    var x = 107.5;
    var y = 560 - height;
    var discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF', '#FFFF00', '#000000', '#00FFFF'];

    for (var i = 0; i < disc_count; ++i) {
        var disc = new lime.RoundedRect().setSize(width, height).setPosition(x, y).setAnchorPoint(0, 0).setFill(colors[i]).setRadius(10);
        discs.push(disc);
        layer.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - height;
    }
    return discs;
}


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
