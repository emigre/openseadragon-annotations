import { ACTIVITY_UPDATE, ANNOTATIONS_CREATE } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';
import shapesFactory from '../utils/shapesFactory';

export default function press(Dispatcher, Store, x, y) {
  switch (Store.getMode()) {

    case DRAW:
      Dispatcher.dispatch({
        type: ACTIVITY_UPDATE,
        inProgress: true,
      });
      Dispatcher.dispatch({
        type: ANNOTATIONS_CREATE,
        annotation: shapesFactory.getPath(x, y),
      });
      break;

  }
}
