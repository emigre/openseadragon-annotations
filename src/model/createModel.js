import { EventSource } from 'OpenSeadragon';

export default () =>
  Object.assign(Object.create(EventSource.prototype), {
    events: {},
    mode: 'MOVE',
    zoom: 1,
    width: 0,
    height: 0,
    activityInProgress: false,
    annotations: [],
    addAnnotaionCallback: null,
    style: {
      color: 'red',
      width: 3,
    },
  });
