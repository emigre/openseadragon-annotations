export default function cleanCanvas(dispatcher) {
  dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false,
  });
  dispatcher.dispatch({
    type: 'ANNOTATIONS_RESET',
    annotations: [],
  });
}
