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

// the viewer gains the following methods through its prototype,
// which are used to start and stop the plugin. The plugin waits
// for the 'open' event to start itself

OpenSeadragon.Viewer.prototype.initializeAnnotations = function initialize(cb) {
  const start = () => {
    const bounds = this.world.getHomeBounds();
    const rect = new Rect(0, 0, bounds.width, bounds.height);
    overlay = render(<Annotations />);
    this.addOverlay(overlay, rect);
    controls.forEach((control) => {
      this.addControl(control.btn.element, {
        anchor: ControlAnchor.BOTTOM_LEFT,
      });
    });
    if (openHandler) {
      this.removeHandler('open', openHandler);
      openHandler = null;
    }
    isPluginActive = true;
    if (cb) { cb(); }
  };

  if (isPluginActive) {
    throw new Error('The OpenSeadragon Annotations plugin is already running');
  }
  if (overlay) {
    throw new Error('An existing overlay has been found');
  }

  if (this.isOpen()) {
    start();
  } else {
    if (openHandler) {
      // if there is a handler initializeAnnotations() has been
      // called before. Cancel that handler (with the previously
      // passed callback)...
      this.removeHandler('open', openHandler);
    }
    // ...and set a new one, which will use the new passed callback
    openHandler = start;
    this.addOnceHandler('open', start);
  }
};

OpenSeadragon.Viewer.prototype.areAnnotationsActive = function isActive() {
  return isPluginActive;
};

OpenSeadragon.Viewer.prototype.shutdownAnnotations = ifPluginIsActive(function shutdown() {
  // if the plugin is running, overlay should not be null and the
  // 'open' handler should have been set back to null during start
  if (openHandler !== null) {
    throw new Error('An untriggered handler for the \'open\' event has been found');
  }
  if (overlay === null) {
    throw new Error('Null reference to the SVG overlay');
  }
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

// get(), set() and clean() are exported and available in the viewer's
// annotations object. This allows the user to interact with the
// annotations stored in the data store: get the data, reset it, etc.

const get = ifPluginIsActive(() => Store.getAll());

const set = ifPluginIsActive((annotations) => {
  fillCanvasWith(annotations);
});

const clean = ifPluginIsActive(() => {
  cleanCanvas();
});

// modifies the passed function so it's only called when the
// plugin is active - otherwise it throws an error
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
