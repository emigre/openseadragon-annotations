import Dispatcher from '../dispatcher/Dispatcher';
import types from './';

export function selectMode(newMode) {
  Dispatcher.dispatch({
    type: types.MODE_UPDATE,
    mode: newMode
  });
}
