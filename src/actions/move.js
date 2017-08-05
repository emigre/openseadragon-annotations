export default function move(x, y, Dispatcher, Model) {
  switch (Model.getMode()) {

    case 'DRAW':
      if (Model.isActivityInProgress()) {
        const last = Model.getLast();
        if (last && last[0] === 'path') {
          const d = last[1].d;
          Dispatcher.dispatch({
            type: 'ANNOTATIONS_UPDATE_LAST',
            update: { d: `${d} L${x} ${y}` },
          });
        }
      }
      break;

    default:
      break;

  }
}
