export default function move(x, y, dispatcher, model) {
  switch (model.getMode()) {

    case 'DRAW':
      if (model.isActivityInProgress()) {
        const last = model.getLast();
        if (last && last[0] === 'path') {
          const d = last[1].d;
          dispatcher.dispatch({
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
