import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';

export default function selectMode(mode) {
  Dispatcher.dispatch({
    type: types.ACTIVITY_UPDATE,
    inProgress: false
  });
  if (Store.getMode() !== mode) {
    Dispatcher.dispatch({
      type: types.MODE_UPDATE,
      mode,
    });
  }
}
