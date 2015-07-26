(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _draw = require('./draw');

var _draw2 = _interopRequireDefault(_draw);

var _move = require('./move');

var _move2 = _interopRequireDefault(_move);

var _controls = require('./controls');

var _controls2 = _interopRequireDefault(_controls);

var _overlay = require('./overlay');

var _overlay2 = _interopRequireDefault(_overlay);

exports['default'] = {

    initialize: function initialize(options) {
        OpenSeadragon.extend(this, {
            state: _move2['default'].initialize(),
            controls: _controls2['default'].initialize({
                imagePath: options.imagePath || ''
            })
        }, options);
        this.controls.addHandler('add', (function (button) {
            this.viewer.addControl(button.element, {
                anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
            });
        }).bind(this));
        return this;
    },

    onOpen: function onOpen() {
        this.overlay = _overlay2['default'].initialize({
            viewer: this.viewer
        });

        this.viewer.addHandler('animation', (function () {
            var width = this.overlay.el.clientWidth;
            var height = this.overlay.el.clientHeight;
            var viewPort = '0 0 ' + width + ' ' + height;
            var svg = this.overlay.el.querySelector('svg');
            svg.setAttribute('viewPort', viewPort);
        }).bind(this));

        this.controls.add('move', true).addHandler('click', (function () {
            this.viewer.setMouseNavEnabled(true);
            this.state = _move2['default'].initialize();
        }).bind(this));

        this.controls.add('draw').addHandler('click', (function () {
            this.viewer.setMouseNavEnabled(false);
            this.state = _draw2['default'].initialize();
        }).bind(this));

        this.overlay.el.addEventListener('mousedown', (function (e) {
            this.state.handleMouseDown(e, this.overlay);
        }).bind(this), false);

        this.overlay.el.addEventListener('mouseup', (function (e) {
            this.state.handleMouseUp(e, this.overlay);
        }).bind(this), false);

        return this;
    }

};
module.exports = exports['default'];

},{"./controls":2,"./draw":3,"./move":4,"./overlay":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    initialize: function initialize(options) {
        OpenSeadragon.extend(this, options);
        this.list = {};
        this.addHandler('click', this.onClick.bind(this));
        return this;
    },

    onClick: function onClick(name) {
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

    add: function add(name, active) {
        this.list[name] = new OpenSeadragon.Button({
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

    get: function get(name) {
        return this.list[name];
    }

});
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var draw = OpenSeadragon.extend(Object.create(_state2['default']), {

    initialize: function initialize(options) {
        OpenSeadragon.extend(this, options);
        this._mouseTracker = (function (e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        }).bind(this);
        return this;
    },

    handleMouseDown: function handleMouseDown(e, overlay) {
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
            path.setAttribute('d', 'M' + this.x / overlay.el.clientWidth * 100 + ' ' + this.y / overlay.el.clientHeight * 100);
            svg.appendChild(path);

            overlay.el.addEventListener('mousemove', this._mouseTracker, false);

            this._interval = window.setInterval((function () {
                path.setAttribute('d', path.getAttribute('d') + ' L' + this.x / overlay.el.clientWidth * 100 + ' ' + this.y / overlay.el.clientHeight * 100);
            }).bind(this), 25);
        }
        e.stopPropagation();
        return this;
    },

    handleMouseUp: function handleMouseUp(e, overlay) {
        overlay.el.removeEventListener('mousemove', this._mouseTracker);
        this._interval = clearInterval(this._interval);
        return this;
    }

});

exports['default'] = draw;
module.exports = exports['default'];

},{"./state":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

exports['default'] = Object.create(_state2['default']);
module.exports = exports['default'];

},{"./state":7}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _annotations = require('./annotations');

var _annotations2 = _interopRequireDefault(_annotations);

if (!OpenSeadragon) {
    throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
}

OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
    this.addHandler('open', _annotations2['default'].onOpen.bind(_annotations2['default']));
    this.annotations = this.annotations || _annotations2['default'].initialize(OpenSeadragon.extend({ viewer: this }, options));
    return this;
};

},{"./annotations":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {

    initialize: function initialize(options) {
        OpenSeadragon.extend(this, options);
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
        var width = this.viewer.viewport.homeBounds.width;
        var height = this.viewer.viewport.homeBounds.height;
        this.viewer.addOverlay(this.el, new OpenSeadragon.Rect(0, 0, width, height));
        return this;
    }

};
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = {

    initialize: function initialize(options) {
        OpenSeadragon.extend(this, options);
        return this;
    },

    handleMouseDown: function handleMouseDown() {
        return this;
    },

    handleMouseUp: function handleMouseUp() {
        return this;
    }

};
module.exports = exports["default"];

},{}]},{},[5]);
