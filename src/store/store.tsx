import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getUserInfo } from 'api/authApi';
import reducer from './reducers';

const api = getUserInfo();

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: () => void) => f
  )
);
