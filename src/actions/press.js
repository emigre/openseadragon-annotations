import shapesFactory from '../utils/shapesFactory';

export default function press(x, y, Dispatcher, Store) {
  switch (Store.getMode()) {

    case 'DRAW':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: true,
      });
      Dispatcher.dispatch({
        type: 'ANNOTATIONS_CREATE',
        annotation: shapesFactory.getPath(x, y),
      });
      break;

  }
}
