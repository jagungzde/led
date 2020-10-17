<template>
    <div class="card main-card">
        <div class="card-header">
            {{
                dataState == "create"
                    ? "CreatePlaylist"
                    : "EditPlaylist" | translate
            }}
        </div>
        <div class="card-body">
            <b-row>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "desc" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="50"
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
                                        <li>Playlist Title/Description</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "Orientation" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <select
                                    class="form-control custom-select"
                                    v-model="localData.orientation"
                                    placeholder="Orientation"
                                    v-on:change="fetchByOrientation()"
                                >
                                    <option :value="'Landscape'">{{
                                        "Landscape" | translate
                                    }}</option>
                                    <option :value="'Portrait'">{{
                                        "Portrait" | translate
                                    }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </b-row>

            <b-row class="mb-3 mt-2">
                <div class="card-header">{{ "AddMedia" | translate }}</div>
                <div class="col-md-12">
                    <b-row class="mt-2 mb-2">
                        <div class="col-md-8 ">
                            <vselect
                                label="description"
                                v-model="media"
                                :options="mediaData"
                            />
                        </div>
                        <div class="col-md-2">
                            <b-btn
                                class="btn btn-info mr-1 btn-hover-shine"
                                @click.stop="includeMedia()"
                                >{{ "Add" | translate }}</b-btn
                            >
                        </div>
                    </b-row>
                    <b-table
                        class="general-table"
                        :striped="true"
                        small
                        responsive
                        :outlined="true"
                        :hover="true"
                        :fields="fields"
                        :items="localData.playlistContent"
                    >
                        <template v-slot:cell(sequence)="data">
                            <div>{{ data.index + 1 }}</div>
                        </template>
                        <template v-if="dataState == 'create'" v-slot:cell(description)="data">
                            <div>{{ data.item.description }}</div>
                        </template>
                        <template v-else if="dataState == 'edit'" v-slot:cell(description)="data">
                            <div>{{ data.item.media.description }}</div>
                        </template>
                        <template v-slot:cell(actions)="data">
                            <div>
                                <b-btn
                                    class="btn btn-info mr-1 btn-hover-shine lnr-arrow-up"
                                    v-if="data.index != 0"
                                    @click.stop="upSequence(data)"
                                ></b-btn>
                                <b-btn
                                    class="btn btn-info btn-hover-shine mr-1 lnr-arrow-down"
                                    v-if="
                                        data.index <
                                            localData.playlistContent.length - 1
                                    "
                                    @click.stop="downSequence(data)"
                                ></b-btn>
                                <b-btn
                                    class="btn btn-danger btn-hover-shine lnr-trash"
                                    @click.stop="deleteVideo(data.item)"
                                ></b-btn>
                            </div>
                        </template>
                        <template v-slot:head(sequence)="data">
                            <div>{{ "Sequence" | translate }}</div>
                        </template>
                        <template v-slot:head(description)="data">
                            <div>{{ "desc" | translate }}</div>
                        </template>
                        <template v-slot:head(actions)="data">
                            <div>{{ "Actions" | translate }}</div>
                        </template>
                    </b-table>
                </div>
            </b-row>
            <div class="d-block card-footer">
                <router-link :to="{ name: 'playlist-list' }">
                    <b-btn
                        @click="save()"
                        class="btn btn-block btn-success btn-lg"
                        >{{ "Save" | translate }}</b-btn
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState } from "vuex";
import {
    FETCH_MEDIA_LIST,
    GET_PLAYLIST_SINGLE,
    CREATE_PLAYLIST,
    EDIT_PLAYLIST,
    ADD_CONTENT,
    REMOVE_CONTENT,
    MOVE_CONTENT,
    FETCH_MEDIA_BY_ORIENTATION,
    FETCH_PLAYLIST_LIST
} from "@/store/constants/actions.type";

export default {
    components: {},
    props: {
        playlistCode: String,
        dataState: {
            type: String
        },
        Code: String
    },
    data() {
        return {
            media: {},
            localData: {
                description: "",
                orientation: "",
                playlistContent: []
            },
            mediaData: [],
            created: false,
            fields: [
                { key: "sequence", sortable: true },
                { key: "description", sortable: true },
                { key: "actions", class: "actions-column" }
            ]
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
    mounted() {
        if(this.playlistCode){
            this.$store
            .dispatch(GET_PLAYLIST_SINGLE, this.playlistCode)
            .then(data => {
                this.localData = data;
            });
        }
        this.$store.dispatch(FETCH_MEDIA_LIST);
    },
    watch: {
        "localData.orientation": function(val) {
            if (val != null) {
                this.$store
                    .dispatch(FETCH_MEDIA_BY_ORIENTATION, val)
                    .then(data => {
                        this.mediaData = data;
                    });
            }
        },
    },
    methods: {
        fetchByOrientation() {
            this.$store.dispatch(FETCH_MEDIA_BY_ORIENTATION, this.localData.orientation).then(data => {
                this.mediaData = data;
            });
        },
        deleteVideo(vid) {
            if (this.dataState == "edit") {
                this.$store
                    .dispatch(REMOVE_CONTENT, vid.playlistContentCode)
                    .then(() => {
                        this.$store
                            .dispatch(
                                GET_PLAYLIST_SINGLE,
                                this.localData.playlistCode
                            )
                            .then(data => {
                                this.localData = data;
                            });
                    });
            } else {
                this.localData.playlistContent.splice(vid.index, 1);
            }
        },
        includeMedia() {
            if (this.dataState == "edit") {
                let datasend = {
                    mediaCode: this.media.mediaCode,
                    playlistCode: this.localData.playlistCode
                };
                this.$store.dispatch(ADD_CONTENT, datasend).then(() => {
                    this.$store
                        .dispatch(
                            GET_PLAYLIST_SINGLE,
                            this.localData.playlistCode
                        )
                        .then(data => {
                            this.localData = data;
                        });
                });
                this.media = "";
            } else {
                this.localData.playlistContent.push(this.media);
                this.media = "";
            }
        },
        upSequence(vid) {
            if (this.dataState == "create") {
                let movedData = this.localData.playlistContent[vid.index - 1];
                this.localData.playlistContent.splice(
                    vid.index - 1,
                    1,
                    this.localData.playlistContent[vid.index]
                );
                this.localData.playlistContent.splice(vid.index, 1, movedData);
            } else {
                let datasend = {
                    code: vid.item.playlistContentCode,
                    direction: "up"
                };
                this.$store.dispatch(MOVE_CONTENT, datasend).then(() => {
                    this.$store
                        .dispatch(
                            GET_PLAYLIST_SINGLE,
                            this.localData.playlistCode
                        )
                        .then(data => {
                            this.localData = data;
                        });
                });
            }
        },
        downSequence(vid) {
            if (this.dataState == "create") {
                let movedData = this.localData.playlistContent[vid.index + 1];
                this.localData.playlistContent.splice(
                    vid.index + 1,
                    1,
                    this.localData.playlistContent[vid.index]
                );
                this.localData.playlistContent.splice(vid.index, 1, movedData);
            } else {
                let datasend = {
                    code: vid.item.playlistContentCode,
                    direction: "down"
                };
                this.$store.dispatch(MOVE_CONTENT, datasend).then(() => {
                    this.$store
                        .dispatch(
                            GET_PLAYLIST_SINGLE,
                            this.localData.playlistCode
                        )
                        .then(data => {
                            this.localData = data;
                        });
                });
            }
        },
        save() {
            if (this.dataState === "create") {
                let mediaArray = this.localData.playlistContent.map(
                    (data, index) => {
                        return {
                            Sequence: index + 1,
                            MediaCode: data.mediaCode
                        };
                    }
                );
                let datasend = {
                    Description: this.localData.description,
                    playlistContent: mediaArray,
                    Orientation: this.localData.orientation
                };
                this.$store.dispatch(CREATE_PLAYLIST, datasend).then(() => {});
            } else {
                this.playlistData.code = this.localData.code;
                this.$store
                    .dispatch(EDIT_PLAYLIST, this.localData)
                    .then(() => {});
            }
            this.$store
                .dispatch(GET_PLAYLIST_SINGLE, this.localData.playlistCode)
                .then(data => {
                    this.localData = data;
                });
            this.$store.dispatch(FETCH_PLAYLIST_LIST);
        }
    }
};
</script>
<style>
.table {
    overflow: auto;
}
</style>
