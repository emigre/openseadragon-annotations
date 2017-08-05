import { extend, Button } from 'OpenSeadragon';
import selectMode from '../actions/selectMode';
import Model from '../model/Model';
import Dispatcher from '../dispatcher/Dispatcher';

export default class Control {
  constructor(options) {
    this.mode = options.Tooltip.toUpperCase();
    this.btn = new Button(extend({
      onClick: this.onClick,
    }, options));
    if (Model.getMode() === this.mode) {
      this.activate();
    }
    Model.addHandler('CHANGE_EVENT', () => {
      if (Model.getMode() === this.mode) {
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

  onClick(e) {
    if (e.eventSource.Tooltip) {
      selectMode(e.eventSource.Tooltip.toUpperCase(), Dispatcher, Model);
    }
  }
}
