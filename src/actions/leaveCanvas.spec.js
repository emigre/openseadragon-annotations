import test from 'ava';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import leaveCanvas from './leaveCanvas';
import { fakeFactory } from '../utils/test';

test('should stop drawing', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(modes.DRAW);
  leaveCanvas(Dispatcher, Store);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});
