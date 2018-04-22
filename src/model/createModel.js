import { EventSource } from 'OpenSeadragon';

export default () =>
  Object.assign(Object.create(EventSource.prototype), {
    events: {},
    mode: 'DRAW',
    zoom: 1,
    width: 0,
    height: 0,
    activityInProgress: false,
    annotations: [],
    addAnnotationCallback: null,
    style: {
      type: 'path', // type: polyline, polygon, line, ellipse, rect, path (default)
      color: 'red',
      width: 3,
    },
  });
