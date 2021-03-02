export default function initialize(options, Dispatcher) {
  Dispatcher.dispatch({
    type: 'INITIALIZE',
    options,
  });
}
