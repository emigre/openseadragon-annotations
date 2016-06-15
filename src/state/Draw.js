import OpenSeadragon from 'OpenSeadragon';

export default class Draw {

  constructor(overlay) {
    this.overlay = overlay;
  }

  initialize() {
    this._mouseTracker = function (e) {
      var offsetX = e.clientX - this.rect.left,
					offsetY = e.clientY - this.rect.top;
      console.log("mousetracker rect"+this.rect.left+","+this.rect.top+" offset:"+offsetX+","+offsetY);
      this.x = offsetX;
      this.y = offsetY;
    }.bind(this);
    this._onMouseDown = function (e) {
      var target = e.target || e.srcElement;
			this.rect = target.getBoundingClientRect();
			var	offsetX = e.clientX - this.rect.left,
			    offsetY = e.clientY - this.rect.top;
      this.handleMouseDown(offsetX,offsetY);
      e.stopPropagation();
    }.bind(this);
    this._onMouseUp = function () {
      this.handleMouseUp();
    }.bind(this);
    this.overlay.addHandler('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp, false);
    return this;
  }

  close() {
    this.overlay.removeHandler('mousedown', this._onMouseDown);
    window.removeEventListener('mouseup', this._onMouseUp, false);
  }

  handleMouseDown(x, y) {
    if (!this._interval) {
      this.x = x;
      this.y = y;
      this.overlay.startPath(this.x, this.y);
      this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
      this._interval = window.setInterval(function () {
        this.overlay.updatePath(this.x, this.y);
      }.bind(this), 25);
    }
    return this;
  }

  handleMouseUp() {
    this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
    this._interval = clearInterval(this._interval);
    return this;
  }

}
