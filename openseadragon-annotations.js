(function ($) {

    if (!$) { throw new Error('OpenSeadragon Annotations requires OpenSeadragon'); }

    $.Viewer.prototype.initializeAnnotations = function (options) {
        var options = $.extend({ viewer: this }, options);
        return this.annotations = this.annotations || annotations.initialize(options);
    };

    var MODES = { MOVE: 0, DRAW: 1 };

    var annotations = {

        initialize: function (options) {
            $.extend(annotations, options);
            this.viewer.addHandler('open', $.delegate(this, this.addOverlays));
        },

        viewer: null,

        imagePath: 'bower_components/OpenSeadragonAnnotations/img/',

        mode: MODES.MOVE,

        action: null,

        controls: [],

        addOverlays: function () {
            var width = this.viewer.viewport.homeBounds.width;
            var height = this.viewer.viewport.homeBounds.height;
            var rect = new $.Rect(0, 0, width, height);
            this.el = new Overlay('annotations');
            this.svg = new Svg();
            this.el.appendChild(this.svg);
            this.viewer.addOverlay(this.el, rect);

            this.addNewControl({
                tooltip: 'Move',
                srcRest: this.imagePath + 'move_rest.png',
                srcGroup: this.imagePath + 'move_grouphover.png',
                srcHover: this.imagePath + 'move_hover.png',
                srcDown: this.imagePath + 'move_pressed.png',
                onClick: this.setMoveMode.bind(this)
            });

            this.addNewControl({
                tooltip: 'Draw',
                srcRest: this.imagePath + 'draw_rest.png',
                srcGroup: this.imagePath + 'draw_grouphover.png',
                srcHover: this.imagePath + 'draw_hover.png',
                srcDown: this.imagePath + 'draw_pressed.png',
                onClick: this.setDrawingMode.bind(this)
            });

            this.viewer.addHandler('animation', this.refresh.bind(this));
            this.viewer.addHandler('open', this.refresh.bind(this));
        },


        addNewControl: function (options) {
            var btn = new $.Button(options);
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
                anchor: $.ControlAnchor.BOTTOM_LEFT
            });
        },

        setDrawingMode: function () {
            this.viewer.setMouseNavEnabled(false);
            this.mode = this.MODES.DRAW;
            this.action = function (e) {
                var x = e.offsetX / this.el.clientWidth;
                var y = e.offsetY / this.el.clientHeight;
                this.addCircle(x, y);
            }.bind(this);
            this.svg.addEventListener('click', this.action, false);
        },

        setMoveMode: function () {
            this.viewer.setMouseNavEnabled(true);
            this.mode = this.MODES.MOVE;
            this.svg.removeEventListener('click', this.action, false);
        },

        add: function (element) {
            this.svg.appendChild(element);
            this.refresh();
        },

        addCircle: function (x, y) {
            this.svg.appendChild(new Circle(x, y));
            this.refresh();
        },

        refresh: function () {
            var viewPort = '0 0 ' + this.el.clientWidth + ' ' + this.el.clientHeight;
            this.svg.setAttribute('viewPort', viewPort);
        }

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

})(OpenSeadragon);
