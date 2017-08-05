export default function selectMode(mode, Dispatcher, Model) {
  Dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false,
  });
  if (Model.getMode() !== mode) {
    Dispatcher.dispatch({
      type: 'MODE_UPDATE',
      mode,
    });
  }
}
