# vue-touchjs 使用说明

## vue-touchjs

支持vue2.0的面向指令的touch指令，基于touchjs（原百度实现的移动端手势库）

## 指令名`v-touch`


* `v-touch`

```
 v-touch:tap="test($event)" 
```
* `.stop`

e.stopPropagation()方法的简写。

```
 v-touch:tap.stop="test($event)" 
```
vue-touchjs支持三种 `stopPropagation`的方式:

1. `.stop`修饰器
2. 事件handler里面调用`stopPropagation`方法
3. 事件handler里面`return false`

## 支持的事件

* tap
* pinchstart
* pinch
* pinchend
* pinchin
* pinchout
* rotateleft
* rotateright
* rotate
* swipestart
* swiping
* swipeendf
* swipeleft
* swiperight
* swipeup
* swipedown
* swipe
* drag
* dragstart
* dragend
* hold
* doubletap

其中 tap,是模拟点击事件，pinch模拟双指缩放，rorate是模拟旋转手势,swipe模拟快速滑动， drag模拟拖动，hold表示长按，doubletap模拟双击。


## 参考代码

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title></title>
    <style>
    div {
      width: 300px;
      height: 300px;
      background-color: #f00;
    }
    </style>
    <script>
    document.addEventListener('touchmove', function(e){
        e.stopPropagation();
        e.preventDefault();
    });
    document.addEventListener('touchstart', function(e){
        e.stopPropagation();
        e.preventDefault();
    });
    </script>
  </head>
  <body>
    <div 
      v-touch:tap="test($event)" 
      v-touch:doubletap="test($event)" 
      v-touch:hold="test($event)" 
      v-touch:swipeleft="test($event)" 
      v-touch:swiperight="test($event)" 
      v-touch:rotateright="test($event)" 
      v-touch:rotateleft="test($event)" 
     v-text="event"></div>
    <script src="example.build.js"></script>
  </body>
</html>

```

```js
var Vue = require('vue');
var VueTouch = require('vue-touchjs');

Vue.use(VueTouch);

new Vue({
    el: 'div',
    data: {
        event: ''
    },
    methods: {
        test: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.event = e.type;
            return false;
        }
    }
});
```