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
          switch (model.style.type) {
            case 'polyline':
              model.annotations.push([
                'polyline',
                {
                  fill: 'none',
                  points: `${action.x},${action.y}`,
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
              break;
            case 'polygon':
              model.annotations.push([
                'polygon',
                {
                  fill: 'none',
                  points: `${action.x},${action.y}`,
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
              break;
            case 'line':
              model.annotations.push([
                'line',
                {
                  fill: 'none',
                  x1: action.x,
                  y1: action.y,
                  x2: action.x,
                  y2: action.y,
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
              break;
            case 'ellipse':
              model.annotations.push([
                'ellipse',
                {
                  fill: 'none',
                  cx: action.x,
                  cy: action.y,
                  // rx: '',
                  // ry: '',
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
              break;
            case 'rect':
              model.annotations.push([
                'rect',
                {
                  fill: 'none',
                  sx: action.x,
                  sy: action.y,
                  // x: '',
                  // y: '',
                  // width: '',
                  // height: '',
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
              break;
            default:
              model.annotations.push([
                'path',
                {
                  fill: 'none',
                  d: `M${action.x} ${action.y}`,
                  stroke: model.style.color || 'red',
                  'stroke-width': model.style.width || 3,
                  'stroke-linejoin': 'round',
                  'stroke-linecap': 'round',
                  'vector-effect': 'non-scaling-stroke',
                },
              ]);
          }
        }
        break;

      case 'RELEASE':
        if (model.mode === 'DRAW') {
          model.activityInProgress = false;
          if (model.addAnnotationCallback instanceof Function) {
            model.addAnnotationCallback();
          }
        }
        break;

      case 'MOVE':
        if (model.mode === 'DRAW' && model.activityInProgress === true) {
          const annotations = model.annotations;
          const lastAnnotation = annotations[annotations.length - 1];
          if (lastAnnotation) {
            switch (lastAnnotation[0]) {
              case 'polyline':
                lastAnnotation[1].points += ` ${action.x},${action.y}`;
                break;
              case 'polygon':
                lastAnnotation[1].points += ` ${action.x},${action.y}`;
                break;
              case 'line':
                lastAnnotation[1].x2 = action.x;
                lastAnnotation[1].y2 = action.y;
                break;
              case 'ellipse':
                lastAnnotation[1].rx = Math.abs(action.x - lastAnnotation[1].cx);
                lastAnnotation[1].ry = Math.abs(action.y - lastAnnotation[1].cy);
                break;
              case 'rect':
                lastAnnotation[1].x = lastAnnotation[1].sx < action.x ? lastAnnotation[1].sx : action.x;
                lastAnnotation[1].y = lastAnnotation[1].sy < action.y ? lastAnnotation[1].sy : action.y;
                lastAnnotation[1].width = Math.abs(lastAnnotation[1].sx - action.x);
                lastAnnotation[1].height = Math.abs(lastAnnotation[1].sy - action.y);
                break;
              default:
                lastAnnotation[1].d += ` L${action.x} ${action.y}`;
            }
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

