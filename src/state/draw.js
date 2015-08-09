import OpenSeadragon from 'OpenSeadragon';
import state from './state';

export default OpenSeadragon.extend(Object.create(state), {

    initialize() {
        this._mouseTracker = function (e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        }.bind(this);
        return this;
    },

    handleMouseDown(overlay, e) {
        if (!this._interval) {
            this.x = e.offsetX;
            this.y = e.offsetY;
            overlay.startPath(this.x, this.y);
            overlay.el.addEventListener('mousemove', this._mouseTracker, false);
            this._interval = window.setInterval(function () {
                overlay.updatePath(this.x, this.y);
            }.bind(this), 25);
        }
        e.stopPropagation();
        return this;
    },

    handleMouseUp(overlay, e) {
        overlay.el.removeEventListener('mousemove', this._mouseTracker);
        this._interval = clearInterval(this._interval);
        return this;
    }

});
