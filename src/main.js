import createAnnotations from './createAnnotations';
import createDispatch from './model/createDispatch';
import generalActions from './model/generalActions';
import Model from './model/Model';

export default ({ viewer }) => {
  const model = new Model();
  const dispatch = createDispatch(model, generalActions);
  const annotations = createAnnotations({ viewer, model, dispatch });
  viewer.addHandler('open', () => annotations.initialize());
  viewer.addHandler('zoom', ({ zoom }) =>
    annotations.dispatch({ type: 'ZOOM_UPDATE', zoom }));
  if (viewer.isOpen()) { annotations.initialize(); }
  return annotations;
};
