import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SimpleVueValidation from 'simple-vue-validator'

Vue.use(SimpleVueValidation)

Vue.config.productionTip = false

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
