import BaseService from "@/services/base.service";

export default {
    get() {
        return BaseService.get("playlist");
    },
    getByOrientation(orientation) {
        return BaseService.get("playlist/orientation/"+orientation);
    },
    getsingle(code) {
        return BaseService.get("playlist/" + code);
    },
    create(payload) {
        return BaseService.post("playlist", payload);
    },
    modify(payload){
        return BaseService.put("playlist", payload);
    },
    delete(code){
        return BaseService.delete("playlist/"+ code);
    },
    addContent(payload){
        return BaseService.post("playlist/content", payload)
    },
    removeContent(code){
        return BaseService.delete("playlist/content/" + code)
    },
    moveContent(payload){
        return BaseService.put("playlist/content", payload)
    }
}