import Dispatcher from '../dispatcher/Dispatcher';
import types from '../constants/actionTypes';

export default function cleanCanvas() {
  Dispatcher.dispatch({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  });
  Dispatcher.dispatch({
    type: types.ANNOTATIONS_RESET,
    annotations: [],
  });
}
