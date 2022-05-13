import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from 'connected-next-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createMiddleware from 'redux-saga';
import Router from 'next/router';

import scheduleReducer from 'store/reducers/schedule';
import userReducer from 'store/reducers/user';
import rootSaga from 'store/sagas';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  user: userReducer,
  router: routerReducer,
});

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware)),
// );

// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (typeof window !== 'undefined' && state?.router) {
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const sagaMiddleware = createMiddleware();
const routerMiddleware = createRouterMiddleware();

export const initStore = (context) => {
  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(initStore);
