import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import * as formActions from '../redux/form';
import loglevel from 'loglevel';

const log = loglevel.getLogger('formSaga');

export function* load(action) {
  try {
    log.info("action", action);

    yield wx.showLoading({title: "登录中"});

    // 在这里写异步操作代码
    let table = yield getTable(action.payload.id, action.payload.session);

    // 将异步操作结果更新至Redux
    yield put(formActions.loadSuccess(table));
  } catch (error) {
    log.error("Error when loading table", error);
    yield put(formActions.loadFail(error));
  } finally {
    wx.hideLoading();
  }
}

export function* createRow(action) {
  
}

async function getTable(id, s) {
  let res = null;
  try {
    log.info("get table:" + id);
    res = await request.get('form/' + id, {}, {s: s});
  } catch (e) {
    log.error("Error when getting form: ", e);
    return null;
  }
  log.info("table response:", res);
  return res;
}
