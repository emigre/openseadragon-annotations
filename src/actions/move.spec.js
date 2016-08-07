import test from 'ava';
import types from '../constants/actionTypes';
import modes from '../constants/modes';
import move from './move';
import sinon from 'sinon';
import { generatePath, fakeFactory } from '../utils/test';

const Dispatcher = fakeFactory.getDispatcher();
const Store = fakeFactory.getStore();
const x = 33.3;
const y = 55.5;

test.afterEach(t => {
  fakeFactory.resetDispatcher(Dispatcher);
  fakeFactory.resetStore(Store);
});

test('when drawing, should update the path', t => {
  const path = generatePath();
  const d = path[1].d;
  Store.getMode.returns(modes.DRAW);
  Store.getLast.returns(path);
  Store.isActivityInProgress.returns(true);
  move(Dispatcher, Store, x, y);
  t.true(Dispatcher.dispatch.firstCall.calledWith({
    type: types.ANNOTATIONS_UPDATE_LAST,
    update: {
      d: `${d} L${x} ${y}`
    },
  }));
});
