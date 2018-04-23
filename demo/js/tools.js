import superagent from 'superagent';

let tools = (function() {
  let self = {};
  self.sleep = function(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, time);
    })
  };
  /**
   * http请求
   * @method httpAgent
   * @param  {[type]}  url    [description]
   * @param  {[type]}  method [description]
   * @param  {[type]}  data   [description]
   * @return {[type]}         [description]
   */
  self.httpAgent = (url, method = 'get', data = '') => {
    method = method.toLowerCase();
    if (method == "get" || method == "del") {
      return new Promise(function(resolve, reject) {
        superagent[method].call(this, url).query(data).end(function(err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise(function(resolve, reject) {
        superagent[method].call(this, url).send(data).end(function(err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    }
  }
  /**
   * 获取字符串长度，区分中英文
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  self.getCharLen = function(str) { //获取字符串长度，区分中英文
    return str.replace(/[^\x00-\xff]/g, "rr").length;
  }
  /**
   * 生成uuid
   * @method uuid
   * @return {[type]} [description]
   */
  self.uuid = function() {
    var chars = CHARS,
      uuid = new Array(36),
      rnd = 0,
      r;
    for (var i = 0; i < 36; i++) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        uuid[i] = '-';
      } else if (i == 14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  return self;
}());

module.exports = tools;