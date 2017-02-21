export default function zoom(zoomLevel, Dispatcher) {
  Dispatcher.dispatch({
    type: 'ZOOM_UPDATE',
    zoom: zoomLevel,
  });
}
