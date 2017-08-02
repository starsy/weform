import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { loginSuccess, loginFailure } from '../redux/login';
import loglevel from 'loglevel';

const log = loglevel.getLogger('loginSaga');

// 请求登录
export default function* loginSaga() {
  try {
    /*
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request.post('api/login', {
      code: res.code,
      ...data
    });
    */    
    yield wx.showLoading({title: "登录中"});

    yield login3rdSession();

    let userInfo = yield wx.getUserInfo();
    yield saveStorageLocal('userInfo', userInfo.userInfo);
    let thirdSession = yield getStorageLocal('thirdSession');

    log.info("--------------");
    log.info("userInfo:", userInfo.userInfo);
    log.info("thirdSession:", thirdSession.data);
    log.info("--------------");
    
    yield put(loginSuccess(userInfo.userInfo, thirdSession.data));
    yield wx.hideLoading();
  } catch (error) {
    log.info('login error', error);
    yield put(loginFailure(error));
  }
}

async function getStorageLocal(key) {
  log.info("Get %s from local", key);
  try {
    return await wx.getStorage({key: key});
  } catch (e) {
    log.error("error when getting " + key + " from storage", e);
  }
}

async function saveStorageLocal(key, value) {
  log.info("Save locally: '%s' => '%s'", key, value);
  if (!key || !value) {
    return;
  }
  try {
    await wx.setStorage({key: key, data: value});
  } catch (e) {
    log.error("error when saving to storage: " + key + " => " + value, e);
  }
}

async function check3rdSession() {
  log.info("Check 3rd session");
  let thirdSession = await getStorageLocal('thirdSession');
  log.info("thirdSession", thirdSession);

  if (thirdSession.data) {
    thirdSession = thirdSession.data;
  } else {
    thirdSession = null;
  }

  if (!thirdSession) {
    await login3rdSession();
  } else {
    let {data: res} = await request.get('check_3rd_session?s=' + thirdSession);
    log.info("status: ", res);

    if (res) {
      if (!res.valid) {
        log.info("3rd session is NOT valid");
        await login3rdSession();
      } else {

        log.info("3rd session is valid");
      }
      return res.valid;
    }
  }
};

async function get3rdSessionFromServer(userInfo, code) {
  log.info("Get 3rd session from server");
  log.info("userInfo: ", userInfo, "code: ", code);

  let {data: res} = await request.post("login?code=" + code, userInfo);
  if (res) {
    log.info("Success Login Server Response: ", res);
    return res.third_session;
  } else {
    return null;
  }
}

async function login3rdSession() {
  log.info("Login 3rd session");

  let res = null, loginCode = null;
  try {
    res = await wx.login();
    if (res) {
      loginCode = res.code;
    }
  } catch (e) {
    log.error("Error when login", e);
    return;
  }

  if (loginCode) {
    try {
      res = await wx.getUserInfo();
    } catch (e) {
      log.error("Error when getUserInfo", e);
    }
    log.info("res: ", res);
    if (!res) {
      return;
    }

    try {
      const thirdSession = await get3rdSessionFromServer(res.userInfo, loginCode);
      await saveStorageLocal("thirdSession", thirdSession);
    } catch (e) {
      log.error("Error when get 3rd session from server", e);
    }
  }
};
