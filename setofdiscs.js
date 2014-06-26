goog.provide('towerofhanoi.SetOfDiscs');
goog.require('towerofhanoi.Disc');

/**
 * SetOfDiscs.
 * Create a set of discs
 */
towerofhanoi.SetOfDiscs = function(layer, disc_count) {
    
    var MAX_WIDTH = 180,
        MIN_WIDTH = 70,
        HEIGHT = HEIGHT_OF_DISCS;    
    
    var width_step = (MAX_WIDTH - MIN_WIDTH) / (disc_count - 1);
    var x_step = width_step / 2;
    var width = MAX_WIDTH;
    var x = 107.5;
    var y = 530 - HEIGHT;
    this.discs = new Array();
    var colors = ['#FF0000', '#33ff33', '#0000FF', '#FF00FF', '#FFFF00', '#000000', '#00FFFF'];

    for (var i = 0; i < disc_count; ++i) {
        var disc = new towerofhanoi.Disc().setSize(width, HEIGHT).setPosition(x, y).setFill(colors[i]);
        this.discs.push(disc);
        layer.appendChild(disc);
        x = x + x_step;
        width = width - width_step;
        y = y - HEIGHT;
    }
};

towerofhanoi.SetOfDiscs.prototype.getDiscs = function() {
    return this.discs;
};
