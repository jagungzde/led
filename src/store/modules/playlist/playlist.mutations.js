import {SET_PLAYLIST_LIST, CREATE_PLAYLIST_RECORD, EDIT_PLAYLIST_RECORD, DELETE_PLAYLIST_RECORD} from "@/store/constants/mutations.type";

export default {
    [SET_PLAYLIST_LIST](state, payload) {
        state.playlistList = payload;
    },
    [CREATE_PLAYLIST_RECORD](state, payload) {
        state.playlistList.push(payload);
    },
    [EDIT_PLAYLIST_RECORD](state, payload) {
        const item = state.playlistList.find(item => item.playlistCode === payload.playlistCode);
        Object.assign(item, payload);
    },
    [DELETE_PLAYLIST_RECORD](state, code) {
        state.playlistList = state.playlistList.filter(data => data.playlistCode != code)
    },
}