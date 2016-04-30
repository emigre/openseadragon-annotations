import drawGroupHover from '../../img/draw_grouphover.png';
import drawHover from '../../img/draw_hover.png';
import drawPressed from '../../img/draw_pressed.png';
import drawRest from '../../img/draw_rest.png';

import moveGroupHover from '../../img/move_grouphover.png';
import moveHover from '../../img/move_hover.png';
import movePressed from '../../img/move_pressed.png';
import moveRest from '../../img/move_rest.png';

export default class Annotations {

  constructor(controls, overlay, draw, move) {
    this.draw = draw;
    this.move = move;
    this.overlay = overlay;
    this.controls = controls;
  }

  initialize(viewer) {
    this.viewer = viewer;
    this.overlay.initialize(viewer);
    this.controls.initialize(viewer, {
      controls: [
        {
          name: 'move',
          action: setState.bind(null, this, this.move),
          srcRest: moveRest,
          srcGroup: moveGroupHover,
          srcHover: moveHover,
          srcDown: movePressed
        },
        {
          name: 'draw',
          action: setState.bind(null, this, this.draw),
          srcRest: drawRest,
          srcGroup: drawGroupHover,
          srcHover: drawHover,
          srcDown: drawPressed
        }
      ]
    }).activate('move');
  }

  import(data) {
    this.overlay.import(data);
  }

  export() {
    return this.overlay.export();
  }

  reset() {
    return this.overlay.reset();
  }

}

function setState(annotations, newState) {
  if (annotations.state) { annotations.state.close(); }
  annotations.state = newState.initialize();
}
