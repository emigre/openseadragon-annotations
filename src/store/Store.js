import OpenSeadragon, { extend } from 'OpenSeadragon';
import Dispatcher from '../dispatcher/Dispatcher';
import { MODE_UPDATE, ACTIVITY_UPDATE, ANNOTATIONS_CREATE,
  ANNOTATIONS_UPDATE_LAST, ANNOTATIONS_RESET } from '../constants/actionTypes';
import { MOVE } from '../constants/modes';
import { CHANGE_EVENT } from '../constants/events';

const data = {
  mode: MOVE,
  activityInProgress: false,
  annotations: [],
};

class AppStore extends OpenSeadragon.EventSource {
  getAll() {
    return data.annotations;
  }

  getLast() {
    return data.annotations[data.annotations.length - 1];
  }

  getMode() {
    return data.mode;
  }

  isActivityInProgress() {
    return data.activityInProgress;
  }
}

const Store = new AppStore();

Dispatcher.register((action) => {
  switch (action.type) {
    case MODE_UPDATE:
      data.mode = action.mode;
      break;

    case ACTIVITY_UPDATE:
      data.activityInProgress = action.inProgress;
      break;

    case ANNOTATIONS_CREATE:
      data.annotations.push(action.annotation);
      break;

    case ANNOTATIONS_UPDATE_LAST:
      extend(Store.getLast()[1], action.update);
      break;

    case ANNOTATIONS_RESET:
      data.annotations = action.annotations;
      break;
  }
  Store.raiseEvent(CHANGE_EVENT);
});

export default Store;
