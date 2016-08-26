import { INITIALIZE } from '../constants/actionTypes';

export default function leaveCanvas(Dispatcher, Store, options) {
  Dispatcher.dispatch({
    type: INITIALIZE,
    options,
  });
}
