import OpenSeadragon from 'OpenSeadragon';
import state from './state';
import inject from '../context/inject';

export default OpenSeadragon.extend(Object.create(state), {

    @inject('overlay')
    initialize(overlay) {
        this.overlay = overlay;
        this._mouseTracker = function (e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        }.bind(this);

        overlay.addHandler('mousedown', function (e) {
            this.handleMouseDown(e.offsetX, e.offsetY);
            e.stopPropagation();
        }.bind(this));

        window.addEventListener('mouseup', function () {
            this.handleMouseUp();
        }.bind(this), false);


        return this;
    },

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
    },

    handleMouseUp() {
        this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
        this._interval = clearInterval(this._interval);
        return this;
    }

});
