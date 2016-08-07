import test from 'ava';
import types from '../constants/actionTypes';
import cleanCanvas from './cleanCanvas';
import sinon from 'sinon';
import { fakeFactory } from '../utils/test';

const Dispatcher = fakeFactory.getDispatcher();

test.afterEach(t => {
  fakeFactory.resetDispatcher(Dispatcher);
});

test('should abort any ongoing activity', t => {
  cleanCanvas(Dispatcher);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('should empty the annotations list', t => {
  cleanCanvas(Dispatcher);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: types.ANNOTATIONS_RESET,
    annotations: [],
  }));
});
