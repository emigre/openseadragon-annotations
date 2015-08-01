(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("OpenSeadragon"));
	else if(typeof define === 'function' && define.amd)
		define(["OpenSeadragon"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("OpenSeadragon")) : factory(root["OpenSeadragon"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************************!*\
  !*** ./src/openseadragon-annotations.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _annotations = __webpack_require__(/*! ./annotations */ 2);
	
	var _annotations2 = _interopRequireDefault(_annotations);
	
	if (!_OpenSeadragon2['default']) {
	    throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
	}
	
	exports['default'] = _OpenSeadragon2['default'].Viewer.prototype.initializeAnnotations = function (options) {
	    this.annotations = this.annotations || _annotations2['default'].initialize(_OpenSeadragon2['default'].extend({ viewer: this }, options));
	    return this;
	};
	
	module.exports = exports['default'];

/***/ },
/* 1 */
/*!********************************!*\
  !*** external "OpenSeadragon" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/*!****************************!*\
  !*** ./src/annotations.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _state = __webpack_require__(/*! ./state */ 3);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _draw = __webpack_require__(/*! ./draw */ 4);
	
	var _draw2 = _interopRequireDefault(_draw);
	
	var _controls = __webpack_require__(/*! ./controls */ 5);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _overlay = __webpack_require__(/*! ./overlay */ 6);
	
	var _overlay2 = _interopRequireDefault(_overlay);
	
	exports['default'] = {
	
	    initialize: function initialize(options) {
	        _OpenSeadragon2['default'].extend(this, {
	            state: _state2['default'].initialize(),
	            controls: _controls2['default'].initialize({
	                imagePath: options.imagePath || ''
	            }),
	            overlay: _overlay2['default'].initialize({
	                viewer: options.viewer
	            })
	        }, options);
	
	        this.controls.addHandler('add', (function (button) {
	            this.viewer.addControl(button.element, {
	                anchor: _OpenSeadragon2['default'].ControlAnchor.BOTTOM_LEFT
	            });
	        }).bind(this));
	        this.controls.add('move', true).addHandler('click', (function () {
	            this.viewer.setMouseNavEnabled(true);
	            this.state = _state2['default'].initialize();
	        }).bind(this));
	        this.controls.add('draw').addHandler('click', (function () {
	            this.viewer.setMouseNavEnabled(false);
	            this.state = _draw2['default'].initialize();
	        }).bind(this));
	
	        this.viewer.addHandler('animation', (function () {
	            var width = this.overlay.el.clientWidth;
	            var height = this.overlay.el.clientHeight;
	            var viewPort = '0 0 ' + width + ' ' + height;
	            var svg = this.overlay.el.querySelector('svg');
	            svg.setAttribute('viewPort', viewPort);
	        }).bind(this));
	        this.overlay.el.addEventListener('mousedown', (function (e) {
	            this.state.handleMouseDown(e, this.overlay);
	        }).bind(this), false);
	        this.overlay.el.addEventListener('mouseup', (function (e) {
	            this.state.handleMouseUp(e, this.overlay);
	        }).bind(this), false);
	        return this;
	    },
	
	    'import': function _import() {
	        // TODO
	    },
	
	    'export': function _export() {
	        // TODO
	    }
	
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	exports["default"] = {
	
	    initialize: function initialize(options) {
	        _OpenSeadragon2["default"].extend(this, options);
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

/***/ },
/* 4 */
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _state = __webpack_require__(/*! ./state */ 3);
	
	var _state2 = _interopRequireDefault(_state);
	
	var draw = _OpenSeadragon2['default'].extend(Object.create(_state2['default']), {
	
	    initialize: function initialize(options) {
	        _OpenSeadragon2['default'].extend(this, options);
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

/***/ },
/* 5 */
/*!*************************!*\
  !*** ./src/controls.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	exports['default'] = _OpenSeadragon2['default'].extend(new _OpenSeadragon2['default'].EventSource(), {
	
	    initialize: function initialize(options) {
	        _OpenSeadragon2['default'].extend(this, options);
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
	        this.list[name] = new _OpenSeadragon2['default'].Button({
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

/***/ },
/* 6 */
/*!************************!*\
  !*** ./src/overlay.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	exports['default'] = {
	
	    initialize: function initialize(options) {
	        _OpenSeadragon2['default'].extend(this, options);
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
	        this.viewer.addOverlay(this.el, new _OpenSeadragon2['default'].Rect(0, 0, width, height));
	        return this;
	    }
	
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=openseadragon-annotations.js.map