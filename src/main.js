import OpenSeadragon, { Rect, ControlAnchor } from 'OpenSeadragon';
import { h, render } from 'preact';
import Annotations from './components/Annotations';
import Store from './store/Store';
import Dispatcher from './dispatcher/Dispatcher';
import controlClasses from './controls';
import initialize from './actions/initialize';
import selectMode from './actions/selectMode';
import cleanCanvas from './actions/cleanCanvas';
import fillCanvasWith from './actions/fillCanvasWith';
import zoom from './actions/zoom';

const controls = controlClasses.map(Control => new Control());

let isPluginActive = false;
let openHandler = null;
let zoomHandler = null;
let overlay = null;

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

// the viewer gains the following methods through its prototype,
// which are used to start and stop the plugin. The plugin waits
// for the 'open' event to start itself

OpenSeadragon.Viewer.prototype.initializeAnnotations = function init(cb) {
  // updateZoom notifies the plugin of changes in the zoom level
  const updateZoom = e => zoom(e.zoom, Dispatcher);
  // start is the function called once the 'open' event has been fired
  const start = () => {
    zoomHandler = updateZoom;
    this.addHandler('zoom', updateZoom);

    const bounds = this.world.getHomeBounds();
    const rect = new Rect(0, 0, bounds.width, bounds.height);
    overlay = render(h(Annotations));
    this.addOverlay(overlay, rect);

    const currentZoom = this.viewport.getZoom();
    const boundingClientRect = overlay.getBoundingClientRect();
    initialize({
      zoom: currentZoom,
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    }, Dispatcher);

    controls.forEach((control) => {
      this.addControl(control.btn.element, {
        anchor: ControlAnchor.BOTTOM_LEFT,
      });
    });

    // clean up the listener that triggers this start
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

OpenSeadragon.Viewer.prototype.areAnnotationsActive = function areActive() {
  return isPluginActive;
};

OpenSeadragon.Viewer.prototype.startDrawing = ifPluginIsActive(function draw() {
  selectMode('DRAW', Dispatcher, Store);
});

OpenSeadragon.Viewer.prototype.stopDrawing = ifPluginIsActive(function stopdraw() {
  selectMode('MOVE', Dispatcher, Store);
});

OpenSeadragon.Viewer.prototype.shutdownAnnotations = ifPluginIsActive(function shutdown() {
  if (openHandler !== null) {
    throw new Error('An untriggered handler for the \'open\' event has been found');
  }
  if (overlay === null) {
    throw new Error('Null reference to the SVG overlay');
  }
  this.removeHandler('zoom', zoomHandler);
  zoomHandler = null;
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
  selectMode('MOVE', Dispatcher, Store);
  cleanCanvas(Dispatcher);
  isPluginActive = false;
});

// get(), set() and clean() are exported and available in the viewer's
// annotations object. This allows the user to interact with the
// annotations stored in the data store: get the data, reset it, etc.

const get = ifPluginIsActive(() => Store.getAll());

const set = ifPluginIsActive((annotations) => {
  fillCanvasWith(annotations, Dispatcher);
});

const clean = ifPluginIsActive(() => {
  cleanCanvas(Dispatcher);
});

export { get, set, clean };
