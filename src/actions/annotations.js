import Dispatcher from '../dispatcher/Dispatcher';
import types from './';

export function clickOnCanvas() {

  Dispatcher.dispatch({
    type: types.ANNOTATION_CREATE,
  });

}
