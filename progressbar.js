goog.provide('towerofhanoi.ProgressBar');

goog.require('lime.RoundedRect');
goog.require('lime.animation.Resize');
goog.require('lime.fill.LinearGradient');

/**
 * Progressbar to show time left value
 */
towerofhanoi.ProgressBar = function() {
    lime.RoundedRect.call(this);

    var WIDTH = 320,
        HEIGHT = 50,
        RADIUS = 20,
        BORDER = 8;

    this.setSize(WIDTH, HEIGHT).setRadius(RADIUS).setAnchorPoint(0, .5);
    this.setFill(new lime.fill.LinearGradient().addColorStop(0, 0x15, 0x37, 0x62, .6).addColorStop(1, 0x1e, 0x57, 0x97, .4));

    WIDTH -= 2 * BORDER;
    HEIGHT -= 2 * BORDER;
    RADIUS = 12;

    // inner balue var
    var inner = new lime.RoundedRect().setRadius(RADIUS).setSize(WIDTH, HEIGHT).setFill('#F90').
        setAnchorPoint(0, .5).setPosition(8, 0);
    this.appendChild(inner);

    inner.setFill(new lime.fill.LinearGradient().addColorStop(0, '#8A2BE2').addColorStop(.49, '#9932CC').
        addColorStop(.5, '#9932CC').addColorStop(1, '#8470FF'));

    this.width = WIDTH;
    this.inner = inner;

};
goog.inherits(towerofhanoi.ProgressBar, lime.RoundedRect);

/**
 * Set current progress value
 */
towerofhanoi.ProgressBar.prototype.setProgress = function(value) {
    this.porgress_ = value;
    this.inner.runAction(new lime.animation.Resize(this.width * value, this.inner.getSize().height).setDuration(.4));
};

/**
 * Return current progress value
 */
towerofhanoi.ProgressBar.prototype.getProgress = function() {
    return this.progress_;
};
