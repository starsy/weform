import { setStore } from 'labrador-redux';
import store from './redux';
import loglevel from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

(function() {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  Date.prototype.toISOTimeString = function () {
    return pad(this.getUTCHours()) +
      ':' + pad(this.getUTCMinutes()) +
      ':' + pad(this.getUTCSeconds()) +
      '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
  };
}());

loglevel.enableAll();
prefix.apply(loglevel, {
  template: '%t %l [%n]:',
  timestampFormatter: function (date) {
    return date.toISOTimeString()
  },
  levelFormatter: function (level) {
    return level.toUpperCase();
  },
  nameFormatter: function (name) {
    return name || 'root';
  }
});

if (__DEV__) {
  loglevel.warn('当前为开发环境');
}

// 向labrador-redux注册store
setStore(store);

export default class {
  async onLaunch() {

  }
}
