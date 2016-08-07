import test from 'ava';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import press from './press';
import { generatePath, fakeFactory } from '../utils/test';
import { STROKE_SIZE, STROKE_COLOR } from '../constants/graphical';
import shapesFactory from '../utils/shapesFactory';

test('when drawing, it should start an activity', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  const x = 33.3;
  const y = 55.5;
  Store.getMode.returns(modes.DRAW);
  press(Dispatcher, Store, x, y);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: true,
  }));
});

test('when drawing, it should create a new path', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  const x = 33.3;
  const y = 55.5;
  Store.getMode.returns(modes.DRAW);
  press(Dispatcher, Store, x, y);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: types.ANNOTATIONS_CREATE,
    annotation: shapesFactory.getPath(x, y),
  }));
});
