var Vue = require('vue');
var VueTouch = require('../src/index.js');

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