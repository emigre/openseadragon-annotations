import test from 'ava';
import Dispatcher from '../dispatcher/Dispatcher';
import types from '../constants/actionTypes';
import leaveCanvas from './leaveCanvas';
import sinon from 'sinon';

let dispatch;

test.beforeEach(t => {
  dispatch = sinon.spy(Dispatcher, 'dispatch');
});

test.beforeEach(t => {
  leaveCanvas();
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
