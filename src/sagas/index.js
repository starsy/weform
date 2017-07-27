import { takeLatest } from 'redux-saga';
import { STARTUP } from '../redux/startup';
import { LOGIN } from '../redux/login';
import { REFRESH } from '../redux/user';
import { LOAD } from '../redux/form';
import { REMOVE } from '../redux/forms';
import startup from './startup';
import login from './login';
import load from './form';
import user from './user';
import * as todoSagas from './todos';

// 当action触发时，执行特定saga
export default function* root() {
  
  yield [
    takeLatest(STARTUP, startup),
    takeLatest(LOGIN, login),
    takeLatest(LOAD, load),
    //takeLatest(REFRESH, user),
    //takeLatest(REMOVE, todoSagas.removeSaga),
  ];
  
}
