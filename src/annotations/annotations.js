import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default {

    @inject('state', 'draw', 'controls', 'overlay')
    initialize(state, draw, controls, overlay, options) {
        this.overlay = overlay.initialize();
        this.state = Object.create(state).initialize();
        this.controls = controls.initialize({
            imagePath: options.imagePath,
            controls: [
                { name: 'move', action: setState.bind(null, this, state) },
                { name: 'draw', action: setState.bind(null, this, draw) }
            ]
        }).activate('move');
        return this;
    },

    import(data) {
        this.overlay.import(data);
    },

    export() {
        return this.overlay.export();
    },

    reset() {
        return this.overlay.reset();
    }


};

function setState(annotations, state) {
    if (annotations.state) { annotations.state.close(); }
    annotations.state = Object.create(state).initialize();
}
