import { Rect } from 'OpenSeadragon';
import { h, render } from 'preact';
import { Dispatcher } from 'flux';
import Overlay from './views/Overlay';
import { DrawControl, MoveControl } from './views/Controls';
import Model from './model/Model';
import generalConsequences from './consequences/general';
import initialize from './actions/initialize';
import selectMode from './actions/selectMode';
import cleanCanvas from './actions/cleanCanvas';
import fillCanvasWith from './actions/fillCanvasWith';
import setZoom from './actions/setZoom';

export default class Annotations {
  constructor(options) {
    this.model = new Model();
    this.dispatcher = new Dispatcher();
    this.dispatcher.register(generalConsequences(this.model));
    this.overlay = null;
    this.viewer = options.viewer;
    this.viewer.addHandler('open', this.onOpen, { annotations: this });
    this.viewer.addHandler('zoom', this.onZoom, { annotations: this });
    if (this.viewer.isOpen()) { this.initialize(); }
  }

  onOpen({ userData }) {
    const { annotations } = userData;
    annotations.initialize.call(annotations);
  }

  onZoom({ zoom, userData }) {
    const { annotations } = userData;
    setZoom(zoom, annotations.dispatcher);
  }

  initialize() {
    const { dispatcher, model, viewer } = this;
    this.overlay = render(h(Overlay, { dispatcher, model }));
    const homeBounds = viewer.world.getHomeBounds();
    viewer.addOverlay(this.overlay, new Rect(0, 0, homeBounds.width, homeBounds.height));

    const zoom = viewer.viewport.getZoom();
    const { width, height } = this.overlay.getBoundingClientRect();
    initialize({ zoom, width, height }, dispatcher);

    this.controls = [
      new MoveControl({ dispatcher, model, viewer }),
      new DrawControl({ dispatcher, model, viewer }),
    ];
  }

  destroy() {
    // TODO
  }

  getAnnotations() {
    return this.model.getAll();
  }

  setAnnotations(annotations) {
    fillCanvasWith(annotations, this.dispatcher);
  }

  cleanAnnotations() {
    cleanCanvas(this.dispatcher);
  }

  getMode() {
    return this.model.getMode();
  }

  setMode(mode) {
    selectMode(mode, this.dispatcher, this.model);
  }

  getStatus() {
    return { active: !!this.overlay };
  }
}
