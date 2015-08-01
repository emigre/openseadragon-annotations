import annotations from './annotations';

import '../img/draw_grouphover.png';
import '../img/draw_hover.png';
import '../img/draw_pressed.png';
import '../img/draw_rest.png';
import '../img/move_grouphover.png';
import '../img/move_hover.png';
import '../img/move_pressed.png';
import '../img/move_rest.png';

if (!OpenSeadragon) { throw new Error('OpenSeadragon Annotations requires OpenSeadragon'); }

OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
    this.annotations = this.annotations || annotations.initialize(OpenSeadragon.extend({ viewer: this }, options));
    return this;
};
