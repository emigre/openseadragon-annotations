import test from 'ava';
import { ACTIVITY_UPDATE, ANNOTATIONS_CREATE } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';
import press from './press';
import { fakeFactory } from '../utils/test';
import shapesFactory from '../utils/shapesFactory';

test('when drawing, it should start an activity', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  const x = 33.3;
  const y = 55.5;
  Store.getMode.returns(DRAW);
  press(x, y, Dispatcher, Store);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ACTIVITY_UPDATE,
    inProgress: true,
  }));
});

test('when drawing, it should create a new path', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  const x = 33.3;
  const y = 55.5;
  Store.getMode.returns(DRAW);
  press(x, y, Dispatcher, Store);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: ANNOTATIONS_CREATE,
    annotation: shapesFactory.getPath(x, y),
  }));
});
