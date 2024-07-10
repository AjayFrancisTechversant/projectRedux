import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import commentsReducer from '../Comments/reducer';

const rootReducer = combineReducers({
  comments: commentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //will work with or without middleware
});

export default store;
