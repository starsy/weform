import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { loginSuccess, loginFailure } from '../redux/login';
//import { load } from '../redux/user';

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

    yield login3rdSession();

    let userInfo = yield wx.getUserInfo();
    yield saveStorageLocal('userInfo', userInfo.userInfo);
    let thirdSession = yield getStorageLocal('thirdSession');

    console.info("--------------");
    console.info("userInfo:", userInfo.userInfo);
    console.info("thirdSession:", thirdSession.data);
    console.info("--------------");
    
    yield put(loginSuccess(userInfo.userInfo, thirdSession.data));
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}



async function getStorageLocal(key) {
  console.info("Get %s from local", key);
  try {
    return await wx.getStorage({key: key});
  } catch (e) {
    console.error("error when getting " + key + " from storage", e);
  }
}

async function saveStorageLocal(key, value) {
  console.info("Save locally: '%s' => '%s'", key, value);
  if (!key || !value) {
    return;
  }
  try {
    await wx.setStorage({key: key, data: value});
  } catch (e) {
    console.error("error when saving to storage: " + key + " => " + value, e);
  }
}

async function check3rdSession() {
  console.info("Check 3rd session");
  let thirdSession = await getStorageLocal('thirdSession');
  console.info("thirdSession", thirdSession);

  if (thirdSession.data) {
    thirdSession = thirdSession.data;
  } else {
    thirdSession = null;
  }

  if (!thirdSession) {
    await login3rdSession();
  } else {
    let res = await wx.request({
      url: 'http://localhost/check_3rd_session?s=' + thirdSession,
      method: "GET"
    });

    console.log("status: ", res);

    if (res) {
      if (!res.data.valid) {
        console.info("3rd session is NOT valid");
        await login3rdSession();
      } else {

        console.info("3rd session is valid");
      }
      return res.data.valid;
    }
  }
};

async function get3rdSessionFromServer(userInfo, code) {
  console.info("Get 3rd session from server");
  console.log("userInfo: ", userInfo, "code: ", code);

  let res = await wx.request({
    method: "POST",
    url: "http://localhost/login?code=" + code,
    data: userInfo
  });

  if (res) {
    console.log("Success Login Server Response: ", res.data);
    return res.data.third_session;
  } else {
    return null;
  }

}

async function login3rdSession() {
  console.info("Login 3rd session");

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
    console.info("res: ", res);
    if (!res) {
      return;
    }

    try {
      const thirdSession = await get3rdSessionFromServer(res.userInfo, loginCode);
      await saveStorageLocal("thirdSession", thirdSession.data);
    } catch (e) {
      log.error("Error when get 3rd session from server", e);
    }
  }
};
