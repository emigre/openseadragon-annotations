(function ($) {

    if (!$) { throw new Error('OpenSeadragon Annotations requires OpenSeadragon'); }

    $.Viewer.prototype.initializeAnnotations = function (options) {
        var options = $.extend({ viewer: this }, options);
        this.addHandler('open', annotations.onOpen.bind(annotations));
        return this.annotations = this.annotations || annotations.initialize(options);
    };

    var annotations = {

        initialize: function (options) {
            $.extend(this, {
                state: move.initialize(),
                controls: controls.initialize()
            }, options);
            this.controls.addHandler('add', function (button) {
                this.viewer.addControl(button.element, {
                    anchor: $.ControlAnchor.BOTTOM_LEFT
                });
            }.bind(this));
            return this;
        },

        onOpen: function () {
            this.overlay = overlay.initialize({
                viewer: this.viewer
            });

            this.viewer.addHandler('animation', function () {
                var width = this.overlay.el.clientWidth;
                var height = this.overlay.el.clientHeight;
                var viewPort = '0 0 ' + width + ' ' + height;
                var svg = this.overlay.el.querySelector('svg');
                svg.setAttribute('viewPort', viewPort);
            }.bind(this));

            this.controls.add('move').addHandler('click', function () {
                this.viewer.setMouseNavEnabled(true);
                this.state = move.initialize();
            }.bind(this));

            this.controls.add('draw').addHandler('click', function () {
                this.viewer.setMouseNavEnabled(false);
                this.state = draw.initialize();
            }.bind(this));

            this.overlay.el.addEventListener('click', function (e) {
                this.state.handle(e.offsetX, e.offsetY, this.overlay);
            }.bind(this), false);
            return this;
        }

    };

    var state = {

        initialize: function (options) {
            $.extend(this, options);
            return this;
        },

        handle: function () {
            return this;
        }

    }

    var move = Object.create(state);

    var draw = $.extend(Object.create(state), {

        handle: function (offsetX, offsetY, overlay) {
            var svg = overlay.el.querySelector('svg');
            var x = offsetX / overlay.el.clientWidth;
            var y = offsetY / overlay.el.clientHeight;
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('class', 'circle');
            circle.setAttribute('cx', (x * 100) + '%');
            circle.setAttribute('cy', (y * 100) + '%');
            circle.setAttribute('r', '5%');
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke', 'red');
            circle.setAttribute('stroke-width', '2');
            svg.appendChild(circle);
            return this;
        }

    });

    var controls = $.extend(new $.EventSource(), {

        imagePath: 'bower_components/OpenSeadragonAnnotations/img/',

        list: {},

        initialize: function (options) {
            $.extend(this, options);
            this.addHandler('click', this.onClick.bind(this));
            return this;
        },

        onClick: function (name) {
            for (var button in this.list) {
                if (this.list.hasOwnProperty(button)) {
                    if (button === name) {
                        this.list[button].imgDown.style.visibility = 'visible';
                    } else {
                        this.list[button].imgDown.style.visibility = 'hidden';
                    }
                }
            }
            return this;
        },

        add: function (name) {
            this.list[name] = new $.Button({
                tooltip: name[0].toUpperCase() + name.substr(1),
                srcRest: this.imagePath + name + '_rest.png',
                srcGroup: this.imagePath + name + '_grouphover.png',
                srcHover: this.imagePath + name + '_hover.png',
                srcDown: this.imagePath + name + '_pressed.png',
                onClick: this.raiseEvent.bind(this, 'click', name)
            });
            this.raiseEvent('add', this.list[name]);
            return this.list[name];
        },

        get: function (name) {
            return this.list[name];
        }

    });

    var overlay = {

        initialize: function (options) {
            $.extend(this, options);
            this.el = document.createElement('div');
            this.el.className = 'overlay';
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('version', '1.1');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('preserveAspectRatio', 'none');
            this.el.appendChild(svg);
            var width = this.viewer.viewport.homeBounds.width;
            var height = this.viewer.viewport.homeBounds.height;
            this.viewer.addOverlay(this.el, new $.Rect(0, 0, width, height));
            return this;
        }

    };

})(OpenSeadragon);
