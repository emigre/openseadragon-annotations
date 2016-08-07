import test from 'ava';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import selectMode from './selectMode';
import { fakeFactory } from '../utils/test';

test('should abort any ongoing activity', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(modes.DRAW);
  selectMode(Dispatcher, Store, modes.DRAW);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('when the selected mode is not the current, it should change the mode', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(modes.MOVE);
  selectMode(Dispatcher, Store, modes.DRAW);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: types.MODE_UPDATE,
    mode: modes.DRAW,
  }));
});

test('when selecting the currently active mode, it should not try to change the mode', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(modes.MOVE);
  selectMode(Dispatcher, Store, modes.MODE);
  t.false(Dispatcher.dispatch.secondCall.calledWith({
    type: types.MODE_UPDATE,
    mode: modes.DRAW,
  }));
});
