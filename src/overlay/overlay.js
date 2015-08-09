import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    initialize() {
        var options = options || {};
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
        this.el.addEventListener('mousedown', this.raiseEvent.bind(this, 'mousedown'), false);
        this.el.addEventListener('mouseup', this.raiseEvent.bind(this, 'mouseup'), false);
        return this;
    }

});
