import OpenSeadragon from 'OpenSeadragon';
import context from './context/context';
import annotations from './annotations/annotations';
import state from './state/state';
import draw from './state/draw';
import controls from './controls/controls';
import overlay from './overlay/overlay';

export default OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
    context
        .register('annotations', annotations)
        .register('controls', controls)
        .register('overlay', overlay)
        .register('state', state)
        .register('draw', draw)
        .initialize();
    this.annotations = this.annotations || annotations.initialize(OpenSeadragon.extend({ viewer: this }, options));
    return this;
};
