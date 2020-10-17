import state from "@/store/modules/playlist/playlist.state";
import mutations from "@/store/modules/playlist/playlist.mutations";
import actions from "@/store/modules/playlist/playlist.actions";
import getters from "@/store/modules/playlist/playlist.getters";

export default {
    state: state,
    actions: actions,
    getters: getters,
    mutations: mutations
}