import Service from "@/services/led.service";
import { FETCH_LED_LIST,GET_LED_SINGLE, CREATE_LED, EDIT_LED, TOGGLE_MAINTENANCE, DELETE_LED  } from "@/store/constants/actions.type";
import { SET_LED_LIST, CREATE_LED_RECORD, EDIT_LED_RECORD,TOGGLE_MAINTENANCE_RECORD, SET_LOADER } from "@/store/constants/mutations.type";

export default {
    [FETCH_LED_LIST](context) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve=>{
            return Service.get().then((data) => {
                context.commit(SET_LED_LIST, data);
            resolve(data);
            })
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [GET_LED_SINGLE](context, ledcode) {
        context.commit(SET_LOADER, true);
        return new Promise(resolve => {
            return Service.getsingle(ledcode).then((data) => {
                resolve(data);
            }).finally(context.commit(SET_LOADER), false);
        });
    },
    [CREATE_LED](context, payload) {
        context.commit(SET_LOADER, true);
        Service.create(payload).then((data) => {
            context.commit(CREATE_LED_RECORD, data)
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [EDIT_LED](context, payload) {
        context.commit(SET_LOADER, true);
        Service.modify(payload).then(() => {
            context.commit(EDIT_LED_RECORD, payload)
        }).finally(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [DELETE_LED](context, payload) {
        context.commit(SET_LOADER, true);
        Service.delete(payload).then(() => {
        }).then(() => {
            context.commit(SET_LOADER, false);
        })
    },
    [TOGGLE_MAINTENANCE](context, code){
        context.commit(SET_LOADER, true);
        Service.toggleMaintenance(code).then(()=>{
            context.commit(TOGGLE_MAINTENANCE_RECORD, code);
        }).finally(()=>{
            context.commit(SET_LOADER, false)
        })
    }
}