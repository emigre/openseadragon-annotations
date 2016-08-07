import test from 'ava';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import release from './release';
import { fakeFactory } from '../utils/test';

test('when drawing, it should stop doing so', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(modes.DRAW);
  release(Dispatcher, Store);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

