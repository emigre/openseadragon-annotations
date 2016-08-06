import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import Move from './controls/Move';
import Draw from './controls/Draw';

console.log(OpenSeadragon)

function initialize() {
  this.addHandler('open', () => {
    const size = this.viewport.homeBounds;
    const rect = new Rect(0, 0, size.width, size.height);
    this.addOverlay(render(<Annotations />), rect);

    const controls = [Move, Draw];
    controls.forEach((Control) => {
      this.addControl(new Control().element, {
        anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT,
      });
    });
  });
}

OpenSeadragon.Viewer.prototype.initializeAnnotations = initialize;

export default initialize;
