import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';

export default function press(x, y) {
  switch (Store.getMode()) {

    case modes.DRAW:
      Dispatcher.dispatch({
        type: types.ACTIVITY_UPDATE,
        inProgress: true,
      });
      Dispatcher.dispatch({
        type: types.ANNOTATIONS_CREATE,
        annotation: [
          'path', {
            fill: 'none',
            d: `M${x} ${y}`,
            stroke: STROKE_COLOR,
            'stroke-width': STROKE_SIZE,
            'stronke-height': STROKE_SIZE,
            'stroke-linejoin': 'round',
            'stroke-linecap': 'round',
            'vector-effect': 'non-scaling-stroke',
          },
        ],
      });
      break;

  }
}
