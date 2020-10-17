import {SET_MEDIA_LIST, CREATE_MEDIA_RECORD, DELETE_MEDIA_RECORD } from "@/store/constants/mutations.type";

export default {
    [SET_MEDIA_LIST](state, payload) {
        state.mediaList = payload;
    },
    [CREATE_MEDIA_RECORD](state, payload) {
        state.mediaList.push(payload);
    },
    [DELETE_MEDIA_RECORD](state, code){
        state.mediaList.filter(data=>data.mediaCode != code);
    }
}