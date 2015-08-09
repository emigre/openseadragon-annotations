import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('viewer', 'state', 'draw', 'controls', 'overlay')
    initialize(viewer, state, draw, controls, overlay, options) {
        var imagePath = 'bower_components/openseadragon-annotations/img/';
        var options = OpenSeadragon.extend({ imagePath: imagePath }, options);
        this.viewer = viewer;
        this.state = Object.create(state).initialize();

        this.overlay = Object.create(overlay).initialize();
        var width = this.viewer.viewport.homeBounds.width;
        var height = this.viewer.viewport.homeBounds.height;
        this.viewer.addOverlay(this.overlay.el, new OpenSeadragon.Rect(0, 0, width, height));
        this.overlay.addHandler('mousedown', function (e) {
            this.state.handleMouseDown(e, this.overlay);
        }.bind(this));
        this.overlay.addHandler('mouseup', function (e) {
            this.state.handleMouseUp(e, this.overlay)
        }.bind(this));

        this.controls = Object.create(controls).initialize({
            imagePath: options.imagePath,
            controls: [
                { name: 'move', action: setState.bind(null, this, state, true) },
                { name: 'draw', action: setState.bind(null, this, draw, true) }
            ]
        }).activate('move').all().forEach(addControlToViewer.bind(null, this.viewer));
        return this;
    },

    import() {
        // TODO
    },

    export() {
        // TODO
    }

};

function setState(annotations, state, navigationEnabled) {
    annotations.viewer.setMouseNavEnabled(navigationEnabled);
    annotations.state = Object.create(state).initialize();
}

function addControlToViewer(viewer, control) {
    viewer.addControl(control.element, {
        anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
    });
}