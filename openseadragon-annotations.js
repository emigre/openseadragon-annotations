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

	};

})(OpenSeadragon, Raphael);
