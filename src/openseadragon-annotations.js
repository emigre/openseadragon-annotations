import annotations from './annotations';

if (!OpenSeadragon) { throw new Error('OpenSeadragon Annotations requires OpenSeadragon'); }

OpenSeadragon.Viewer.prototype.initializeAnnotations = function (options) {
    this.addHandler('open', annotations.onOpen.bind(annotations));
    this.annotations = this.annotations || annotations.initialize(OpenSeadragon.extend({ viewer: this }, options));
    return this;
};
