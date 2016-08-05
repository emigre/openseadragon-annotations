import OpenSeadragon, { extend } from 'OpenSeadragon';
import Dispatcher from '../dispatcher/Dispatcher';
import types from '../constants/actionTypes';
import modes from '../constants/modes';

const CHANGE_EVENT = 'change';

const data = {
  mode: modes.MOVE,
  activityInProgress: false,
  annotations: []
};

class AppStore extends OpenSeadragon.EventSource {
  getAll() {
    return data.annotations;
  }

  getLast() {
    return data.annotations[data.annotations.length - 1]
  }

  getMode() {
    return data.mode;
  }

  isActivityInProgress() {
    return data.activityInProgress;
  }
}

const Store = new AppStore();

Dispatcher.register(function (action) {
  switch(action.type) {
    case types.MODE_UPDATE:
      data.mode = action.mode;
    break;

    case types.ACTIVITY_UPDATE:
      data.activityInProgress = action.inProgress;
    break;

    case types.ANNOTATIONS_CREATE:
      data.annotations.push(action.annotation);
    break;

    case types.ANNOTATIONS_UPDATE:
      extend(Store.getLast()[1], action.update);
    break;
  }
  Store.raiseEvent(CHANGE_EVENT);
});

export default Store;
