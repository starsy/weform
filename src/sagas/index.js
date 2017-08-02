import { takeLatest } from 'redux-saga';
import { STARTUP } from '../redux/startup';
import { LOGIN } from '../redux/login';
import { REFRESH } from '../redux/user';
import { LOAD, CREATE_ROW } from '../redux/form';
import { REMOVE } from '../redux/forms';
import startup from './startup';
import login from './login';
import * as form from './form';
import user from './user';

// 当action触发时，执行特定saga
export default function* root() {
  yield [
    takeLatest(STARTUP, startup),
    takeLatest(LOGIN, login),
    takeLatest(LOAD, form.load),
    takeLatest(CREATE_ROW, form.createRow),
    //takeLatest(REFRESH, user),
    //takeLatest(REMOVE, todoSagas.removeSaga),
  ];
  
}
