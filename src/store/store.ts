import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducersCombined';

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f,
  ),
);
