import OpenSeadragon from 'OpenSeadragon';
import state from './state';

export default OpenSeadragon.extend(Object.create(state), {

    function initialize(options) {
        OpenSeadragon.extend(this, options);
        this._mouseTracker = function (e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        }.bind(this);
        return this;
    },

    function handleMouseDown(e, overlay) {
        if (!this._interval) {
            this.x = e.offsetX;
            this.y = e.offsetY;
            var svg = overlay.el.querySelector('svg');
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'red');
            path.setAttribute('stroke-width', '0.5');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('d', 'M' + this.x / overlay.el.clientWidth * 100 +
                ' ' + this.y / overlay.el.clientHeight * 100);
            svg.appendChild(path);

            overlay.el.addEventListener('mousemove', this._mouseTracker, false);

            this._interval = window.setInterval(function () {
                path.setAttribute('d', path.getAttribute('d') +
                    ' L' + this.x / overlay.el.clientWidth * 100 +
                    ' ' + this.y / overlay.el.clientHeight * 100);
            }.bind(this), 25);
        }
        e.stopPropagation();
        return this;
    },

    function handleMouseUp(e, overlay) {
        overlay.el.removeEventListener('mousemove', this._mouseTracker);
        this._interval = clearInterval(this._interval);
        return this;
    }

});
