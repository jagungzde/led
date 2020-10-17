import { SET_LOADER, SET_LANGUAGE } from "@/store/constants/mutations.type";

export default {
    [SET_LOADER](state, payload) {
        state.isLoading = payload;
    },
    [SET_LANGUAGE](state, payload){
        state.curLanguage = payload;
    }
}