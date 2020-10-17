import Vue from "vue";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";
import vueNumeralFilterInstaller from "vue-numeral-filter";

Vue.use(require('vue-moment'));
Vue.use(vueNumeralFilterInstaller);
Vue.use(numFormat);
Vue.filter("numFormat", numFormat(numeral));