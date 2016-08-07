import types from '../constants/actionTypes';

export default function fillCanvasWith(Dispatcher, annotations) {
  Dispatcher.dispatch({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  });
  Dispatcher.dispatch({
    type: types.ANNOTATIONS_RESET,
    annotations,
  });
}
