import { h, Component } from 'preact';

const convertWidthToPercent = (horizontalMeasureInPixels, model) => {
  const totalImageWidthInPixels = model.getWidth();
  if (totalImageWidthInPixels === 0) { return 0; } // image not yet initialized
  return (horizontalMeasureInPixels * 100) / totalImageWidthInPixels;
};

const createAnnotations = (() => {
  let fn = el => h(...el);
  // IE and Edge fix. Checks if we can not rely on vector-effect="non-scaling-stroke"
  // to maintain constant the witdh of the SVG strokes during zoom
  if (!(document.documentElement.style.vectorEffect !== undefined)) {
    fn = (el) => {
      const newEl = el;
      newEl[1]['stroke-width'] = convertWidthToPercent(3, this.props.model);
      return h(...newEl);
    };
  }
  return fn;
})();

class Annotations extends Component {
  getInitialState() {
    return { annotations: this.props.model.getAll() };
  }

  componentDidMount() {
    this.props.model.addHandler('CHANGE_EVENT', () => {
      this.setState({ annotations: this.props.model.getAll() });
    });
  }

  onMouseDown = (e) => {
    if (this.props.model.notInMoveMode()) {
      e.stopPropagation();
      this.props.dispatch({ type: 'PRESS', ...this.calculateCoords(e) });
    }
  };

  onMouseMove = (e) => {
    if (this.props.model.notInMoveMode()) {
      e.stopPropagation();
      this.props.dispatch({ type: 'MOVE', ...this.calculateCoords(e) })
    }
  };

  onMouseUp = (e) => {
    if (this.props.model.notInMoveMode()) {
      e.stopPropagation();
      this.props.dispatch({ type: 'RELEASE' });
    }
  };

  onMouseLeave = (e) => {
    if (this.props.model.notInMoveMode()) {
      e.stopPropagation();
      this.props.dispatch({ type: 'LEAVE_CANVAS' });
    }
  };

  calculateCoords(e) {
    const rect = this.base.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = (100 * offsetX) / rect.width;
    const y = (100 * offsetY) / rect.height;
    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
  }

  render() {
    const { onMouseDown, onMouseLeave, onMouseMove, onMouseUp } = this;
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        version: '1.1',
        preserveAspectRatio: 'none',
        viewBox: '0 0 100 100',
        width: '100%',
        height: '100%',
        style: {
          cursor: 'default',
          'background-color': 'rgba(0,0,0,0)', // IE 9-10 fix
        },
        onMouseDown,
        onMouseLeave,
        onMouseMove,
        onMouseUp,
        onPointerDown: onMouseDown,
        onPointerUp: onMouseUp,
      },
      this.state.annotations.map(createAnnotations),
    );
  }
}

export default Annotations;
