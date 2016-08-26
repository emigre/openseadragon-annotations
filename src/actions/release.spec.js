import test from 'ava';
import { ACTIVITY_UPDATE } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';
import release from './release';
import { fakeFactory } from '../utils/test';

test('when drawing, it should stop doing so', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(DRAW);
  release(Dispatcher, Store);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  }));
});

