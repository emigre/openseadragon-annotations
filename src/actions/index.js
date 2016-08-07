import Dispatcher from '../dispatcher/Dispatcher';
import Store from '../store/Store';

import cleanCanvas from './cleanCanvas';
import fillCanvasWith from './fillCanvasWith';
import leaveCanvas from './leaveCanvas';
import move from './move';
import press from './press';
import release from './release';
import selectMode from './selectMode';

export default {
  cleanCanvas: cleanCanvas.bind(null, Dispatcher),
  fillCanvasWith: fillCanvasWith.bind(null, Dispatcher),
  leaveCanvas: leaveCanvas.bind(null, Dispatcher, Store),
  move: move.bind(null, Dispatcher, Store),
  press: press.bind(null, Dispatcher, Store),
  release: release.bind(null, Dispatcher, Store),
  selectMode: selectMode.bind(null, Dispatcher, Store),
};
