import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('viewer', 'state', 'draw', 'controls', 'overlay')
    initialize(viewer, state, draw, controls, overlay, options) {
        this.viewer = viewer;
        this.overlay = overlay.initialize();

        this.controls = controls.initialize({
            imagePath: options.imagePath,
            controls: [
                { name: 'move', action: setState.bind(null, this, state, true) },
                { name: 'draw', action: setState.bind(null, this, draw, true) }
            ]
        }).activate('move');

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
