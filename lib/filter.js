'use strict';


const assert = require('assert');

const createTag = require('create-tag');

const XVIEW = require('./symbol').XVIEW;


// filter name for log
exports.name = 'xview';


/**
 * 每个模块渲染完会调用此方法
 */
exports.afterRender = function() {
  // 可以使用xview = false 关闭xview功能
  if (this.xview === false ||
      this.query._xview === 'false') {    // eslint-disable-line
    return;
  }

  const route = this.route;
  if (route.type !== 'layout') {
    filterContent(this, route);
  }
};


/*
 * 对非布局模块的渲染结果进行装饰
 */
function filterContent(self, route) {
  // 默认添加 xview  {module}-{action}两个class
  const cns = ['x-view'];
  const name = route.module + '-' + route.action;
  cns.push(name);

  // 模块通过$.addClass添加的额外class
  const cache = self.data[XVIEW];
  assert(cache, 'xview cache should be exists');

  const classes = cache.classes;
  classes.length && cns.push(classes.join(' '));

  const attrs = {};
  attrs.class = cns.join(' ');

  // 添加data-x-id属性
  attrs['data-x-id'] = route.module + ':' + route.action;

  // 如果有js, 添加data-x-type属性
  const vinfo = self.minfo.views[route.action];
  if (vinfo && vinfo.js) {
    attrs['data-x-type'] = route.module + '/' + route.action;
  }

  // 有配置的话则添加data-x-viewdata属性
  if (Object.keys(cache.viewdata).length > 0) {
    attrs['data-x-viewdata'] = JSON.stringify(cache.viewdata);
  }

  Object.assign(attrs, cache.attrs);

  // 创建一个div包在模块外面
  self.body = createTag('div', attrs, self.body);
}
