import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('annotations')
    function initialize(annotations) {
        this.el = document.createElement('div');
        this.el.className = 'overlay';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('version', '1.1');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.cursor = 'default';
        this.el.appendChild(svg);
        var width = annotations.viewer.viewport.homeBounds.width;
        var height = annotations.viewer.viewport.homeBounds.height;
        annotations.viewer.addOverlay(this.el, new OpenSeadragon.Rect(0, 0, width, height));
        this.el.addEventListener('mousedown', annotations.onMouseDown.bind(annotations), false);
        this.el.addEventListener('mouseup', annotations.onMouseUp.bind(annotations), false);
        return this;
    },

    function adjust() {
        var width = this.el.clientWidth;
        var height = this.el.clientHeight;
        var svg = this.el.querySelector('svg');
        svg.setAttribute('viewPort', '0 0 ' + width + ' ' + height);
    }

};
