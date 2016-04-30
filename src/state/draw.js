import OpenSeadragon from 'OpenSeadragon';

export default class Draw {

  constructor(overlay) {
    this.overlay = overlay;
  }

  initialize() {
    this._mouseTracker = function (e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }.bind(this);
    this._onMouseDown = function (e) {
      this.handleMouseDown(e.offsetX, e.offsetY);
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
