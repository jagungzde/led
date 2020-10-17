import { SET_LED_LIST, CREATE_LED_RECORD, EDIT_LED_RECORD,TOGGLE_MAINTENANCE_RECORD } from "@/store/constants/mutations.type";

export default {
    [SET_LED_LIST](state, payload) {
        state.ledList = payload;
        state.ledMaintenanceList = payload.filter(data=>data.isMaintenance==true)
    },
    [CREATE_LED_RECORD](state, payload) {
        state.ledList.push(payload);
    },
    [EDIT_LED_RECORD](state, payload) {
        const item = state.ledList.find(item => item.code === payload.code);
        Object.assign(item, payload);
    },
    [TOGGLE_MAINTENANCE_RECORD](state, code){
        state.ledList.map(data=>{
            if(data.deviceCode == code){
                data.isMaintenance = !data.isMaintenance;
            }    
        });
        state.ledMaintenanceList = state.ledList.filter(data=>data.isMaintenance==true)
    },
}