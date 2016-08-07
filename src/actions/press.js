import types from '../constants/actionTypes';
import modes from '../constants/modes';
import shapesFactory from '../utils/shapesFactory';

export default function press(Dispatcher, Store, x, y) {
  switch (Store.getMode()) {

    case modes.DRAW:
      Dispatcher.dispatch({
        type: types.ACTIVITY_UPDATE,
        inProgress: true,
      });
      Dispatcher.dispatch({
        type: types.ANNOTATIONS_CREATE,
        annotation: shapesFactory.getPath(x, y),
      });
      break;

  }
}
