import { Dispatcher } from 'flux';

const createDispatch = (model, ...reactions) => {
  const dispatcher = new Dispatcher();
  reactions.forEach((reaction) => {
    dispatcher.register(reaction(model));
  });
  return (action) => dispatcher.dispatch(action);
};

export default createDispatch;
