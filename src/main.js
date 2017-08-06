import { Rect } from 'OpenSeadragon';
import { h, render } from 'preact';
import Overlay from './views/Overlay';
import { DrawControl, MoveControl } from './views/Controls';
import Model from './model/Model';
import createDispatch from './model/createDispatch';
import generalActions from './model/generalActions';

export default class Annotations {
  constructor({ viewer }) {
    this.model = new Model();
    this.dispatch = createDispatch(this.model, generalActions);
    this.overlay = null;
    this.viewer = viewer;
    this.viewer.addHandler('open', () => this.initialize());
    this.viewer.addHandler('zoom', ({ zoom }) => this.dispatch({ type: 'ZOOM_UPDATE', zoom }));
    if (this.viewer.isOpen()) {
      this.initialize();
    }
  }

  initialize() {
    const { dispatch, model, viewer } = this;
    this.overlay = render(h(Overlay, { dispatch, model }));
    const homeBounds = viewer.world.getHomeBounds();
    viewer.addOverlay(this.overlay, new Rect(0, 0, homeBounds.width, homeBounds.height));

    const zoom = viewer.viewport.getZoom();
    const { width, height } = this.overlay.getBoundingClientRect();
    this.dispatch({ type: 'INITIALIZE', zoom, width, height });

    this.controls = [
      new MoveControl({ dispatch, model, viewer }),
      new DrawControl({ dispatch, model, viewer }),
    ];
  }

  destroy() {
    // TODO
  }

  getAnnotations() {
    return this.model.getAll();
  }

  setAnnotations(annotations) {
    this.dispatch({ type: 'ANNOTATIONS_RESET', annotations });
  }

  cleanAnnotations() {
    this.dispatch({ type: 'ANNOTATIONS_RESET' });
  }

  getMode() {
    return this.model.getMode();
  }

  setMode(mode) {
    this.dispatch({ type: 'MODE_UPDATE', mode });
  }

  getStatus() {
    return { active: !!this.overlay };
  }
}
