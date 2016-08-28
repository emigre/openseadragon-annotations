import test from 'ava';
import { ACTIVITY_UPDATE, MODE_UPDATE } from '../constants/actionTypes';
import { MOVE, DRAW } from '../constants/modes';
import selectMode from './selectMode';
import { fakeFactory } from '../utils/test';

test('should abort any ongoing activity', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(DRAW);
  selectMode(Dispatcher, Store, DRAW);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

test('when the selected mode is not the current, it should change the mode', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(MOVE);
  selectMode(Dispatcher, Store, DRAW);
  t.true(Dispatcher.dispatch.secondCall.calledWith({
    type: MODE_UPDATE,
    mode: DRAW,
  }));
});

test('when selecting the currently active mode, it should not try to change the mode', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(MOVE);
  selectMode(Dispatcher, Store, MOVE);
  t.true(Dispatcher.dispatch.calledOnce);
});
