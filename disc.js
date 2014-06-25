/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

goog.provide('towerofhanoi.Disc');

/**
 * Game scene for Tower of Hanoi game.
 */
towerofhanoi.Disc = function(layer, disc_count) {
    lime.RoundedRect.call(this);
    
    var MAX_WIDTH = 180,
        MIN_WIDTH = 70,
        HEIGHT = HEIGHT_OF_DISCS;    
    
    var width_step = (MAX_WIDTH - MIN_WIDTH) / (disc_count - 1);
    var x_step = width_step / 2;
    var width = MAX_WIDTH;
    var x = 107.5;
    var y = 560 - HEIGHT;
    this.discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF', '#FFFF00', '#000000', '#00FFFF'];

    for (var i = 0; i < disc_count; ++i) {
        var disc = new lime.RoundedRect().setSize(width, HEIGHT).setPosition(x, y).setAnchorPoint(0, 0).setFill(colors[i]).setRadius(10);
        this.discs.push(disc);
        layer.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - HEIGHT;
    }
};
goog.inherits(towerofhanoi.Disc, lime.RoundedRect);

towerofhanoi.Disc.prototype.getDiscs = function() {
    return this.discs;
};