(function () {

    if (!window.OpenSeadragon) {
        throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
    }

    OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
        if (!this.annotations) {
            var self = this;
            var options = OpenSeadragon.extend({
                // defaults
            }, options || {});
            options.viewer = this;
            this.annotations = new OpenSeadragon.Annotations(options);
            this.addHandler('open', OpenSeadragon.delegate(self.annotations, self.annotations.addOverlays));
        }

    };

    OpenSeadragon.Annotations = function (options) {
        var options = options || {};
        this.viewer = options.viewer;
    };

    OpenSeadragon.Annotations.prototype.addOverlays = function () {
        var myDiv = document.createElement("div"),
            myRect = new OpenSeadragon.Rect(0, 0, 1, 1);
        myDiv.id = "annotations";
        myDiv.className = "overlay";
        this.viewer.addOverlay(myDiv, myRect);
        this.viewer.setMouseNavEnabled(false);
        // OpenSeadragon.requestAnimationFrame(function (){

            // var sketchpad = Raphael.sketchpad("annotations", {
            //  width: 6600,
            //  height: 6600,
            //  editing: true
            // });

            // sketchpad.pen().color("#f00");
            // sketchpad.pen().width(1);

        // });
    };

})();
