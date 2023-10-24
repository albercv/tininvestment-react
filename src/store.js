import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/reducer.js';

const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;