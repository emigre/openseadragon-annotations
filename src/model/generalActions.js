const reactToGeneralAction = (model) =>
  (action) => {
    switch (action.type) {
      case 'MODE_UPDATE':
        model.activityInProgress = false;
        if (model.mode !== action.mode) {
          model.mode = action.mode;
        }
        break;

      case 'ACTIVITY_UPDATE':
        model.activityInProgress = action.inProgress;
        break;

      case 'PRESS':
        if (model.mode === 'DRAW') {
          model.activityInProgress = true;
          model.annotations.push([
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
        if (model.mode === 'DRAW') {
          model.activityInProgress = false;
        }
        break;

      case 'MOVE':
        if (model.mode === 'DRAW' && model.activityInProgress === true) {
          const annotations = model.annotations;
          const lastAnnotation = annotations[annotations.length - 1];
          if (lastAnnotation && lastAnnotation[0] === 'path') {
            lastAnnotation[1].d += ` L${action.x} ${action.y}`;
          }
        }
        break;

      case 'ANNOTATIONS_RESET':
        model.activityInProgress = false;
        model.annotations = action.annotations || [];
        break;

      case 'ZOOM_UPDATE':
        model.zoom = action.zoom;
        break;

      case 'LEAVE_CANVAS':
        if (model.mode === 'DRAW') {
          model.activityInProgress = false;
        }
        break;

      case 'INITIALIZE':
        model.zoom = action.zoom;
        model.width = action.width;
        model.height = action.height;
        break;

      default:
        break;
    }

    model.raiseEvent('CHANGE_EVENT');
  };

export default reactToGeneralAction;

