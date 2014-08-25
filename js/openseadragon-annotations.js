
(function(OSD) {
	
	OSD.Annotations = function(options) {
	
		var options = OSD.extend({
			// defaults
		}, options || {});
	
	};

	OSD.Annotations.prototype.parseData = function (response) {

		if (response.error) {
			console.log(response.error);
			return;
		}

		var content = response.content;
		
		if (content.ready) {
			zoom.viewer = new Seadragon.Viewer("viewer");
			OSD.addEvent(zoom.viewer, 'open', zoom.addOverlays);
			zoom.viewer.openDzi(content.dzi);
		} else if (content.failed) {
			console.log(content.url + " failed to convert.");
		} else {
			console.log(content.url + " is " + Math.round(100 * content.progress) + "% done.");
		}

	};

	OSD.Annotations.prototype.addOverlays = function () {

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
			
			OSD.addEvent(zoom.viewer, 'animation', function() { 

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

			OSD.addEvent(editorDraw, 'click', function () {

				OSD.removeClass(editorDraw, 'disabled');
				OSD.addClass(editorDraw, 'selected');

				OSD.addClass(editorMove, 'disabled');
				OSD.removeClass(editorMove, 'selected');

				sketchpad.editing(true);
				zoom.viewer.setMouseNavEnabled(false);
			});

			OSD.addEvent(editorMove, 'click', function () {

				OSD.removeClass(editorDraw, 'selected');
				OSD.addClass(editorDraw, 'disabled');

				OSD.addClass(editorMove, 'selected');
				OSD.removeClass(editorMove, 'disabled');

				sketchpad.editing("move");
				zoom.viewer.setMouseNavEnabled(true);

			});

		}, 500);

	};

})(OpenSeadragon);