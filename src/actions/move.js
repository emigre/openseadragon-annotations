import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';
import modes from '../constants/modes';

export default function move(x, y) {
  switch (Store.getMode()) {

    case modes.DRAW:
      if (Store.isActivityInProgress()) {
        const last = Store.getLast();
        if (last && last[0] === 'path') {
          const d = last[1].d;
          Dispatcher.dispatch({
            type: types.ANNOTATIONS_UPDATE,
            update: {
              d: `${d} L${x} ${y}`,
            },
          });
        }
      }
      break;

  }
}
