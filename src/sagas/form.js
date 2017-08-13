import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import * as formActions from '../redux/form';
import loglevel from 'loglevel';

const log = loglevel.getLogger('formSaga');

export function* load(action) {
  try {
    log.info("Load Form: action ", action);
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
  let {form_id, row, session} = action.payload;

  log.info("Create Row: action ", action);
  
  let _res, statusCode = null;
  try {
    log.info("create row for table:" + form_id);
    yield wx.showLoading({title: "保存中"});
    let {data: res, statusCode} = yield request.post('form/' + form_id + "/row", row, {s: session});
    
    _res = res;
    if (statusCode !== 200) {
      log.error("Error when create row for table: ", res, statusCode);
      return null;
    }
  } catch (e) {
    log.error("Error when create row for table: ", e);
    return null;
  } finally {
    wx.hideLoading();
  }
  
  log.info("create row response:", _res);

  yield put(formActions.createRowSuccess(_res));
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
  
  if (res.statusCode !== 200) {
    log.error("Error when getting form: ", res.data, res.statusCode);
    return null;
  }
  
  log.info("table response:", res.data);
  return res.data;
}
