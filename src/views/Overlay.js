import { h, Component } from 'preact';

class Overlay extends Component {
  constructor(...args) {
    super(...args);
    // In Internet Explorer and Edge we can not rely on vector-effect="non-scaling-stroke"
    // to maintain constant the witdh of the SVG strokes during zoom
    const vectorEffectNotAvailable = document.documentElement.style.vectorEffect === undefined;
    const standardRender = (el) => h(...el);
    const renderForIeAndEdge = (el, model) => {
      const newEl = el;
      const baseWidth = 3;
      let percentWidth;
      const totalImageWidthInPixels = model.getWidth();
      if (totalImageWidthInPixels === 0) { percentWidth = 0; } // image not yet initialized
      percentWidth = (baseWidth * 100) / totalImageWidthInPixels;
      newEl[1]['stroke-width'] = percentWidth;
      return h(...newEl);
    };
    this.renderElement = vectorEffectNotAvailable ? renderForIeAndEdge : standardRender;
  }

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
      this.state.annotations.map((el) => this.renderElement(el, this.props.model)),
    );
  }
}

export default Overlay;
