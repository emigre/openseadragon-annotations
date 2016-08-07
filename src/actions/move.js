import types from '../constants/actionTypes';
import modes from '../constants/modes';

export default function move(Dispatcher, Store, x, y) {
  switch (Store.getMode()) {

    case modes.DRAW:
      if (Store.isActivityInProgress()) {
        const last = Store.getLast();
        if (last && last[0] === 'path') {
          const d = last[1].d;
          Dispatcher.dispatch({
            type: types.ANNOTATIONS_UPDATE_LAST,
            update: { d: `${d} L${x} ${y}` },
          });
        }
      }
      break;

  }
}
