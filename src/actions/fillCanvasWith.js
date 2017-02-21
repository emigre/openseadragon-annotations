export default function fillCanvasWith(annotations, Dispatcher) {
  Dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false,
  });
  Dispatcher.dispatch({
    type: 'ANNOTATIONS_RESET',
    annotations,
  });
}
