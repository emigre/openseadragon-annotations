import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import controls from './controls';

OpenSeadragon.Viewer.prototype.initializeAnnotations = function () {
  this.addHandler('open', () => {
    const size = this.viewport.homeBounds;
    const rect = new OpenSeadragon.Rect(0, 0, size.width, size.height);
    console.log(controls)
    this.addOverlay(render(<Annotations />), rect);
    controls.forEach((Control) => {
      this.addControl(new Control().element, {
        anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
      });
    });
  });
}

OpenSeadragon.Viewer.prototype.shutdownAnnotations = function () {
  // TODO
}

export function foo() {
  console.log('bar');
}

