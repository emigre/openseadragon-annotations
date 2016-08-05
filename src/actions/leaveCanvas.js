import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';
import modes from '../constants/modes';

export default function leaveCanvas() {
  switch(Store.getMode()) {

    case modes.DRAW:
      Dispatcher.dispatch({
        type: types.ACTIVITY_UPDATE,
        inProgress: false
      });
    break;

  }
}
