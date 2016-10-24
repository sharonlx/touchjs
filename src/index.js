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
            priority: Vue.directive('on').priority,

            bind: function() {
                
                    // determine event type
                var event = this.arg;
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

            update: function(fn) {
                var event = this.arg;
                    // teardown old handler
                if (this.handler) {
                    Touch.off(event, this.handler);
                }
                if (typeof fn !== 'function') {
                    this.handler = null;
                    console.warn(
                        '[vue-touch] invalid handler function for v-touch: ' +
                        this.arg + '="' + this.descriptor.raw
                    );
                } else {
                    Touch.on(this.el, event, (this.handler = fn));
                }
            },

            unbind: function() {
                if (this.handler) {
                    
                    Touch.off(this.el, this.arg, this.handler);
                }
                
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