import BaseService from "@/services/base.service";

export default {
    get() {
        return BaseService.get("media");
    },
    getsingle(code) {
        return BaseService.get("media/" + code);
    },
    create(payload) {
        return BaseService.post("media", payload);
    },
    delete(code) {
        return BaseService.delete("media/" + code);
    },
    getByOrientation(orientation){
        return BaseService.get("media/orientation/"+orientation)
    }
}