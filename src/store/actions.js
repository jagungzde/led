import { CHANGE_LANGUAGE } from "@/store/constants/actions.type";
import { SET_LANGUAGE, SET_LOADER } from "@/store/constants/mutations.type";


export default {
    [CHANGE_LANGUAGE](context, payload){
        context.commit(SET_LOADER, true);
        context.commit(SET_LANGUAGE, payload);
        context.commit(SET_LOADER, false);
    }
}