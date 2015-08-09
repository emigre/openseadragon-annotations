import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('viewer', 'state', 'draw', 'controls', 'overlay')
    initialize(viewer, state, draw, controls, overlay, options) {
        this.viewer = viewer;
        this.overlay = overlay.initialize();
        addOverlayToViewer(viewer, overlay);

        this.controls = controls.initialize({
            imagePath: options.imagePath,
            controls: [
                { name: 'move', action: setState.bind(null, this, state, true) },
                { name: 'draw', action: setState.bind(null, this, draw, true) }
            ]
        }).activate('move').all().forEach(addControlToViewer.bind(null, viewer));

        setState(this, state, true);
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

function addOverlayToViewer(viewer, overlay) {
    var width = viewer.viewport.homeBounds.width;
    var height = viewer.viewport.homeBounds.height;
    viewer.addOverlay(overlay.el, new OpenSeadragon.Rect(0, 0, width, height));
}