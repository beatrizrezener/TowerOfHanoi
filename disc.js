goog.provide('towerofhanoi.Disc');
goog.require('lime.RoundedRect');

/**
 * Disc element. 
 * @extends lime.RoundedRect
 */
towerofhanoi.Disc = function() {
    lime.RoundedRect.call(this);
    
    this.setAnchorPoint(0, 0);
    this.setRadius(10);
};
goog.inherits(towerofhanoi.Disc, lime.RoundedRect);