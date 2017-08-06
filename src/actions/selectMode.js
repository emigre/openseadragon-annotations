export default function selectMode(mode, dispatcher, model) {
  dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false,
  });
  if (model.getMode() !== mode) {
    dispatcher.dispatch({
      type: 'MODE_UPDATE',
      mode,
    });
  }
}
