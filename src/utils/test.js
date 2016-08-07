import sinon from 'sinon';

const fakeFactory = {
  getDispatcher() {
    return { dispatch: sinon.spy() };
  },

  resetDispatcher(Dispatcher) {
    Dispatcher.dispatch.reset();
  },

  getStore() {
    return {
      isActivityInProgress: sinon.stub(),
      getMode: sinon.stub(),
      getLast: sinon.stub(),
    };
  },

  resetStore(Store) {
    Store.isActivityInProgress.reset();
    Store.getMode.reset();
    Store.getLast.reset();
  }
};

export { fakeFactory };

export function generateAnnotations() {
  return [
    generatePath(),
    generatePath(),
    generatePath(),
  ];
}

export function generatePath() {
  return ['path', {
    d: 'M41.57 37.89 L41.57 37.63 L41.57 37.38',
    fill:'none',
    stroke: 'red',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': 3,
    'stronke-height': 3,
    'vector-effect': 'non-scaling-stroke',
  }];
}

