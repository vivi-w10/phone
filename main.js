import Vue from 'vue'
import App from './App'

Vue.prototype.goodsTypeNum = 0;
Vue.prototype.serverHostUrl="http://8.131.237.142:7879/";
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
