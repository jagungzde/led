import Vue from "vue";
import Vuex from "vuex";

import vuexI18n from 'vuex-i18n';
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
import led from "@/store/modules/led";
import media from "@/store/modules/media";
import playlist from "@/store/modules/playlist";
import translationsEn from "@/locale/en";
import translationsCh from "@/locale/ch";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        led,
        media,
        playlist
    },
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
});


Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('ch', translationsCh);
Vue.i18n.set('en');

export default store;

