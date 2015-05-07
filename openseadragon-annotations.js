(function (window) {

    if (!window.OpenSeadragon) {
        throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
    }

    var Modes = {
        MOVE: 0,
        DRAW: 1
    };

    var Annotations = function (options) {
        var options = options || {};
        this.viewer = options.viewer;
        this.mode = Modes.MOVE;
        this.action = null;
        this.controls = [];
    };

    Annotations.prototype.addOverlays = function () {
        var width = this.viewer.viewport.homeBounds.width;
        var height = this.viewer.viewport.homeBounds.height;
        var rect = new OpenSeadragon.Rect(0, 0, width, height);
        this.el = new Overlay('annotations');
        this.svg = new Svg();
        this.el.appendChild(this.svg);
        this.viewer.addOverlay(this.el, rect);
        this.addNewControls();
        this.viewer.addHandler('animation', this.refresh.bind(this));
        this.viewer.addHandler('open', this.refresh.bind(this));
    };

    Annotations.prototype.addNewControls = function () {
        this.addNewControl({
            tooltip: 'Move',
            srcRest: '/OpenSeadragonAnnotations/img/move_rest.png',
            srcGroup: '/OpenSeadragonAnnotations/img/move_grouphover.png',
            srcHover: '/OpenSeadragonAnnotations/img/move_hover.png',
            srcDown: '/OpenSeadragonAnnotations/img/move_pressed.png',
            onClick: this.setMoveMode.bind(this)
        });
        this.addNewControl({
            tooltip: 'Draw',
            srcRest: '/OpenSeadragonAnnotations/img/draw_rest.png',
            srcGroup: '/OpenSeadragonAnnotations/img/draw_grouphover.png',
            srcHover: '/OpenSeadragonAnnotations/img/draw_hover.png',
            srcDown: '/OpenSeadragonAnnotations/img/draw_pressed.png',
            onClick: this.setDrawingMode.bind(this)
        });
    };

    Annotations.prototype.addNewControl = function (options) {
        var btn = new OpenSeadragon.Button(options);
        this.controls.push(btn);
        btn.addHandler('click', function () {
            for (var i = 0; i < this.controls.length; i++) {
                if (this.controls[i] === btn) {
                    this.controls[i].imgDown.style.visibility = 'visible';
                    this.controls[i].imgRest.style.visibility = 'hidden';
                } else {
                    this.controls[i].imgDown.style.visibility = 'hidden';
                    this.controls[i].imgRest.style.visibility = 'visible';
                }
            }
        }.bind(this));
        this.viewer.addControl(btn.element, {
            anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
        });
    };

    Annotations.prototype.setDrawingMode = function () {
        this.viewer.setMouseNavEnabled(false);
        this.mode = Modes.DRAW;
        this.action = function (e) {
            var x = e.offsetX / this.el.clientWidth;
            var y = e.offsetY / this.el.clientHeight;
            this.addCircle(x, y);
        }.bind(this);
        this.svg.addEventListener('click', this.action, false);
    };

    Annotations.prototype.setMoveMode = function () {
        this.viewer.setMouseNavEnabled(true);
        this.mode = Modes.MOVE;
        this.svg.removeEventListener('click', this.action, false);
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
