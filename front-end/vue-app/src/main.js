import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Add Animation Library
import AOS from 'aos';
import 'aos/dist/aos.css';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

new Vue({
  created: () => AOS.init(),
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
