import { extend } from 'OpenSeadragon';

const general = (model) =>
  (action) => {
    switch (action.type) {
      case 'MODE_UPDATE':
        model.data.mode = action.mode;
        break;

      case 'ACTIVITY_UPDATE':
        model.data.activityInProgress = action.inProgress;
        break;

      case 'ANNOTATIONS_CREATE':
        model.data.annotations.push(action.annotation);
        break;

      case 'ANNOTATIONS_UPDATE_LAST':
        extend(model.getLast()[1], action.update);
        break;

      case 'ANNOTATIONS_RESET':
        model.data.annotations = action.annotations;
        break;

      case 'ZOOM_UPDATE':
        model.data.zoom = action.zoom;
        break;

      case 'INITIALIZE':
        extend(model.data, action.options);
        break;

      default:
        break;
    }
    model.raiseEvent('CHANGE_EVENT');
  };

export default general;

