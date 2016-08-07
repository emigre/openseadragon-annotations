import test from 'ava';
import Dispatcher from '../dispatcher/Dispatcher';
import types from '../constants/actionTypes';
import fillCanvasWith from './fillCanvasWith';
import sinon from 'sinon';

let dispatch;

const fakeData = [
  [
    'path',
    {
      d: 'M41.57 37.89 L41.57 37.63 L41.57 37.38',
      fill:'none',
      stroke: 'red',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': 3,
      'stronke-height': 3,
      'vector-effect': 'non-scaling-stroke',
   }
  ]
];

test.beforeEach(t => {
  dispatch = sinon.spy(Dispatcher, 'dispatch');
});

test.beforeEach(t => {
  fillCanvasWith(fakeData);
});

test.afterEach(t => {
  Dispatcher.dispatch.restore();
});

test('should abort any ongoing activity', t => {
  t.true(dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('then it should set the annotations with the value passed', t => {
  t.true(dispatch.secondCall.calledWith({
    type: types.ANNOTATIONS_RESET,
    annotations: fakeData,
  }));
});
