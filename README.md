# calendar

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-calendar.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-calendar
[download-image]: https://img.shields.io/npm/dm/fdt-calendar.svg?style=flat-square
[download-url]: https://npmjs.org/package/fdt-calendar

## Screenshots

### 月历
<img src="http://img.investmaster.cn/fdt_hz/other_html/Screenshots1.jpg" width="288"/>

### 周历
<img src="http://img.investmaster.cn/fdt_hz/other_html/Screenshots2.png" width="288"/>

## Demo

https://bayun2.github.io/calendar/docs/

## install

[![fdt-calendar](https://nodei.co/npm/fdt-calendar.png)](https://npmjs.org/package/fdt-calendar)

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'fdt-calendar';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.render(<Calendar />, rootEl);

```

## Props
+ curTime: ?String -'2017/4/21' 中间的月份:0~11，如前面指定的传入，其实是指定5月份
+ selectTimeCb: ?Func 选择时间以后的回调函数，会一个time(如：'2017/4/21') 中间的月份:0~11，例子中的4其实选中的是5月
+ type: ?String -'month' | 'week' 默认以月历展示还是周历

## License

The MIT License (MIT)

Copyright (c) 2015 Your Github name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
