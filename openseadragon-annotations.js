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
                controls: controls.initialize({
                    imagePath: options.imagePath || ''
                })
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

            this.controls.add('move', true).addHandler('click', function () {
                this.viewer.setMouseNavEnabled(true);
                this.state = move.initialize();
            }.bind(this));

            this.controls.add('draw').addHandler('click', function () {
                this.viewer.setMouseNavEnabled(false);
                this.state = draw.initialize();
            }.bind(this));

            this.overlay.el.addEventListener('mousedown', function (e) {
                this.state.handleMouseDown(e, this.overlay);
            }.bind(this), false);

            this.overlay.el.addEventListener('mouseup', function (e) {
                this.state.handleMouseUp(e, this.overlay);
            }.bind(this), false);

            return this;
        }

    };

    var state = {

        initialize: function (options) {
            $.extend(this, options);
            return this;
        },

        handleMouseDown: function () {
            return this;
        },

        handleMouseUp: function () {
            return this;
        }

    }

    var move = Object.create(state);

    var draw = $.extend(Object.create(state), {

        handleMouseDown: function (e, overlay) {
            var x = e.offsetX;
            var y = e.offsetY;
            var svg = overlay.el.querySelector('svg');
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'red');
            path.setAttribute('stroke-width', '0.5');
            path.setAttribute('d', 'M' + x / overlay.el.clientWidth * 100 +
                ' ' + y / overlay.el.clientHeight * 100);
            svg.appendChild(path);

            this._mouseTracker = function (e) {
                x = e.offsetX;
                y = e.offsetY;
            };

            overlay.el.addEventListener('mousemove', this._mouseTracker, false);

            this._interval = window.setInterval(function () {
                path.setAttribute('d', path.getAttribute('d') +
                    ' L' + x / overlay.el.clientWidth * 100 +
                    ' ' + y / overlay.el.clientHeight * 100);
            }.bind(this), 25);

            e.stopPropagation();
            return this;
        },

        handleMouseUp: function (e, overlay) {
            overlay.el.removeEventListener('mousemove', this._mouseTracker);
            clearInterval(this._interval);
            return this;
        }

    });

    var controls = $.extend(new $.EventSource(), {

        initialize: function (options) {
            $.extend(this, options);
            this.list = {};
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

        add: function (name, active) {
            this.list[name] = new $.Button({
                tooltip: name[0].toUpperCase() + name.substr(1),
                srcRest: this.imagePath + name + '_rest.png',
                srcGroup: this.imagePath + name + '_grouphover.png',
                srcHover: this.imagePath + name + '_hover.png',
                srcDown: this.imagePath + name + '_pressed.png',
                onClick: this.raiseEvent.bind(this, 'click', name)
            });
            if (active) {
                this.list[name].imgDown.style.visibility = 'visible';
            }
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
            svg.setAttribute('viewBox', '0 0 100 100')
            svg.style.cursor = 'default';
            this.el.appendChild(svg);
            var width = this.viewer.viewport.homeBounds.width;
            var height = this.viewer.viewport.homeBounds.height;
            this.viewer.addOverlay(this.el, new $.Rect(0, 0, width, height));
            return this;
        }

    };

})(OpenSeadragon);
