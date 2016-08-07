import types from '../constants/actionTypes';

export default function selectMode(Dispatcher, Store, mode) {
  Dispatcher.dispatch({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  });
  if (Store.getMode() !== mode) {
    Dispatcher.dispatch({
      type: types.MODE_UPDATE,
      mode,
    });
  }
}
