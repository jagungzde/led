import BaseService from "@/services/base.service";

export default {
    get() {
        return BaseService.get("device");
    },
    getsingle(code) {
        return BaseService.get("device/" + code);
    },
    create(payload) {
        return BaseService.post("device", payload);
    },
    modify(payload) {
        return BaseService.put("device", payload);
    },
    toggleMaintenance(code){
        return BaseService.put("device/maintenance/"+code)
    },
    delete(code){
        return BaseService.delete("device/"+code)
    }
}