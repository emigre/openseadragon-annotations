import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('viewer', 'state', 'draw', 'controls', 'overlay')
    initialize(viewer, state, draw, controls, overlay, options) {
        var imagePath = 'bower_components/openseadragon-annotations/img/';
        var options = OpenSeadragon.extend({ imagePath: imagePath }, options);
        this.viewer = viewer;
        this.state = Object.create(state).initialize();
        this.controls = Object.create(controls).initialize({ imagePath: options.imagePath })
        this.overlay = Object.create(overlay).initialize();
        this.controls.add('move', true).add('draw');
        this.controls.get('move').addHandler('click', this.setState.bind(this, state, true));
        this.controls.get('draw').addHandler('click', this.setState.bind(this, draw, true));
        this.viewer.addHandler('animation', this.overlay.adjust.bind(this.overlay));
        return this;
    },

    setState(state, navigationEnabled) {
        this.viewer.setMouseNavEnabled(navigationEnabled);
        this.state = Object.create(state).initialize();
    },

    addControl(button) {
        this.viewer.addControl(button.element, {
            anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
        });
    },

    onMouseDown(e) {
        this.state.handleMouseDown(e, this.overlay);
    },

    onMouseUp(e) {
        this.state.handleMouseUp(e, this.overlay);
    },

    import() {
        // TODO
    },

    export() {
        // TODO
    }

};
