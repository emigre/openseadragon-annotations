import { h, Component } from 'preact';
import Store from '../store/Store';
import Dispatcher from '../dispatcher/Dispatcher';
import leaveCanvas from '../actions/leaveCanvas';
import move from '../actions/move';
import press from '../actions/press';
import release from '../actions/release';
import { CHANGE_EVENT } from '../constants/events';
import { STROKE_SIZE } from '../constants/graphical';
import { convertWidth, convertHeight } from '../utils/convert';

export default class Annotations extends Component {
  getInitialState() {
    return { annotations: Store.getAll() };
  }

  componentDidMount() {
    Store.addHandler(CHANGE_EVENT, () => {
      this.setState({ annotations: Store.getAll() });
    });
  }

  coords(e) {
    const rect = this.base.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = convertWidth.toPercent(offsetX);
    const y = convertHeight.toPercent(offsetY);
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

  handleMouseLeave(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      leaveCanvas(Dispatcher, Store);
    }
  }

  handleMouseMove(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      move(...this.coords(e), Dispatcher, Store);
    }
  }

  handleMouseUp(e) {
    if (Store.notInMoveMode()) {
      e.stopPropagation();
      release(Dispatcher, Store);
    }
  }

  render() {
    return (
      <svg
        {...svgProperties}
        style={svgStyles}
        onMouseDown={this.handleMouseDown.bind(this)}
        onPointerDown={this.handleMouseDown.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onPointerUp={this.handleMouseUp.bind(this)}
      >
        { this.state.annotations.map(createAnnotations) }
      </svg>
    );
  }
}

const createAnnotations = (() => {
  let fn = (el) => h(...el);
  if (!isVectorEffectSupported()) { // IE and Edge fix
    fn = (el) => {
      const newEl = el;
      newEl[1]['stroke-width'] = convertWidth.toPercent(STROKE_SIZE);
      return h(...newEl);
    };
  }
  return fn;
})();

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

const svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%',
};
