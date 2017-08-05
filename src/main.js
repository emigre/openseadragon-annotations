import { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import _Annotations from './components/Annotations';
import Store from './store/Store';
import Dispatcher from './dispatcher/Dispatcher';
import controlClasses from './controls';
import initialize from './actions/initialize';
import selectMode from './actions/selectMode';
import cleanCanvas from './actions/cleanCanvas';
import fillCanvasWith from './actions/fillCanvasWith';
import _zoom from './actions/zoom';

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
    _zoom(zoom, Dispatcher);
  }

  initialize() {
    const bounds = this.viewer.world.getHomeBounds();
    const rect = new Rect(0, 0, bounds.width, bounds.height);
    this.overlay = render(h(_Annotations));
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
    selectMode('MOVE', Dispatcher, Store);
    cleanCanvas(Dispatcher);
  }

  getAnnotations() {
    return Store.getAll();
  }

  setAnnotations(annotations) {
    fillCanvasWith(annotations, Dispatcher);
  }

  cleanAnnotations() {
    cleanCanvas(Dispatcher);
  }

  getMode() {
    return Store.getMode();
  }

  setMode(mode) {
    selectMode(mode, Dispatcher, Store);
  }

  getStatus() {
    return { active: !!this.overlay };
  }
}
