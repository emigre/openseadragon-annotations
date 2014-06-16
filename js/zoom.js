

var zoom = {
	
	url: 'http://api.zoom.it/v1/content/hhcn',

	addEventListener: (function () {

		function addEventListener(el, eventName, handler) {
			el.addEventListener(eventName, handler);
		};

		function attachEvent(el, eventName, handler) {
			el.attachEvent('on' + eventName, function(){ 
				handler.call(el); 
			});
		};

		return document.addEventListener ? addEventListener : attachEvent;

	})(),

	removeClass: (function () {

		function classList(el, className) {
			el.classList.remove(className);
		} 

		function className(el, className) {
			var regExp = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
			el.className = el.className.replace(regExp, ' ');
		}

		return document.documentElement.classList ? classList : className;

	})(),

	addClass: (function () {

		function classList(el, className) {
			el.classList.add(className);
		} 

		function className(el, className) {
			el.className += ' ' + className;
		}

		return document.documentElement.classList ? classList : className;

	})(),

	JSONP: function (url) {
			var script_element = document.createElement('script');
			script_element.src = url || zoom.url + '?callback=zoom.parseData';
			document.getElementsByTagName('head')[0].appendChild(script_element);
	},

	parseData: function (response) {

		if (response.error) {
			console.log(response.error);
			return;
		}

		var content = response.content;
		
		if (content.ready) {
			zoom.viewer = new Seadragon.Viewer("viewer");
			zoom.viewer.addEventListener("open", zoom.addOverlays);
			zoom.viewer.openDzi(content.dzi);
		} else if (content.failed) {
			console.log(content.url + " failed to convert.");
		} else {
			console.log(content.url + " is " + Math.round(100 * content.progress) + "% done.");
		}

	},

	addOverlays: function () {

		zoom.viewer.setMouseNavEnabled(false);

		var myDiv = document.createElement("div"),
			myRect = new Seadragon.Rect(0, 0, 1, 1);

		myDiv.id = "myDrawings";
		myDiv.className = "overlay";
		
		zoom.viewer.drawer.addOverlay(myDiv, myRect);  
		// TODO adjust the width and height to the measures of the drawing
	  
		// TODO do something to eliminate the need to do this...
		setTimeout(function() {

			var myStrokeWidth = 1;
			
			var sketchpad = Raphael.sketchpad("myDrawings", {
				width: 6600,   
				height: 6600, 
				editing: true
			});
			sketchpad.pen().color("#f00");  
			sketchpad.pen().width(myStrokeWidth); 
			
			zoom.viewer.addEventListener("animation", function() { 

				var myZoom = zoom.viewer.viewport.getZoom(true);
				var myCanvas = sketchpad.paper();

				//myCanvas.setViewBox(0, 0, 6600/myZoom, 6600/myZoom, true);
				//myCanvas.setSize(myZoom*600, myZoom*600);

				sketchpad.pen().width(myZoom*myStrokeWidth);
			
				myCanvas.forEach(function (el) {
					el.transform("");
					el.scale(myZoom, myZoom, 0, 0);
					el.attr('stroke-width', myZoom*myStrokeWidth);
				});

				myCanvas.setSize(myZoom*600, myZoom*600);
					
			});
			
			var editorDraw = document.getElementById('editor_draw'),
				editorMove = document.getElementById('editor_move');

			zoom.addEventListener(editorDraw, 'click', function () {

				zoom.removeClass(editorDraw, 'disabled');
				zoom.addClass(editorDraw, 'selected');

				zoom.addClass(editorMove, 'disabled');
				zoom.removeClass(editorMove, 'selected');

				sketchpad.editing(true);
				zoom.viewer.setMouseNavEnabled(false);
			});

			zoom.addEventListener(editorMove, 'click', function () {

				zoom.removeClass(editorDraw, 'selected');
				zoom.addClass(editorDraw, 'disabled');

				zoom.addClass(editorMove, 'selected');
				zoom.removeClass(editorMove, 'disabled');

				sketchpad.editing("move");
				zoom.viewer.setMouseNavEnabled(true);

			});

		}, 500);

	},

	init: function (url) {

		var viewer = document.getElementById('viewer'),
			actions = document.querySelector('div.widget_actions');

		viewer.style.width = window.innerWidth + 'px';
		viewer.style.height = window.innerHeight + 'px';

		actions.style.left = Math.round(window.innerWidth / 2 - actions.offsetWidth / 2) + 'px';

		zoom.JSONP(url);

	}  

};

zoom.init();


