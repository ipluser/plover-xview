# xview


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

对模块页面进行标识和包装。

e.g.

模块名称为**Hello**，Action名称为**view**，页面内容为：

```html
<p>hello world~</p>
```

通过**plover-xview**处理后，页面渲染结果：

```html
<div class="x-view hello-view" data-x-id="hello:view" data-x-type="hello/view">
  <p>hello world~</p>
</div>
```

**plover-xview**会对模块页面使用`div`进行包装，为其添加**x-view**和**moduleName-actionName**默认的`class`，设置`data-x-id`属性为**moduleName:actionName**和`data-x-type`属性为**moduleName/actionName**。

**Note**

在**controller**中通过`this.xview = false;`关闭**plover-xview**模块的处理。


## `$` Helper
提供**$**帮助对象方法对**xview**进行扩展。

### addClass
为**xview**添加类名。

##### usage

```html
{{$.addClass('testClassName')}}

<p>hello world~</p>
```

处理后的模块页面内容：

```html
<div class="x-view hello-view testClassName" data-x-id="hello:view" data-x-type="hello/view">
  <p>hello world~</p>
</div>
```

### attr
为**xview**添加属性。

##### usage
```js
{{$.attr('attr1', 'value1')}}
{{$.attr({ attr2: 'value2', attr3: 'value3' })}}

<p>hello world~</p>
```

处理后的模块页面内容：

```html
<div class="x-view hello-view" data-x-id="hello:view" data-x-type="hello/view"
 attr1="value1" attr2="value2" attr3="value3">
  <p>hello world~</p>
</div>
```

##### viewdata
后端传递数据到前端。

##### usage
```js
{{$.viewdata('name', 'plover')}}

<p>hello world~</p>
```

处理后的模块页面内容：

```html
<div class="x-view hello-view" data-x-id="hello:view" data-x-type="hello/view" data-x-viewdata="{'name': 'plover'}">
  <p>hello world~</p>
</div>
```

### metaTags
为页面添加`meta`标签，格式为:

```html
<meta name="x-viewdata" content="${viewdata}" />
```

##### usage
```js
{{$.metaTags({viewdata: true})}}
```


[npm-image]: https://img.shields.io/npm/v/plover-xview.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/plover-xview
[travis-image]: https://img.shields.io/travis/plover-modules/plover-xview/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/plover-modules/plover-xview
[coveralls-image]: https://img.shields.io/codecov/c/github/plover-modules/plover-xview.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/plover-modules/plover-xview?branch=master

