import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import store from "@/store";
import BaseService from "@/services/base.service";

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

import "./filters/filters";
import "./global-component";
Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);
Vue.config.productionTip = false;
BaseService.init();

new Vue({
  router,
  store,
  render: h => h(App)

}).$mount("#app");