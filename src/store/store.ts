import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './redusersCombined';

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);
