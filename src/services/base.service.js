import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import API_URL from "@/common/config";
import store from "@/store/"
import { LOGOUT } from "@/store/constants/actions.type";

const loginConfig = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

const uploadConfig = {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
}

export default {
    errorHandler(error) {
        if (error.response.status === 401) {
            store.dispatch(LOGOUT);
        } else {
            Vue.notify({
                title: "Something went wrong",
                type: "error",
                text: error.response.statusText
            })
        }
    },
    successHandler(response) {
        if (!response.data.status) {
            return Promise.resolve(response);
        } else if (response.data.status && response.data.status === "Success") {
            if (response.config.method !== "get") {
                Vue.notify({
                    title: "Success",
                    type: "success",
                    text: "Data Successfully Saved.",
                })
            }
            return Promise.resolve(response.data.result.data);
        } else {
            Vue.notify({
                title: "Something went wrong",
                type: "error",
                text: response.data.message,
            })
            return Promise.reject(response.data.message);
        }
    },
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        if (JwtService.getToken())
            this.setHeader();
        Vue.axios.interceptors.response.use(
            response => this.successHandler(response),
            error => this.errorHandler(error)
        )

    },

    setHeader() {
        let tokenObject = JwtService.getToken();
        Vue.axios.defaults.headers.common["Authorization"] = "bearer " + tokenObject.access_token;
    },

    removeHeader() { delete Vue.axios.defaults.headers.common['Authorization'] },

    get(resource) { return Vue.axios.get(resource) },

    post(resource, params) { return Vue.axios.post(resource, params) },

    postfile(resource, file) { return Vue.axios.post(resource, file, uploadConfig) },

    put(resource, params) { return Vue.axios.put(resource, params) },

    login(username, password) {
        var payload = "username=" + username +
            "&password=" + password +
            "&grant_type=password";
        return Vue.axios
            .post("token", payload, loginConfig)
            .then((response) => {
                return response.data;
            })
            .catch((error) => { throw error.response })
    },

    delete(resource){
        return Vue.axios.delete(resource)
    }
};
