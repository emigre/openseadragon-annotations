import { extend, Button } from 'OpenSeadragon';
import { selectMode } from '../actions/mode';

export default class Control {
  constructor(options) {
    return new Button(extend({
      onClick: this.onClick,
    }, options));
  }

  onClick(e) {
    if (e.eventSource.Tooltip) {
      selectMode(e.eventSource.Tooltip.toUpperCase());
    }
  }
}
