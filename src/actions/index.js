import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';

import cleanCanvas from './cleanCanvas';
import fillCanvasWith from './fillCanvasWith';
import leaveCanvas from './leaveCanvas';
import move from './move';
import press from './press';
import release from './release';
import selectMode from './selectMode';

const bindedCleanCanvas = cleanCanvas.bind(null, Dispatcher);
const bindedFillCanvasWith = fillCanvasWith.bind(null, Dispatcher);
const bindedLeaveCanvas = leaveCanvas.bind(null, Dispatcher, Store);
const bindedMove = move.bind(null, Dispatcher, Store);
const bindedPress = press.bind(null, Dispatcher, Store);
const bindedRelease = release.bind(null, Dispatcher, Store);
const bindedSelectMode = selectMode.bind(null, Dispatcher, Store);

export {
  bindedCleanCanvas as cleanCanvas,
  bindedFillCanvasWith as fillCanvasWith,
  bindedLeaveCanvas as leaveCanvas,
  bindedMove as move,
  bindedPress as press,
  bindedRelease as release,
  bindedSelectMode as selectMode,
};
