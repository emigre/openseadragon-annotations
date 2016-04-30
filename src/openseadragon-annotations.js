import OpenSeadragon from 'OpenSeadragon';
import Context from 'holy-grail';
import Annotations from './annotations/Annotations';
import Draw from './state/Draw';
import Move from './state/Move';
import Controls from './controls/Controls';
import Overlay from './overlay/Overlay';

export default OpenSeadragon.Viewer.prototype.initializeAnnotations = function () {
  var context = new Context();
  context.register('annotations', Annotations, ['controls', 'overlay', 'draw', 'move']);
  context.register('draw', Draw, ['overlay']);
  context.register('move', Move);
  context.register('controls', Controls);
  context.registerSingleton('overlay', Overlay);

  this.annotations = this.annotations || context.resolve('annotations');
  this.addHandler('open', function () {
    this.annotations.initialize.call(this.annotations, this)
  }.bind(this));
};
