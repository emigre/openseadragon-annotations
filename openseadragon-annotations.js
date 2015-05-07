(function (window) {

    if (!window.OpenSeadragon) {
        throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
    }

    var Annotations = function (options) {
        var options = options || {};
        this.viewer = options.viewer;
    };

    Annotations.prototype.addOverlays = function () {
        var width = this.viewer.viewport.homeBounds.width;
        var height = this.viewer.viewport.homeBounds.height;
        var rect = new OpenSeadragon.Rect(0, 0, width, height);
        //this.viewer.setMouseNavEnabled(false);
        this.el = new Overlay('annotations');
        this.svg = new Svg();
        this.el.appendChild(this.svg);
        this.viewer.addOverlay(this.el, rect);

        this.svg.addEventListener('click', function (e) {
            var x = e.offsetX / this.el.clientWidth;
            var y = e.offsetY / this.el.clientHeight;
            this.addCircle(x, y)
        }.bind(this), false);

        this.viewer.addHandler('animation', this.refresh.bind(this));
        this.viewer.addHandler('open', this.refresh.bind(this));
    };

    Annotations.prototype.add = function (element) {
        this.svg.appendChild(element);
        this.refresh();
    };

    Annotations.prototype.addCircle = function (x, y) {
        this.svg.appendChild(new Circle(x, y));
        this.refresh();
    };

    Annotations.prototype.refresh = function () {
        var viewPort = '0 0 ' + this.el.clientWidth + ' ' + this.el.clientHeight;
        this.svg.setAttribute('viewPort', viewPort);
    };

    window.OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
        if (!(this.hasOwnProperty('annotations') && this.annotations instanceof Annotations)) {
            var options = OpenSeadragon.extend({ viewer: this }, options || {});
            this.annotations = new Annotations(options);
            this.addHandler('open', OpenSeadragon.delegate(this.annotations, this.annotations.addOverlays));
        }
        return this.annotations;
    };

    function Overlay(id) {
        var overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'overlay';
        return overlay;
    }

    function Svg() {
        var svgns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgns, 'svg');
        svg.setAttribute('version', '1.1');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        return svg;
    }

    function Circle(x, y) {
        var svgns = 'http://www.w3.org/2000/svg';
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttribute('class', 'circle');
        circle.setAttribute('cx', (x * 100) + '%');
        circle.setAttribute('cy', (y * 100) + '%');
        circle.setAttribute('r', '5%');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', 'red');
        circle.setAttribute('stroke-width', '2');
        return circle;
    }

})(window);
