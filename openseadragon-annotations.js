(function () {

    if (!window.OpenSeadragon) {
        throw new Error('OpenSeadragon Annotations requires OpenSeadragon');
    }

    var Annotations = function (options) {
        var options = options || {};
        this.viewer = options.viewer;
    };

    Annotations.prototype.addOverlays = function () {
        console.log('opening overlays');
        var myDiv = document.createElement("div"),
            myRect = new OpenSeadragon.Rect(0, 0, 1, 1);
        myDiv.id = "annotations";
        myDiv.className = "overlay";
        console.log(this);
        this.viewer.addOverlay(myDiv, myRect);
        this.viewer.setMouseNavEnabled(false);
    };

    OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
        if (!(this.hasOwnProperty('annotations') && this.annotations instanceof Annotations)) {
            var options = OpenSeadragon.extend({ viewer: this }, options || {});
            this.annotations = new Annotations(options);
            this.addHandler('open', OpenSeadragon.delegate(this.annotations, this.annotations.addOverlays));
        }
        return this.annotations;
    };

})();
