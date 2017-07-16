import { h, Component } from 'preact';
import Store from '../store/Store';
import Dispatcher from '../dispatcher/Dispatcher';
import leaveCanvas from '../actions/leaveCanvas';
import move from '../actions/move';
import press from '../actions/press';
import release from '../actions/release';
import { convertWidth, convertHeight } from '../utils/convert';

const svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%',
};

// checks if we can use vector-effect="non-scaling-stroke" to
// maintain constant the witdh of the SVG strokes during zoom
function isVectorEffectSupported() {
  return document.documentElement.style.vectorEffect !== undefined;
}

const svgStyles = {
  cursor: 'default',
  // IE 9-10 fix
  'background-color': 'rgba(0,0,0,0)',
};

const createAnnotations = (() => {
  let fn = el => h(...el);
  if (!isVectorEffectSupported()) { // IE and Edge fix
    fn = (el) => {
      const newEl = el;
      newEl[1]['stroke-width'] = convertWidth.toPercent(3);
      return h(...newEl);
    };
  }
  return fn;
})();

class Annotations extends Component {
  getInitialState() {
    return { annotations: Store.getAll() };
  }

  componentDidMount() {
    Store.addHandler('CHANGE_EVENT', () => {
      this.setState({ annotations: Store.getAll() });
    });
  }

  handleMouseLeave(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      leaveCanvas(Dispatcher, Store);
    }
  }

  handleMouseUp(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      release(Dispatcher, Store);
    }
  }

  coords(e) {
    const rect = this.base.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = 100 * offsetX / rect.width;
    const y = 100 * offsetY / rect.height;
    return [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
    ];
  }

  handleMouseDown(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      press(...this.coords(e), Dispatcher, Store);
    }
  }

  handleMouseMove(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      move(...this.coords(e), Dispatcher, Store);
    }
  }

  render() {
    return h(
      'svg',
      {
        ...svgProperties,
        style: svgStyles,
        onMouseDown: this.handleMouseDown.bind(this),
        onPointerDown: this.handleMouseDown.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onMouseMove: this.handleMouseMove.bind(this),
        onMouseUp: this.handleMouseUp.bind(this),
        onPointerUp: this.handleMouseUp.bind(this),
      },
      this.state.annotations.map(createAnnotations),
    );
  }
}

export default Annotations;
