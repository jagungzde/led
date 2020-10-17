import Service from "@/services/playlist.service";
import { FETCH_PLAYLIST_LIST,GET_PLAYLIST_SINGLE, CREATE_PLAYLIST, EDIT_PLAYLIST, DELETE_PLAYLIST, ADD_CONTENT, REMOVE_CONTENT, MOVE_CONTENT,FETCH_PLAYLIST_BY_ORIENTATION } from "@/store/constants/actions.type";
import { SET_PLAYLIST_LIST, CREATE_PLAYLIST_RECORD,EDIT_PLAYLIST_RECORD, DELETE_PLAYLIST_RECORD, SET_LOADER } from "@/store/constants/mutations.type";

export default {
    [FETCH_PLAYLIST_LIST](context) {
        context.commit(SET_LOADER, true);
        Service.get().then((data) => {
            context.commit(SET_PLAYLIST_LIST, data);
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [FETCH_PLAYLIST_BY_ORIENTATION](context, orientation) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.getByOrientation(orientation).then((data) => {
                resolve(data);
            }).then(context.commit(SET_LOADER), false);
        });
    },
    [GET_PLAYLIST_SINGLE](context, playlistcode) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.getsingle(playlistcode).then((data) => {
                resolve(data);
            }).then(context.commit(SET_LOADER), false);
        });
    },
    [CREATE_PLAYLIST](context, payload) {
        context.commit(SET_LOADER, true);
        Service.create(payload).then((data) => {
            context.commit(CREATE_PLAYLIST_RECORD, data)
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [EDIT_PLAYLIST](context, payload) {
        context.commit(SET_LOADER, true);
        Service.modify(payload).then((data) => {
            context.commit(EDIT_PLAYLIST_RECORD, data)
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [DELETE_PLAYLIST](context, payload) {
        context.commit(SET_LOADER, true);
        Service.delete(payload).then((data) => {
            context.commit(DELETE_PLAYLIST_RECORD, data)
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [ADD_CONTENT](context, payload) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.addContent(payload).then((data) => {
                resolve(data);
            }).finally(context.commit(SET_LOADER), false);
        });
    },
    [REMOVE_CONTENT](context, code) {
        context.commit(SET_LOADER, true);
        return new Promise (resolve=>{
            return Service.removeContent(code).then(data=>{
                resolve(data);
            })
        }).then(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [MOVE_CONTENT](context, payload) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.moveContent(payload).then((data) => {
                resolve(data);
            }).finally(context.commit(SET_LOADER), false);
        });
    },
    
}