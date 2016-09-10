import { ACTIVITY_UPDATE, MODE_UPDATE } from '../constants/actionTypes';

export default function selectMode(mode, Dispatcher, Store) {
  Dispatcher.dispatch({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  });
  if (Store.getMode() !== mode) {
    Dispatcher.dispatch({
      type: MODE_UPDATE,
      mode,
    });
  }
}
