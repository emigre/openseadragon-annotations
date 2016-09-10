import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';

const shapesFactory = {
  getPath(x, y) {
    return [
      'path',
      {
        fill: 'none',
        d: `M${x} ${y}`,
        stroke: STROKE_COLOR,
        'stroke-width': STROKE_SIZE,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        'vector-effect': 'non-scaling-stroke',
      },
    ];
  },
};

export default shapesFactory;
