import OpenSeadragon from "OpenSeadragon";
import annotations from './annotations/annotations';

if (!OpenSeadragon) { throw new Error('OpenSeadragon Annotations requires OpenSeadragon'); }

export default OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
    this.annotations = this.annotations || annotations.initialize(OpenSeadragon.extend({ viewer: this }, options));
    return this;
};
