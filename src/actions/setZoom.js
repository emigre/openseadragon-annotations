export default function setZoom(zoomLevel, Dispatcher) {
  Dispatcher.dispatch({
    type: 'ZOOM_UPDATE',
    zoom: zoomLevel,
  });
}
