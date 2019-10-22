/**
 * @Author: 左盐
 * @Date:   2018-03-05 16:12:17
 * @Email:  huabinglan@163.com
 * @Last modified by:   左盐
 * @Last modified time: 2018-03-31 10:39:54
 */

import layerVue from './layer.vue';
import maskVue from './mask.vue';
let Notification = (function (Vue, globalOption = {
  msgtime: 1.5, //msg消失时间
}) {
  let NotificationConstructor = Vue.extend(layerVue);
  let maskLayer = Vue.extend(maskVue);
  let self = {};
  const defOptions = {
    type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
    title: '信息',
    content: '',
    area: 'auto',
    offset: 'auto',
    icon: -1,
    btn: '确定',
    time: 0,
    maxmin: false, //最大最小化
    shade: true,
    yes: '',
    cancel: '',
    tips: [0, {}], //支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
    tipsMore: false, //是否允许多个tips
    shadeClose: true,
    scrollbar: true, //是否允许浏览器出现滚动条:默认是允许
    resize: true //是否允许拉伸，默认是允许
  };
  self.instances = {};
  self.instancesVue = [];
  let seed = 0;


  /**
   * [function description]
   * @method function
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.open = function (options) {
    options = mergeJson(options, defOptions);
    let id = `notification_${new Date().getTime()}_${  seed++}`;
    options.id = id;
    options.layer = self;
    let instance = new NotificationConstructor({
      data: options
    });
    if (options.type == 2) {
      options.content.content = Vue.extend(options.content.content);
    }
    instance.id = id;
    instance.vm = instance.$mount();
    self.instances[id] = {
      inst: instance,
      type: options.type
    };
    document.body.appendChild(instance.vm.$el);
    self.instancesVue[id] = {
      'mask': '',
      'main': instance.vm,
      'iframe': '',
    }
    if (options.shade) { //是否显示遮罩
      let layerMask = document.querySelector('.vl-notify-mask');
      if (layerMask) {
        return;
        // document.body.removeChild(layerMask);
      }

      let maskInstance = new maskLayer({
        data: options
      });
      maskInstance.vm = maskInstance.$mount();
      document.body.appendChild(maskInstance.vm.$el);
      self.instancesVue[id].mask = maskInstance.vm;
    }
    return id;
  };
  /**
   * alert
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} yes     [description]
   * @return {[type]}         [description]
   */
  self.alert = function (content, options, yes) {
    switch (typeof (options)) {
      case 'function':
        yes = options;
        options = {};
        break;
      case 'object':
        break;
      default:
        options = {};
        break;
    }
    yes = typeof (yes) === 'function' ? yes : '';

    options.content = content || '';
    options.yes = yes;
    return self.open(options);
  }
  /**
   * alert
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} yes     [description]
   * @return {[type]}         [description]
   */
  self.confirm = function (content, options, yes, cancel) {
    switch (typeof (options)) {
      case 'function':
        cancel = yes;
        yes = options;
        options = {};
        break;
      case 'object':
        break;
      default:
        options = {};
        break;
    }
    yes = typeof (yes) === 'function' ? yes : '';
    cancel = typeof (cancel) === 'function' ? cancel : 'cancel';

    options.content = content || '';
    options.yes = yes;
    options.cancel = cancel;
    return self.open(options);
  }
  /**
   * [function description]
   * @method function
   * @param  {[type]} content [description]
   * @param  {[type]} options [description]
   * @param  {[type]} end     [description]
   * @return {[type]}         [description]
   */
  self.msg = function (content, options, end) {
    switch (typeof (options)) {
      case 'function':
        end = options;
        options = {};
        break;
      case 'object':
        break;
      default:
        options = {};
        break;
    }
    end = typeof (end) === 'function' ? end : '';
    options.type = 5;
    options.time = options.time ? options.time : globalOption.msgtime;
    options.content = content || 'this is a msg!!';
    options.yes = end;
    if (options.shade == undefined) {
      options.shade = false;
    }
    self.closeAll('msg');
    return self.open(options);
  }
  //loading
  self.loading = function (icon, options) {
    if (typeof (icon) === 'object') {
      options = icon;
      icon = 0;
    }
    options = options || {};
    options.icon = icon ? icon : 0;
    if (options.icon < 0 || options.icon > 2) {
      options.icon = 0;
    }
    if (!options.time) {
      options.time = 100;
    }
    options.type = 3;
    if (options.shade == undefined) {
      options.shade = true;
    }
    if (options.shadeClose == undefined) {
      options.shadeClose = false;
    }
    return self.open(options);
  }
  /**
   * tips
   * @method function
   * @param  {[type]} content [description]
   * @param  {[type]} follow  [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.tips = function (content, follow, options) {
    options = options || {};
    options.type = 4;
    options.content = content || '';
    options.title = follow || 'body';
    options.tips = options.tips || [0, {}];
    if (typeof (options.tips) !== 'object') {
      options.tips = [options.tips, {}];
    }
    if (options.shade == undefined) {
      options.shade = false;
    }
    if (!options.tipsMore) {
      self.closeAll('tips');
    }
    return self.open(options);
  }
  /**
   * [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  self.iframe = function (opt) {
    let option = {
      type: 2,
      content: opt.content,
      area: opt.area
    };
    option = mergeJson(option, opt);
    return self.open(option);
  }
  /**
   * 获取信息框
   */
  self.prompt = function (title = '请填写', yes = '', cancel = '', options = {
    formType: 1,
    value: ''
  }) {
    switch (typeof (cancel)) {
      case 'object':
        options = cancel;
        break;
    }

    options.content = '';
    options.yes = yes;
    options.type = 6;
    options.title = title;
    return self.open(options);
  }
  /**
   * 关闭一个弹窗
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  self.close = function (id) {
    let oElm = document.getElementById(id);
    // let layerMask = document.getElementById(id + '_mask');
    // if (layerMask) {
    //   document.body.removeChild(layerMask);
    //   if (self.instancesVue[id].mask) {
    //     self.instancesVue[id].mask.$destroy();
    //   }
    // }
    if (oElm) {
      document.body.removeChild(oElm);
      delete self.instances[id];
      self.instancesVue[id].main.$destroy();
      if (self.instancesVue[id].iframe != '') {
        self.instancesVue[id].iframe.$destroy();
      }
      //取消隐藏滚动条
      if (!self.instancesVue[id].main.scrollbar) {
        let scrollbarCount = 0;
        for (let key in self.instancesVue) {
          if (!self.instancesVue[key].main.scrollbar) {
            scrollbarCount++;
          }
        }
        if (scrollbarCount === 1) {
          const htmlDom = document.getElementsByTagName("html")[0];
          htmlDom.style.marginRight = "auto";
          htmlDom.classList.remove('vl-html-scrollbar-hidden');
        }
      }
      //控制遮罩
      if (self.instancesVue[id].main.shade) {
        let domCount = 0;
        for (let key in self.instancesVue) {
          if (self.instancesVue[key].main.shade) {
            domCount++;
          }
        }
        if (domCount === 1) {
          let layerMask = document.getElementsByClassName('vl-notify-mask')[0];
          let maskId = layerMask.getAttribute('id').replace('_mask', '');
          document.body.removeChild(layerMask);
          if (self.instancesVue[maskId]) {
            self.instancesVue[maskId].mask.$destroy();
          }
        }
      }
      delete self.instancesVue[id];
    } else {
      setTimeout(function () {
        let oElm = document.getElementById(id);
        if (oElm) {
          document.body.removeChild(oElm);
          delete self.instances[id];
          self.instancesVue[id].main.$destroy();
          if (self.instancesVue[id].iframe != '') {
            self.instancesVue[id].iframe.$destroy();
          }
        }
      }, 200);
    }
  }
  /**
   * 关闭一个弹窗
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  self.closeAll = function (type = -1) {
    let types = {
      'alert': 0,
      'page': 1,
      'iframe': 2,
      'loading': 3,
      'tips': 4,
      'msg': 5
    };
    if (type === -1) {
      for (let k in self.instances) {
        self.close(k);
      }
    } else {
      let targetType = types[type];
      for (let k in self.instances) {
        if (self.instances[k].type === targetType) {
          self.close(k);
        }
      }
    }
  }
  /**
   * get offset
   */
  // function getOffset() {
  //   let offset = [];
  //   offset.push(document.body.clientWidth);
  //   offset.push(document.body.clientHeight);
  //   return offset;
  // }

  /**
   * 合并json
   * @method mergeJson
   * @param  {[type]}  optons [description]
   * @param  {[type]}  def    [description]
   * @return {[type]}         [description]
   */
  function mergeJson(options, def) {
    for (let key in def) {
      if (options[key] == undefined) {
        options[key] = def[key];
      }
    }
    return options;
  }

  return self;
});

// module.exports = Notification;
export default Notification;