import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';

export default function release(x, y) {
  switch(Store.getMode()) {
    case 'MOVE':
    break;

    case 'DRAW':
      Dispatcher.dispatch({
        type: types.ACTIVITY_UPDATE,
        inProgress: false
      });
    break;
  }
}
