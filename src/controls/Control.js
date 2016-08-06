import { extend, Button } from 'OpenSeadragon';
import selectMode from '../actions/selectMode';
import Store from '../store/Store';

export default class Control {
  constructor(options) {
    this.mode = options.Tooltip.toUpperCase();
    this.btn = new Button(extend({
      onClick: this.onClick,
    }, options));
    if (Store.getMode() === this.mode) {
      this.activate();
    }
    Store.addHandler('change', () => {
      if (Store.getMode() === this.mode) {
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
      selectMode(e.eventSource.Tooltip.toUpperCase());
    }
  }
}
