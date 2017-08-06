import OpenSeadragon from 'OpenSeadragon';

class Model extends OpenSeadragon.EventSource {
  data = {
    mode: 'MOVE',
    zoom: 1,
    width: 0,
    height: 0,
    activityInProgress: false,
    annotations: [],
  };

  getAll() {
    return this.data.annotations;
  }

  getWidth() {
    return this.data.width * this.data.zoom;
  }

  getHeight() {
    return this.data.height * this.data.zoom;
  }

  getLast() {
    return this.data.annotations[this.data.annotations.length - 1];
  }

  getMode() {
    return this.data.mode;
  }

  inMoveMode() {
    return this.getMode() === 'MOVE';
  }

  notInMoveMode() {
    return !this.inMoveMode();
  }

  getZoomLevel() {
    return this.data.zoom;
  }

  isActivityInProgress() {
    return this.data.activityInProgress;
  }
}

export default Model;
