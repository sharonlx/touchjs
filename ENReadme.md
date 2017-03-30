SIMPLE TRANSLATION OF THE PROYECT TOUCHJS BY sharonlx

Support vue2.0 instruction-oriented touch instructions, based on touchjs (original Baidu mobile terminal gestures)

## Command name `v-touch`


* `V-touch`

`` ``
 V-touch: tap = "test ($ event)"
`` ``
* `.stop`

E.stopPropagation () method.

`` ``
 V-touch: tap.stop = "test ($ event)"
`` ``
Vue-touchjs supports three `stopPropagation` ways:

1. `.stop` decorator
2. The event handler calls the `stopPropagation` method
3. event handler inside `return false`

## Supported events

* Tap
* Pinchstart
* Pinch
* Pinchend
* Pinchin
* Pinchout
* Rotateleft
* Rotateright
* Rotate
* Swipestart
* Swiping
* Swipeendf
* Swipeleft
* Swiperight
* Swipeup
* Swipedown
* Swipe
* Drag
* Dragstart
* Dragend
* Hold
* Doubletap

Where tap is the analog click event, pinch simulates the double finger zoom, rorate is the simulated swivel gesture, swipe simulates fast swipe, drag simulates drag, hold hold long press, doubletap simulates double click.


## reference code

`` ``
Html

<! DOCTYPE html>
<Html lang = "en">
  <Head>
    <Meta charset = "utf-8">
    <Meta name = "viewport" content = "initial-scale = 1, maximum-scale = 1, user-scalable = no">
    <Title> </ title>
    <Style>
    Div {
      Width: 300px;
      Height: 300px;
      Background-color: # f00;
    }
    </ Style>
    <Script>
    Document.addEventListener ('touchmove', function (e) {
        E.stopPropagation ();
        E.preventDefault ()
    });
    Document.addEventListener ('touchstart', function (e) {
        E.stopPropagation ();
        E.preventDefault ()
    });
    </ Script>
  </ Head>
  <Body>
    <Div
      V-touch: tap = "test ($ event)"
      V-touch: doubletap = "test ($ event)"
      V-touch: hold = "test ($ event)"
      V-touch: swipeleft = "test ($ event)"
      V-touch: swiperight = "test ($ event)"
      V-touch: rotateright = "test ($ event)"
      V-touch: rotateleft = "test ($ event)"
     V-text = "event"> </ div>
    <Script src = "example.build.js"> </ script>
  </ Body>
</ Html>

`` ``

`` `Js
Var Vue = require ('vue');
Var VueTouch = require ('vue-touchjs');

Vue.use (VueTouch);

New Vue ({
    El: 'div',
    Data: {
        Event: ''
    },
    Methods: {
        Test: function (el, e) {
        // el that hangs in the event of the node node, the default is suspended in the event of the first handler is the parameters, in order not to change
            E.stopPropagation ();
            E.preventDefault ()
            This.event = e.type;
            Return false
        }
    }
});
`` ``
## history

#### 0.0.9
  
  1. [add] in the event callback will be the event of the articulated node as the first parameter callback back
Traductor de Google para empresas:Google Translator ToolkitTraductor de sitios webGlobal Market Finder
