

var zoom = {

	// XMLHttpRequest can only load deep zoom images served from other servers if they have 'Access-Control-Allow-Origin' in their header set to '*' or to the server that served your JavaScript file. To ignore that limitations you could use JSONP, Flash or an iframe. Nevertheless, deep zoom images hosted in zoom.it allow cross-domain AJAX requests.
	url: 'http://static.seadragon.com/content/misc/blue-marble_files/', 

	// Disabled temporarily
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

	// Disabled temporarily
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

			editorDraw.addEventListener('click', function () {

				editorDraw.removeClass('disabled');
				editorDraw.addClass('selected');

				editorMove.addClass('disabled');
				editorMove.removeClass('selected');

				sketchpad.editing(true);
				zoom.viewer.setMouseNavEnabled(false);
			});

			editorMove.addEventListener('click', function () {

				editorDraw.removeClass('selected');
				editorDraw.addClass('disabled');

				editorMove.addClass('selected');
				editorMove.removeClass('disabled');

				sketchpad.editing("move");
				zoom.viewer.setMouseNavEnabled(true);

			});

		}, 500);

	},

	init: function () {

		var viewer = document.getElementById('viewer'),
			actions = document.querySelector('div.widget_actions');

		viewer.style.width = window.innerWidth + 'px';
		viewer.style.height = window.innerHeight + 'px';
		actions.style.left = Math.round(window.innerWidth / 2 - actions.offsetWidth / 2) + 'px';

		var viewer = OpenSeadragon({
			id: "viewer",
			tileSources: [{ 
				Image:  {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2009',
					Url: zoom.url,
					TileSize: '254', 
					Overlap: '1', 
					Format: 'jpg', 
					ServerFormat: 'Default',
					Size: { 
						Width: '86400',
						Height: '43200'
					}
				}
			}],
			prefixUrl: "img/"
		});

	}  

};

zoom.init();


