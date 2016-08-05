import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';
import modes from '../constants/modes';

export default function press(x, y) {
  switch(Store.getMode()) {
    case modes.DRAW:
      Dispatcher.dispatch({
        type: types.ACTIVITY_UPDATE,
        inProgress: true
      });
      Dispatcher.dispatch({
        type: types.ANNOTATIONS_CREATE,
        annotation: [
          'path', { fill: 'none', stroke: 'red', strokeWidth: 0.5,
            strokeLinejoin: 'round', strokeLinecap: 'round',
            d: 'M' + x + ' ' + y }
        ]
      });
    break;
  }
}
