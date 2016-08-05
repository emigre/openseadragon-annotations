import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import controls from './controls/';

export default OpenSeadragon.Viewer.prototype.initializeAnnotations = function () {
  this.addHandler('open', () => {
    const size = this.viewport.homeBounds;
    const rect = new Rect(0, 0, size.width, size.height);
    this.addOverlay(render(<Annotations />), rect);
    controls.forEach((Control) => {
      this.addControl(new Control().element, {
        anchor: ControlAnchor.BOTTOM_LEFT
      });
    });
  });
};
