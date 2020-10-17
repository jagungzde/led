import state from "@/store/modules/led/led.state";
import mutations from "@/store/modules/led/led.mutations";
import actions from "@/store/modules/led/led.actions";
import getters from "@/store/modules/led/led.getters";

export default {
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
}