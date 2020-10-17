import state from "@/store/modules/media/media.state";
import mutations from "@/store/modules/media/media.mutations";
import actions from "@/store/modules/media/media.actions";
import getters from "@/store/modules/media/media.getters";

export default {
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
}