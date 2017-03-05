import OpenSeadragon, { extend } from 'OpenSeadragon';
import Dispatcher from '../dispatcher/Dispatcher';

const data = {
  mode: 'MOVE',
  zoom: 1,
  // width and heigth contain the original width and height of the
  // SVG container, in pixels, at zoom level 1. These will remain
  // constant over time as the image scales up and down
  width: 0,
  height: 0,
  activityInProgress: false,
  annotations: [],
};

class AppStore extends OpenSeadragon.EventSource {
  static getAll() {
    return data.annotations;
  }

  // multiplying the original width in pixels by the current
  // zoom level gives us the image width in pixels at the moment
  static getWidth() {
    return data.width * data.zoom;
  }

  // idem for the heigth
  static getHeight() {
    return data.height * data.zoom;
  }

  static getLast() {
    return data.annotations[data.annotations.length - 1];
  }

  static getMode() {
    return data.mode;
  }

  inMoveMode() {
    return this.getMode() === 'MOVE';
  }

  notInMoveMode() {
    return !this.inMoveMode();
  }

  static getZoomLevel() {
    return data.zoom;
  }

  static isActivityInProgress() {
    return data.activityInProgress;
  }
}

const Store = new AppStore();

Dispatcher.register((action) => {
  switch (action.type) {
    case 'MODE_UPDATE':
      data.mode = action.mode;
      break;

    case 'ACTIVITY_UPDATE':
      data.activityInProgress = action.inProgress;
      break;

    case 'ANNOTATIONS_CREATE':
      data.annotations.push(action.annotation);
      break;

    case 'ANNOTATIONS_UPDATE_LAST':
      extend(Store.getLast()[1], action.update);
      break;

    case 'ANNOTATIONS_RESET':
      data.annotations = action.annotations;
      break;

    case 'ZOOM_UPDATE':
      data.zoom = action.zoom;
      break;

    case 'INITIALIZE':
      extend(data, action.options);
      break;

    default:
      break;
  }
  Store.raiseEvent('CHANGE_EVENT');
});

export default Store;
