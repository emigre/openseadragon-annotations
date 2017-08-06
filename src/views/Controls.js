import { extend, Button, ControlAnchor } from 'OpenSeadragon';
import selectMode from '../actions/selectMode';

import drawGroupHover from '../../img/draw_grouphover.png';
import drawHover from '../../img/draw_hover.png';
import drawPressed from '../../img/draw_pressed.png';
import drawRest from '../../img/draw_rest.png';

import moveGroupHover from '../../img/move_grouphover.png';
import moveHover from '../../img/move_hover.png';
import movePressed from '../../img/move_pressed.png';
import moveRest from '../../img/move_rest.png';

export class Control {
  constructor(options) {
    this.dispatcher = options.dispatcher;
    this.model = options.model;
    this.viewer = options.viewer;
    this.mode = options.Tooltip.toUpperCase();
    this.btn = new Button(extend({
      onClick: (e) => { this.onClick(e); },
    }, options));
    this.viewer.addControl(this.btn.element, {
      anchor: ControlAnchor.BOTTOM_LEFT,
    });
    if (this.model.getMode() === this.mode) {
      this.activate();
    }
    this.model.addHandler('CHANGE_EVENT', () => {
      if (this.model.getMode() === this.mode) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  activate() {
    this.btn.imgDown.style.visibility = 'visible';
  }

  deactivate() {
    this.btn.imgDown.style.visibility = 'hidden';
  }

  onClick({ eventSource }) {
    if (eventSource.Tooltip) {
      selectMode(eventSource.Tooltip.toUpperCase(), this.dispatcher, this.model);
    }
  }
}

export class DrawControl extends Control {
  constructor(options) {
    super({
      Tooltip: 'Draw',
      srcRest: drawRest,
      srcGroup: drawGroupHover,
      srcHover: drawHover,
      srcDown: drawPressed,
      ...options,
    });
  }
}

export class MoveControl extends Control {
  constructor(options) {
    super({
      Tooltip: 'Move',
      srcRest: moveRest,
      srcGroup: moveGroupHover,
      srcHover: moveHover,
      srcDown: movePressed,
      ...options,
    });
  }
}
