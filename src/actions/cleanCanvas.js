import { ACTIVITY_UPDATE, ANNOTATIONS_RESET } from '../constants/actionTypes';

export default function cleanCanvas(Dispatcher) {
  Dispatcher.dispatch({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  });
  Dispatcher.dispatch({
    type: ANNOTATIONS_RESET,
    annotations: [],
  });
}
