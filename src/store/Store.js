import OpenSeadragon from 'OpenSeadragon';
import Dispatcher from '../dispatcher/Dispatcher';
import types from '../actions';
import km from 'keymirror';

const CHANGE_EVENT = 'change';

const state = {
  mode: 'MOVE',
  annotations: [
    [ 'rect', { x: 20, y: 20, width: 90, height: 20 } ],
    [ 'path', { fill: 'none', stroke: 'red', strokeWidth: 0.5,
      strokeLinejoin: 'round', strokeLinecap: 'round',
      d: 'M 10 10 L 50 50 L 25 50' }
    ]
  ]
};

class AppStore extends OpenSeadragon.EventSource {
  getAll() {
    return state;
  }

  emitChange() {
    console.log(state);
    this.raiseEvent(CHANGE_EVENT);
  }
}

const Store = new AppStore();

Dispatcher.register(function (action) {
  switch(action.type) {

    case types.ANNOTATION_CREATE:
      console.log('annotation create');
      break;

    case types.MODE_UPDATE:
      if (state.mode !== action.mode) {
        state.mode = action.mode;
        Store.emitChange();
      }
      break;

    default:
      // nothing
  }
});

export default Store;
