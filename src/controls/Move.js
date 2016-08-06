import Control from './Control';
import moveGroupHover from '../../img/move_grouphover.png';
import moveHover from '../../img/move_hover.png';
import movePressed from '../../img/move_pressed.png';
import moveRest from '../../img/move_rest.png';

export default class Move extends Control {
  constructor() {
    super({
      Tooltip: 'Move',
      srcRest: moveRest,
      srcGroup: moveGroupHover,
      srcHover: moveHover,
      srcDown: movePressed,
    });
  }
}
