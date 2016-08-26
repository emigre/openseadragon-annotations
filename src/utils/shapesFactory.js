import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';

const shapesFactory = {
  getPath(x, y) {
    return [
      'path',
      {
        fill: 'none',
        d: `M${x} ${y}`,
        stroke: STROKE_COLOR,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
      },
    ];
  },
};

export default shapesFactory;
