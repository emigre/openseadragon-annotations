export default function initialize(options, dispatcher) {
  dispatcher.dispatch({
    type: 'INITIALIZE',
    options,
  });
}
