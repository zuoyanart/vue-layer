let Notification = (function(vue) {
    let NotificationConstructor = vue.extend(require('./layer.vue'));
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
        shade: true,
        yes: '',
        cancel: '',
        tips: [0, {}], //支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
        tipsMore: false, //是否允许多个tips
        shadeClose: false
    };
    self.instances = {};
    let seed = 0;
    /**
     * [function description]
     * @method function
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    self.open = function(options) {
        options = mergeJson(options, defOptions);
        let id = `notification_${new Date().getTime()}_${  seed++}`;
        options.id = id;
        options.layer = self;
        let instance = new NotificationConstructor({
            data: options
        });
        if (options.type == 2) {
            options.content.content = vue.extend(options.content.content);
        }
        instance.id = id;
        instance.vm = instance.$mount();
        self.instances[id] = {
            inst: instance,
            type: options.type
        }
        document.body.appendChild(instance.vm.$el);
        return id;
    };
    /**
     * alert
     * @param  {[type]} content [description]
     * @param  {[type]} options [description]
     * @param  {[type]} yes     [description]
     * @return {[type]}         [description]
     */
    self.alert = function(content, options, yes) {
        switch (typeof(options)) {
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
        yes = typeof(yes) === 'function' ? yes : '';

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
    self.confirm = function(content, options, yes, cancel) {
        switch (typeof(options)) {
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
        yes = typeof(yes) === 'function' ? yes : '';
        cancel = typeof(cancel) === 'function' ? cancel : 'cancel';

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
    self.msg = function(content, options, end) {
        switch (typeof(options)) {
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
        end = typeof(end) === 'function' ? end : '';
        options.type = 5;
        options.time = options.time ? options.time : 1.5;
        options.content = content || 'this is a msg!!';
        options.yes = end;
        self.closeAll('msg');
        return self.open(options);
    }
    //loading
    self.loading = function(icon, options) {
        if (typeof(icon) === 'object') {
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
    self.tips = function(content, follow, options) {
        options = options || {};
        options.type = 4;
        options.content = content || '';
        options.title = follow || 'body';
        options.tips = options.tips || [0, {}];
        if (typeof(options.tips) !== 'object') {
            options.tips = [options.tips, {}];
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
    self.iframe = function(opt) {
        let option = {
            type: 2,
            content: opt.content,
            area: opt.area
        };
        option = mergeJson(option, opt);
        // console.log('option');
        // console.log(option);
        return self.open(option);
    }
    /**
     * 关闭一个弹窗
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    self.close = function(id) {
        let oElm = document.getElementById(id);
        if (oElm) {
            oElm.remove();
            delete self.instances[id];
        } else {
            setTimeout(function() {
                let oElm = document.getElementById(id);
                if (oElm) {
                    oElm.remove();
                    delete self.instances[id];
                }
            }, 200);
        }
    }
    /**
     * 关闭一个弹窗
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    self.closeAll = function(type = -1) {
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
    function getOffset() {
        let offset = [];
        offset.push(document.body.clientWidth);
        offset.push(document.body.clientHeight);
        return offset;
    }

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

module.exports = Notification;