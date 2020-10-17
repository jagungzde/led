import Vue from "vue";
import VueElementLoading from "vue-element-loading";
import BootstrapVue from "bootstrap-vue";
import VueSweetalert2 from 'vue-sweetalert2';
import Notifications from 'vue-notification';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueRouter from 'vue-router';
import VueAMap from 'vue-amap';
import VueI18n from 'vue-i18n';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'




Vue.component('vselect', vSelect)
Vue.component('VueElementLoading', VueElementLoading);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueAMap);
Vue.use(VueI18n);
Vue.use(vueFilterPrettyBytes)

// FONT AWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faInfo,
    faCog,
    faSpinner,
    faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faInfo, faCog, faSpinner, faEllipsisV);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//GMAPS
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCp3Hxu8t-cUuEcPh68Jv-0BEMHWALGMNk',
      libraries: 'places,drawing,visualization',
    },})

    VueAMap.initAMapApiLoader({
      // 高德的key
      key: '2851b8a61f21edce4c9d8ed55b132278',
      // 插件集合
      plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      // 高德 sdk 版本，默认为 1.4.4
      v: '1.4.4'
    });