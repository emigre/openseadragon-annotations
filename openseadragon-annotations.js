(function (OSD, Raphael) {

	if (!OSD) {
        throw new Error('OpenSeadragonAnnotations requires OpenSeadragon');
    }

	if (!Raphael) {
        throw new Error('OpenSeadragonScalebar requires Raphael');
    }

	OSD.Viewer.prototype.initializeAnnotations = function (options) {

		if (!this.annotations) {

			var self = this;

			var options = OSD.extend({
				// defaults
			}, options || {});

			options.viewer = this;

			this.annotations = new OSD.Annotations(options);

			this.addHandler('open', OSD.delegate(self.annotations, self.annotations.addOverlays));

		}

	};

	OSD.Annotations = function (options) {

		var options = options || {};

		this.viewer = options.viewer;

	};

	OSD.Annotations.prototype.addOverlays = function () {

		var myDiv = document.createElement("div"),
			myRect = new OSD.Rect(0, 0, 1, 1);

		myDiv.id = "annotations";
		myDiv.className = "overlay";

		this.viewer.addOverlay(myDiv, myRect);
		this.viewer.setMouseNavEnabled(false);

		OSD.requestAnimationFrame(function (){

			var sketchpad = Raphael.sketchpad("annotations", {
				width: 6600,
				height: 6600,
				editing: true
			});

			sketchpad.pen().color("#f00");
			sketchpad.pen().width(1);

		});

/*
		OSD.addEvent(self._viewer, 'animation', function() {

			var myZoom = self._viewer.viewport.getZoom(true);
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

		var editorDraw = document.getElementById('editor_draw'),
			editorMove = document.getElementById('editor_move');

		OSD.addEvent(editorDraw, 'click', function () {

			OSD.removeClass(editorDraw, 'disabled');
			OSD.addClass(editorDraw, 'selected');

			OSD.addClass(editorMove, 'disabled');
			OSD.removeClass(editorMove, 'selected');

				sketchpad.editing(true);
				self._viewer.setMouseNavEnabled(false);
			});

			OSD.addEvent(editorMove, 'click', function () {

				OSD.removeClass(editorDraw, 'selected');
				OSD.addClass(editorDraw, 'disabled');

				OSD.addClass(editorMove, 'selected');
				OSD.removeClass(editorMove, 'disabled');

				sketchpad.editing("move");
				self._viewer.setMouseNavEnabled(true);

			});

		}, 500);
*/
	};

})(OpenSeadragon, Raphael);
