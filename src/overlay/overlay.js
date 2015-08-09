import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    initialize() {
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
        this.svg = svg;
        this.el.addEventListener('mousedown', this.raiseEvent.bind(this, 'mousedown'), false);
        this.el.addEventListener('mouseup', this.raiseEvent.bind(this, 'mouseup'), false);
        return this;
    },

    startPath(x, y) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var x = x / this.el.clientWidth * 100;
        var y = y / this.el.clientHeight * 100;
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'red');
        path.setAttribute('stroke-width', '0.5');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('d', 'M' + x + ' ' + y);
        this.svg.appendChild(path);
    },

    updatePath(x, y) {
        var x = x / this.el.clientWidth * 100;
        var y = y / this.el.clientHeight * 100;
        var path = this.svg.lastChild;
        path.setAttribute('d', path.getAttribute('d') + ' L' + x + ' ' + y);
    }

});
