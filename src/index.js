/*global define*/
;(function() {

    var Touch = require('./../lib/touch.js');
    var vueTouch = {};

    var gestures = [
        'tap',
        'pinchstart', 'pinch', 'pinchend', 'pinchin', 'pinchout',
        'rotateleft', 'rotateright', 'rotate',
        'swipestart', 'swiping','swipeend','swipeleft','swiperight','swipeup','swipedown','swipe',
        'drag','dragstart','dragend',
        'hold',
        'tap',
        'doubletap'
    ];
    // var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all'];
    // var customEvents = {};

    if (!Touch) {
        throw new Error('[vue-touch] cannot locate Touch.js.');
    }

    // exposed global options
    vueTouch.config = {};

    vueTouch.install = function(Vue) {

        Vue.directive('touch', {

            isFn: true,
            acceptStatement: true,
            // priority: Vue.directive('on').priority,

            bind: function(el, binding, vnode, oldVnode) {

                    // determine event type
                var modifiers = binding.modifiers;

                var event = binding.arg;
                if (!event) {
                    console.warn('[vue-touch] event type argument is required.');
                }
                var recognizerType;

                for (var i = 0; i < gestures.length; i++) {
                    if (event === gestures[i]) {
                        recognizerType = gestures[i];
                        break;
                    }
                }
                if (!recognizerType) {
                    console.warn('[vue-touch] invalid event type: ' + event);
                    return;
                }
                this.recognizerType = recognizerType;
                // apply global options
                // var globalOptions = vueTouch.config[recognizerType];
                //
            },

            update: function(el, binding, vnode, oldVnode) {
              // debugger
                var event = binding.arg;
                var handlerName = binding.expression;// handlerName
                var modifiers = binding.modifiers;
                el._handler = (el._handler || {});
                el._handler[event] = el._handler[event] || [];

                var sameEventExist = (el._handler[event].filter(function(evt) {return evt.name === handlerName}).length !== 0);
                    // teardown old handler
                if (sameEventExist) {
                  return ;
                }

                var fn = binding.value;
                // console.log(fn.toString())
                
                var wrapperFun = function() {
                  var arg = Array.prototype.slice.call(arguments);
                  arg.unshift(el);
                  var ret = fn.apply(null, arg);
                  if (modifiers.stop) {
                      return false;
                  }
                };
                el._handler[event].push({
                  name: handlerName,
                  handler: wrapperFun
                });

                if (typeof fn !== 'function') {
                    console.warn(
                        '[vue-touch] invalid handler function for v-touch: ' +
                        event + '="' + binding.rawName
                    );
                } else {

                    Touch.on(el, event, wrapperFun);
                }
            },

            unbind: function(el, binding, vnode, oldVnode) {
                var event = binding.arg;
                var handlerName = binding.expression;// handlerName
                el._handler = el._handler || {};
                el._handler[event] = el._handler[event] || [];
                el._handler[event].forEach(function(evtItem) {
                  Touch.off(el, event, evtItem.handler);
                });
            }
        });
    };

    if (typeof exports == 'object') {

        module.exports = vueTouch;
    } else if (typeof define == 'function' && define.amd) {
        define([], function() {
            return vueTouch;
        });
    } else if (window.Vue) {
        window.VueTouch = vueTouch;
        window.Vue.use(vueTouch);
    }

})();
