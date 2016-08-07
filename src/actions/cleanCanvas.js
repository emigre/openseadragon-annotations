import types from '../constants/actionTypes';

export default function cleanCanvas(Dispatcher) {
  Dispatcher.dispatch({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  });
  Dispatcher.dispatch({
    type: types.ANNOTATIONS_RESET,
    annotations: [],
  });
}
