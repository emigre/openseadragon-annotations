import test from 'ava';
import { ANNOTATIONS_UPDATE_LAST } from '../constants/actionTypes';
import { DRAW } from '../constants/modes';
import move from './move';
import { generatePath, fakeFactory } from '../utils/test';

test('when drawing, should update the path', t => {
  const Dispatcher = fakeFactory.getDispatcher();
  const Store = fakeFactory.getStore();
  const x = 33.3;
  const y = 55.5;
  const path = generatePath();
  const d = path[1].d;
  Store.getMode.returns(DRAW);
  Store.getLast.returns(path);
  Store.isActivityInProgress.returns(true);
  move(Dispatcher, Store, x, y);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: ANNOTATIONS_UPDATE_LAST,
    update: { d: `${d} L${x} ${y}` },
  }));
});
