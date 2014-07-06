(function (oS) {
	
    oS.Viewer.prototype.initializeAnnotations = function (options) {
	
		var options = oS.extend({
			// defaults
		}, options || {});
	
		this.annotations = new oS.Annotations(options);

	};

	oS.Annotations = function () {
	
	};
	
	oS.Annotations.prototype.parseData = function (response) {

		if (response.error) {
			console.log(response.error);
			return;
		}

		var content = response.content;
		
		if (content.ready) {
			zoom.viewer = new Seadragon.Viewer("viewer");
			oS.addEvent(zoom.viewer, 'open', zoom.addOverlays);
			zoom.viewer.openDzi(content.dzi);
		} else if (content.failed) {
			console.log(content.url + " failed to convert.");
		} else {
			console.log(content.url + " is " + Math.round(100 * content.progress) + "% done.");
		}
};

	oS.Annotations.prototype.addOverlays = function () {

		console.log('add Overlays called');	
		/*
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
			
			oS.addEvent(zoom.viewer, 'animation', function() { 

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

		oS.addEvent(editorDraw, 'click', function () {

			oS.removeClass(editorDraw, 'disabled');
			oS.addClass(editorDraw, 'selected');

			oS.addClass(editorMove, 'disabled');
			oS.removeClass(editorMove, 'selected');

				sketchpad.editing(true);
				zoom.viewer.setMouseNavEnabled(false);
			});

			oS.addEvent(editorMove, 'click', function () {

				oS.removeClass(editorDraw, 'selected');
				oS.addClass(editorDraw, 'disabled');

				oS.addClass(editorMove, 'selected');
				oS.removeClass(editorMove, 'disabled');

				sketchpad.editing("move");
				zoom.viewer.setMouseNavEnabled(true);

			});

		}, 500);
*/
	};

})(OpenSeadragon);
