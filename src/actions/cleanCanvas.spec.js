import test from 'ava';
import { ACTIVITY_UPDATE, ANNOTATIONS_RESET } from '../constants/actionTypes';
import cleanCanvas from './cleanCanvas';
import { fakeFactory } from '../utils/test';

test('should abort any ongoing activity', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  cleanCanvas(Dispatcher);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('should empty the annotations list', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  cleanCanvas(Dispatcher);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: ANNOTATIONS_RESET,
    annotations: [],
  }));
});
