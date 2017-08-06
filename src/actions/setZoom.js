export default function setZoom(zoomLevel, dispatcher) {
  dispatcher.dispatch({
    type: 'ZOOM_UPDATE',
    zoom: zoomLevel,
  });
}
