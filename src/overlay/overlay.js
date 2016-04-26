import OpenSeadragon from 'OpenSeadragon';
import { inject } from 'holy-grail';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    @inject('viewer')
    initialize(viewer) {
        this.el = createOverlay();
        this.svg = appendSVG(this.el);
        this.el.addEventListener('mousedown', this.raiseEvent.bind(this, 'mousedown'), false);
        this.el.addEventListener('mouseup', this.raiseEvent.bind(this, 'mouseup'), false);
        viewer.addOverlay(this.el, createOpenSeadragonRect(viewer));
        return this;
    },

    export() {
        var serializer = new XMLSerializer();
        var data = serializer.serializeToString(this.svg);
        return data;
    },

    import(data) {
        this.el.innerHTML = data;
        this.svg = this.el.firstChild;
    },

    reset() {
        this.el.innerHTML = '';
        this.svg = appendSVG(this.el);
    },

    startPath(x, y) {
        var path = createPath(x / this.el.clientWidth * 100, y / this.el.clientHeight * 100);
        this.svg.appendChild(path);
    },

    updatePath(x, y) {
        var x = x / this.el.clientWidth * 100;
        var y = y / this.el.clientHeight * 100;
        var path = this.svg.lastChild;
        path.setAttribute('d', path.getAttribute('d') + ' L' + x + ' ' + y);
    }

});

function createOverlay() {
    var div = document.createElement('div');
    div.className = 'overlay';
    return div;
}

function appendSVG(el) {
    var svg = createSVG();
    el.appendChild(svg);
    return svg;
}

function createPath(x, y) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'red');
    path.setAttribute('stroke-width', '0.5');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('d', 'M' + x + ' ' + y);
    return path;
}

function createSVG() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.cursor = 'default';
    return svg;
}

function createOpenSeadragonRect(viewer) {
    var width = viewer.viewport.homeBounds.width;
    var height = viewer.viewport.homeBounds.height;
    return new OpenSeadragon.Rect(0, 0, width, height);
}
