import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import Store from './store/Store';
import modes from './constants/modes';
import controlClasses from './controls';
import selectMode from './actions/selectMode';
import cleanCanvas from './actions/cleanCanvas';
import fillCanvasWith from './actions/fillCanvasWith';

const controls = controlClasses.map((Control) => new Control());

let isPluginActive = false;
let openHandler = null;
let overlay = null;

OpenSeadragon.Viewer.prototype.initializeAnnotations = function initialize() {
  const onOpen = () => {
    const bounds = this.world.getHomeBounds();
    const rect = new Rect(0, 0, bounds.width, bounds.height);
    overlay = render(<Annotations />);
    this.addOverlay(overlay, rect);
    controls.forEach((control) => {
      this.addControl(control.btn.element, {
        anchor: ControlAnchor.BOTTOM_LEFT,
      });
    });
    isPluginActive = true;
  };
  this.addOnceHandler('open', onOpen);
  openHandler = onOpen;
};

OpenSeadragon.Viewer.prototype.areAnnotationsActive = function isActive() {
  return isPluginActive;
};

OpenSeadragon.Viewer.prototype.shutdownAnnotations = ifPluginIsActive(function shutdown() {
  this.removeHandler('open', openHandler);
  openHandler = null;
  this.removeOverlay(overlay);
  overlay = null;
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
  selectMode(modes.MOVE);
  cleanCanvas();
  isPluginActive = false;
});

const get = ifPluginIsActive(() => Store.getAll());

const set = ifPluginIsActive((annotations) => {
  fillCanvasWith(annotations);
});

const clean = ifPluginIsActive(() => {
  cleanCanvas();
});

function ifPluginIsActive(fn) {
  return function checkIfActive(...args) {
    if (!isPluginActive) {
      throw new Error('The OpenSeadragon Annotations plugin is not running');
    } else {
      return fn.apply(this, args);
    }
  };
}

export { get, set, clean };
