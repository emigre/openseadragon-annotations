import { h, Component } from 'preact';
import Store from '../store/Store';
import click from '../actions/click';
import enterCanvas from '../actions/enterCanvas';
import leaveCanvas from '../actions/leaveCanvas';
import move from '../actions/move';
import press from '../actions/press';
import release from '../actions/release';
import modes from '../constants/modes';

export default class Annotations extends Component {
  getInitialState() {
    return { annotations: Store.getAll() };
  }

  componentDidMount() {
    Store.addHandler('change', () => {
      this.setState({ annotation: Store.getAll() });
    });
  }

  coords(e) {
    const width = this.base.clientWidth;
    const height = this.base.clientHeight;
    const rect = this.base.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = offsetX / width * 100;
    const y = offsetY / height * 100;
    return [ x, y ];
  }

  render() {
    return (
      <svg {...svgProperties}
        onClick={ unlessInMoveMode((e) => click(...this.coords(e))) }
        onMouseDown={ unlessInMoveMode((e) => press(...this.coords(e)))}
        onMouseEnter={ unlessInMoveMode(enterCanvas) }
        onMouseLeave={ unlessInMoveMode(leaveCanvas) }
        onMouseMove={ unlessInMoveMode((e) => move(...this.coords(e)))}
        onMouseUp={ (e) => release(...this.coords(e)) }
      >
        { this.state.annotations.map(el => h(...el)) }
      </svg>
    );
  }
}

function unlessInMoveMode(fn) {
  return (e) => {
    if (Store.getMode() !== modes.MOVE) {
      e.stopPropagation();
      fn(e);
    }
  };
}

const svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%',
};
