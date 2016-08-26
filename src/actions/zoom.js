import { ZOOM_UPDATE } from '../constants/actionTypes';

export default function selectMode(Dispatcher, Store, zoom) {
  Dispatcher.dispatch({
    type: ZOOM_UPDATE,
    zoom,
  });
}
