import { h, Component } from 'preact';
import Store from '../store/Store';
import { leaveCanvas, move, press, release } from '../actions/';
import { MOVE } from '../constants/modes';
import { CHANGE_EVENT } from '../constants/events';

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
    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;
    return [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
    ];
  }

  render() {
    return (
      <svg
        {...svgProperties}
        style={svgStyles}
        onMouseDown={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            press(...this.coords(e));
          }
        }}
        onPointerDown={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            press(...this.coords(e));
          }
        }}
        onMouseLeave={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            leaveCanvas();
          }
        }}
        onMouseMove={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            move(...this.coords(e));
          }
        }}
        onMouseUp={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            release();
          }
        }}
        onPointerUp={(e) => {
          if (Store.getMode() !== MOVE) {
            e.stopPropagation();
            release();
          }
        }}
      >
        { this.state.annotations.map(el => h(...el)) }
      </svg>
    );
  }
}

const svgStyles = {
  cursor: 'default',
  // IE 9-10 fix
  'background-color': 'rgba(0,0,0,0)',
}

const svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%',
};
