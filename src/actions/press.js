const shapesFactory = {
  getPath(x, y) {
    return [
      'path',
      {
        fill: 'none',
        d: `M${x} ${y}`,
        stroke: 'red',
        'stroke-width': 3,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        'vector-effect': 'non-scaling-stroke',
      },
    ];
  },
};

export default function press(x, y, dispatcher, model) {
  switch (model.getMode()) {

    case 'DRAW':
      dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: true,
      });
      dispatcher.dispatch({
        type: 'ANNOTATIONS_CREATE',
        annotation: shapesFactory.getPath(x, y),
      });
      break;

    default:
      break;

  }
}
