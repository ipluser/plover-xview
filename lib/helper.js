'use strict';


const assert = require('assert');
const escape = require('escape-html');
const SafeString = require('plover-util/lib/safe-string');


const XVIEW = require('./symbol').XVIEW;
assert(XVIEW, 'symbole.XVIEW should exists');


const RD = Symbol('rd');


/*
 * 此方法在由框架自动调用，用于注入一些帮助方法
 *
 * 视图中可以使用以下数据和方法
 *
 * - csrf
 * - ctoken
 *
 * - $.viewdata(name, value)
 * - $.viewdata(map)
 *
 * - $.addClass(classes)
 *
 * - $.attr(name, value)
 * - $.attr(map)
 */

class Helper {
  static $init(rd) {
    rd.data[XVIEW] = rd.data[XVIEW] || {
      viewdata: {},
      classes: [],
      attrs: {}
    };

    rd.data.csrf = rd.ctx.csrf;
    rd.data.ctoken = rd.ctx.ctoken;
  }


  constructor(rd) {
    this[XVIEW] = rd.data[XVIEW];
    this[RD] = rd;
  }


  viewdata() {
    return addViewdata(this[XVIEW].viewdata, arguments);
  }


  addClass(cn) {
    this[XVIEW].classes.push(cn);
    return '';
  }


  attr(name, value) {
    const xview = this[XVIEW];
    if (typeof name === 'string') {
      xview.attrs[name] = value;
    } else if (typeof name === 'object') {
      Object.assign(xview.attrs, name);
    }
  }


  metaTags(opts) {
    opts = opts || {};
    const rd = this[RD];
    if (rd.route.type !== 'layout') {
      return '';
    }

    const ctx = rd.ctx;
    const settings = ctx.settings;
    const config = settings.xview || {};

    let tags = `<meta name="x-env" content="${settings.env}" />`;
    if (ctx.csrf) {
      tags += `\n<meta name="x-csrf" content="${ctx.csrf}" />`;
    }
    if (ctx.ctoken) {
      tags += `\n<meta name="x-ctoken" content="${ctx.ctoken}" />`;
    }

    if (opts.viewdata) {
      const data = {};
      config.viewdata && Object.assign(data, config.viewdata);
      Object.assign(data, this[XVIEW].viewdata);
      tags += `\n<meta name="x-viewdata" content="${escape(JSON.stringify(data))}"`;  // eslint-disable-line
    }

    return new SafeString(tags);
  }
}


module.exports = Helper;


/*
 * 通过viewdata可以规范化前端数据的传递
 */
function addViewdata(cache, args) {
  const data = args[0];
  if (typeof data === 'string') {
    cache[args[0]] = args[1];
  } else if (typeof data === 'object') {
    Object.assign(cache, data);
  }
  return '';
}

