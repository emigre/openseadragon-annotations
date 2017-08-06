export default function leaveCanvas(dispatcher, model) {
  switch (model.getMode()) {

    case 'DRAW':
      dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: false,
      });
      break;

    default:
      break;

  }
}
