import { extend } from 'OpenSeadragon';

const reactToGeneralAction = (model) =>
  (action) => {
    switch (action.type) {
      case 'MODE_UPDATE':
        model.data.activityInProgress = false;
        if (model.data.mode !== action.mode) {
          model.data.mode = action.mode;
        }
        break;

      case 'ACTIVITY_UPDATE':
        model.data.activityInProgress = action.inProgress;
        break;

      case 'PRESS':
        if (model.data.mode === 'DRAW') {
          model.data.activityInProgress = true;
          model.data.annotations.push([
            'path',
            {
              fill: 'none',
              d: `M${action.x} ${action.y}`,
              stroke: 'red',
              'stroke-width': 3,
              'stroke-linejoin': 'round',
              'stroke-linecap': 'round',
              'vector-effect': 'non-scaling-stroke',
            },
          ]);
        }
        break;

      case 'RELEASE':
        if (model.data.mode === 'DRAW') {
          model.data.activityInProgress = false;
        }
        break;

      case 'MOVE':
        if (model.data.mode === 'DRAW' && model.data.activityInProgress === true) {
          const annotations = model.data.annotations;
          const lastAnnotation = annotations[annotations.length - 1];
          if (lastAnnotation && lastAnnotation[0] === 'path') {
            lastAnnotation[1].d += ` L${action.x} ${action.y}`;
          }
        }
        break;

      case 'ANNOTATIONS_RESET':
        model.data.activityInProgress = false;
        model.data.annotations = action.annotations || [];
        break;

      case 'ZOOM_UPDATE':
        model.data.zoom = action.zoom;
        break;

      case 'LEAVE_CANVAS':
        if (model.data.mode === 'DRAW') {
          model.data.activityInProgress = false;
        }
        break;

      case 'INITIALIZE':
        model.data.zoom = action.zoom;
        model.data.width = action.width;
        model.data.height = action.height;
        break;

      default:
        break;
    }
    model.raiseEvent('CHANGE_EVENT');
  };

export default reactToGeneralAction;

