<template>
    <v-layout row justify-center>
        <v-dialog persistent v-model="showLocal" max-width="600">
            <VueElementLoading
                :active="isLoading"
                spinner="ring"
                color="var(--success)"
                :text="loadingProgress"
            />
            <v-card>
                <v-card-title class="headline primary-title">{{
                    dataState == "create" ? "Create" : "Edit" | translate
                }}</v-card-title>
                <v-card-text>
                    <b-row class="row mb-3">
                        <label class="col-md-2 col-form-label">{{
                            "desc" | translate
                        }}</label>
                        <div class="col-md-10">
                            <div class="input-group">   
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="localData.description"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="descriptionPO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="descriptionPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title>Help...</template>
                                    <ul>
                                        <li>File Description/ Label</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </b-row>
                    <!-- <b-row class="row mb-3">
                        <label class="col-md-2 col-form-label">{{
                            "Height" | translate
                        }}</label>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="localData.height"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="heightPO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="heightPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title>Help...</template>
                                    <ul>
                                        <li>Media height in pixel</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                        <label class="col-md-2 col-form-label">{{
                            "Width" | translate
                        }}</label>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="localData.width"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text" id="widthPO">
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="widthPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title>Help...</template>
                                    <ul>
                                        <li>Media width in pixel</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </b-row> -->
                    <b-row class="row mb-3">
                        <label class="col-md-2 col-form-label">{{
                            "Orientation" | translate
                        }}</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <select
                                    class="form-control custom-select"
                                    v-model="localData.orientation"
                                    placeholder="Orientation"
                                >
                                    <option value="Landscape">Landscape</option>
                                    <option value="Portrait">Portrait</option>
                                </select>
                            </div>
                        </div>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col cols="2">{{ "FileUpload" | translate }}</b-col>
                        <b-col cols="8">
                            <div class="position-relative form-group">
                                <input
                                    id="file"
                                    type="file"
                                    ref="file"
                                    @change="changefiles"
                                    class="form-control-file"
                                    :placeholder="'placeholder' | translate"
                                />
                            </div>
                        </b-col>
                    </b-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="v-btn"
                        @click="
                            (showLocal = false), (localData = {}), (file = '')
                        "
                        >{{ "Cancel" | translate }}</v-btn
                    >
                    <v-btn class="v-btn primary" @click="save()">{{
                        "save" | translate
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import {
    FETCH_MEDIA_LIST,
    // CREATE_MEDIA,
    EDIT_MEDIA
    // DELETE_MEDIA
} from "@/store/constants/actions.type";
// import Vue from "vue";
// import axios from "axios";
// import VueAxios from "vue-axios";

export default {
    props: {
        isShown: {
            type: Boolean,
            required: true
        },
        videoData: Object,
        dataState: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            localData: {},
            file: "",
            uploadPercentage: 0,
            isLoading: false,
            loadingProgress: "",
            loadingString:"",
        };
    },
    computed: {
        showLocal: {
            get() {
                return this.isShown;
            },
            set(val) {
                if (!val) {
                    this.$emit("closeModal");
                }
            }
        }
    },
    // mounted() {

    // },
    watch: {
        videoData: function(val) {
            this.localData.filename = { ...val };
        },
    },
    methods: {
        changefiles() {
            this.file = this.$refs.file.files[0];
            if (this.file.type.match(/video/) != "video") {
                alert("This is not Video File");
            }
        },
        save() {
            if (this.file.type.match(/video/) == "video") {
                if (this.dataState === "create") {
                    this.isLoading = true;
                    const config = {
                        onUploadProgress: function(progressEvent) {
                            var percentCompleted = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            this.loadingProgress = percentCompleted.toString();
                        }
                    };
                    var x = new FormData();
                    x.append("description", this.localData.description);
                    x.append("Orientation", this.localData.orientation);
                    x.append("file", this.file);
                    // let JS = JSON.stringify(x)
                    this.axios
                        .post("http://158.255.47.89:50000/media", x, config, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                        })
                        .then(function() {
                            // console.log(data.data);
                            this.$store.dispatch(FETCH_MEDIA_LIST);
                            this.isLoading = false;
                        })
                        .catch(function() {
                            // console.log("FAILURE!!");
                        })
                        .finally(() => {
                            this.$store.dispatch(FETCH_MEDIA_LIST);
                            this.showLocal = false;
                            this.localData = {};
                            this.loadingProgress = 0;
                            this.file = null;
                        });

                    // this.$store.dispatch(CREATE_MEDIA, formData).then(() => {
                    //   this.showLocal = false;
                    // });
                } else {
                    this.$store
                        .dispatch(EDIT_MEDIA, this.localData)
                        .then(() => {
                            this.showLocal = false;
                            this.loadingProgress = 0;
                        });
                }
            } else {
                alert("This is not Video File");
            }
        }
    }
};
</script>
