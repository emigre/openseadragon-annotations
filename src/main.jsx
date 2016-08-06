import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import Store from './store/Store';
import Dispatcher from './dispatcher/Dispatcher';
import types from './constants/actionTypes';
import controls from './controls';

OpenSeadragon.Viewer.prototype.initializeAnnotations = function initialize() {
  this.addHandler('open', () => {
    const size = this.viewport.homeBounds;
    const rect = new Rect(0, 0, size.width, size.height);
    this.addOverlay(render(<Annotations />), rect);
    controls.forEach((Control) => {
      this.addControl(new Control().element, {
        anchor: ControlAnchor.BOTTOM_LEFT,
      });
    });
  });
};

OpenSeadragon.Viewer.prototype.shutdownAnnotations = function shutdown() {
  // TODO
};

export function get() {
  return Store.getAll();
}

export function set(annotations) {
  Dispatcher.dispatch({ type: types.ANNOTATIONS_RESET, annotations });
}

export function reset() {
  Dispatcher.dispatch({ type: types.ANNOTATIONS_RESET, annotations: [] });
}
