import Service from "@/services/media.service";
import { FETCH_MEDIA_LIST,GET_MEDIA_SINGLE, CREATE_MEDIA, DELETE_MEDIA, FETCH_MEDIA_BY_ORIENTATION } from "@/store/constants/actions.type";
import { SET_MEDIA_LIST, CREATE_MEDIA_RECORD, DELETE_MEDIA_RECORD, SET_LOADER } from "@/store/constants/mutations.type";

export default {
    [FETCH_MEDIA_LIST](context) {
        context.commit(SET_LOADER, true);
        return new Promise (resolve=>{
            return Service.get().then((data) => {
                context.commit(SET_MEDIA_LIST, data);
                resolve(data);
        })
        }).then(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [FETCH_MEDIA_BY_ORIENTATION](context, orientation) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.getByOrientation(orientation).then((data) => {
                resolve(data);
            }).then(context.commit(SET_LOADER), false);
        });
    },
    [GET_MEDIA_SINGLE](context, mediacode) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.getsingle(mediacode).then((data) => {
                resolve(data);
            }).then(context.commit(SET_LOADER), false);
        });
    },
    [CREATE_MEDIA](context, payload) {
        context.commit(SET_LOADER, true);
        return new Promise (resolve=>{
            Service.create(payload).then((data) => {
                context.commit(CREATE_MEDIA_RECORD, data)
                resolve(data)
            })
        }).then(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [DELETE_MEDIA](context, payload) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve=>{
            Service.delete(payload).then(data => {
                context.commit(DELETE_MEDIA_RECORD, payload)
                resolve(data)
            })
        }).then(() => {
            context.commit(SET_LOADER, false);
        })
    },
}