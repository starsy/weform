import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import loginReducer from './login';
import formReducer from './form';
//import todosReducer from './forms';

function createStore() {
  const rootReducer = combineReducers({
    login: loginReducer,
    form: formReducer,
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
