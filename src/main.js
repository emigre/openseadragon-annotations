import { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Overlay from './components/Overlay';
import Model from './model/Model';
import Dispatcher from './dispatcher/Dispatcher';
import controlClasses from './controls';
import initialize from './actions/initialize';
import selectMode from './actions/selectMode';
import cleanCanvas from './actions/cleanCanvas';
import fillCanvasWith from './actions/fillCanvasWith';
import setZoom from './actions/setZoom';

const controls = controlClasses.map(Control => new Control());

export default class Annotations {
  constructor(options) {
    this.viewer = options.viewer;
    this.overlay = null;
    this.viewer.addHandler('open', this.onOpen, { annotations: this });
    this.viewer.addHandler('zoom', this.onZoom);
    if (this.viewer.isOpen()) { this.initialize(); }
  }

  onOpen({ userData }) {
    const { annotations } = userData;
    annotations.initialize.call(annotations);
  }

  onZoom({ zoom }) {
    setZoom(zoom, Dispatcher);
  }

  initialize() {
    const bounds = this.viewer.world.getHomeBounds();
    const rect = new Rect(0, 0, bounds.width, bounds.height);
    this.overlay = render(h(Overlay));
    this.viewer.addOverlay(this.overlay, rect);

    const currentZoom = this.viewer.viewport.getZoom();
    const boundingClientRect = this.overlay.getBoundingClientRect();
    initialize({
      zoom: currentZoom,
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    }, Dispatcher);

    controls.forEach((control) => {
      this.viewer.addControl(control.btn.element, { anchor: ControlAnchor.BOTTOM_LEFT });
    });
  }

  destroy() {
    this.viewer.removeHandler('zoom', this.onZoom);
    this.viewer.removeOverlay(this.overlay);
    this.overlay = null;

    const ourControls = controls;
    const activeControls = this.controls;
    activeControls.forEach((viewportControl) => {
      ourControls.forEach((control) => {
        // destroys only the controls that we have added
        if (viewportControl.element === control.btn.element) {
          viewportControl.destroy();
        }
      });
    });
    selectMode('MOVE', Dispatcher, Model);
    cleanCanvas(Dispatcher);
  }

  getAnnotations() {
    return Model.getAll();
  }

  setAnnotations(annotations) {
    fillCanvasWith(annotations, Dispatcher);
  }

  cleanAnnotations() {
    cleanCanvas(Dispatcher);
  }

  getMode() {
    return Model.getMode();
  }

  setMode(mode) {
    selectMode(mode, Dispatcher, Model);
  }

  getStatus() {
    return { active: !!this.overlay };
  }
}
