import OpenSeadragon from 'OpenSeadragon';
import context from './context/context';
import annotations from './annotations/annotations';
import state from './state/state';
import draw from './state/draw';
import controls from './controls/controls';
import overlay from './overlay/overlay';

export default OpenSeadragon.Viewer.prototype.initializeAnnotations = function () {
    context
        .initialize()
        .register('viewer', this)
        .register('annotations', annotations)
        .register('controls', controls)
        .register('overlay', overlay)
        .register('state', state)
        .register('draw', draw)
        .get('viewer', function (viewer) {
            viewer.annotations = viewer.annotations || this.get('annotations');
            viewer.addHandler('open', viewer.annotations.initialize.bind(viewer.annotations));
        });
    return this;
};
