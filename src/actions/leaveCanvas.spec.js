import test from 'ava';
import { ACTIVITY_UPDATE } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';
import leaveCanvas from './leaveCanvas';
import { fakeFactory } from '../utils/test';

test('should stop drawing', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  Store.getMode.returns(DRAW);
  leaveCanvas(Dispatcher, Store);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ACTIVITY_UPDATE,
    inProgress: false,
  }));
});
