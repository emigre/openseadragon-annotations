import { Rect, extend } from 'OpenSeadragon';
import { h, render } from 'preact';
import Overlay from './views/Overlay';
import { DrawControl, MoveControl } from './views/Controls';

export default ({ viewer, model, dispatch }) =>
  extend(Object.create({
    initialize() {
      this.overlay = render(h(Overlay, { dispatch: this.dispatch, model: this.model }));
      const homeBounds = viewer.world.getHomeBounds();
      viewer.addOverlay(this.overlay, new Rect(0, 0, homeBounds.width, homeBounds.height));
      const zoom = this.viewer.viewport.getZoom();
      const { width, height } = this.overlay.getBoundingClientRect();
      this.dispatch({ type: 'INITIALIZE', zoom, width, height });
      this.controls = [
        new MoveControl({ dispatch: this.dispatch, model: this.model, viewer: this.viewer }),
        new DrawControl({ dispatch: this.dispatch, model: this.model, viewer: this.viewer }),
      ];
    },

    destroy() {
      // TODO
    },

    getAnnotations() {
      return this.model.getAll();
    },

    setAnnotations(annotations) {
      this.dispatch({ type: 'ANNOTATIONS_RESET', annotations });
    },

    cleanAnnotations() {
      this.dispatch({ type: 'ANNOTATIONS_RESET' });
    },

    getMode() {
      return this.model.getMode();
    },

    setMode(mode) {
      this.dispatch({ type: 'MODE_UPDATE', mode });
    },

    getStatus() {
      return { active: !!this.overlay };
    },
  }), { viewer, model, dispatch, overlay: null });
