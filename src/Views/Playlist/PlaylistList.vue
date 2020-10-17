<template>
    <div class="card-hover-shadow card-border mb-3 card">
        <div class="card-header">{{ "Playlist" | translate }}</div>
        <div class="card-body">
            <VueElementLoading
                :active="isLoading"
                spinner="ring"
                color="var(--success)"
            />
            <router-link
                :to="{
                    name: 'playlist-create',
                    params: { playlistData: dummy, dataState: 'create' }
                }"
            >
                <b-btn
                    class="btn btn-block mb-3 btn-transition"
                    variant="outline-primary"
                    >{{ "NewPlaylist" | translate }}</b-btn
                >
            </router-link>
            <b-table
                class="general-table"
                :striped="true"
                small
                responsive
                :outlined="true"
                :hover="true"
                :items="tableData"
                :fields="fields"
            >
                <template v-slot:cell(description)="data">
                    <div>{{ data.item.description }}</div>
                </template>
                <template v-slot:cell(orientation)="data">
                    <div>{{ data.item.orientation }}</div>
                </template>
                <template v-slot:cell(isActive)="data">
                    <div>
                        {{ data.item.isActive ? "Not Active" : "Active" }}
                    </div>
                </template>
                <template v-slot:cell(actions)="data">

                    <router-link
                        :to="{
                            name: 'playlist-edit',
                            params: {
                                playlistCode: data.item.playlistCode,
                                dataState: 'edit'
                            }
                        }"
                    >
                        <b-btn class="btn btn-warning btn-transition">{{
                            "Edit" | translate
                        }}</b-btn>
                    </router-link>
                    <b-btn
                            v-if="data.item.playlistCode != 'DEFAULTL' && data.item.playlistCode != 'DEFAULTP'"
                            @click.stop="openModalDelete(data.item)"
                            class="btn btn-danger btn-hover-shine ml-2"
                            >{{ "Delete" | translate }}</b-btn
                        >
                </template>
                <template v-slot:head(description)="data">
                    <div>{{ "desc" | translate }}</div>
                </template>
                <template v-slot:head(orientation)="data">
                    <div>{{ "Orientation" | translate }}</div>
                </template>
                <template v-slot:head(isActive)="data">
                    <div>{{ "isActive" | translate }}</div>
                </template>
                <template v-slot:head(actions)="data">
                    <div>{{ "Actions" | translate }}</div>
                </template>
            </b-table>
            <DeleteModal
                :isShown="showDelete"
                :playlistData.sync="record"
                @closeModal="closeModalDelete()"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import VideoTable from "../Video/VideoTable";
import DeleteModal from "./DeleteModal";
import { FETCH_PLAYLIST_LIST } from "@/store/constants/actions.type";

export default {
    components: {
        // VideoTable,
        DeleteModal
    },
    data: () => ({
        showDialog: false,
        showDelete: false,
        fields: [
            { key: "description", sortable: true },
            { key: "orientation", sortable: true },
            { key: "isActive", sortable: true },
            { key: "actions", class: "text-right" }
        ],
        dummy: {
            description: "",
            playlistCode: "",
            playlistContent: [
                
            ],
            playlistContentCode: "",
            sequence: 12
        },
        record: null,
        state: ""
    }),
    methods: {
        openModal(playlistData) {
            if (!playlistData) {
                this.state = "create";
                this.showDialog = true;
            } else {
                this.state = "edit";
                this.record = playlistData;
                this.showDialog = true;
            }
        },
        closeModal() {
            this.showDialog = false;
            this.record = {};
        },
        openModalDelete(playlistData) {
            this.record = playlistData;
            this.showDelete = true;
        },
        closeModalDelete() {
            this.showDelete = false;
            this.record = {};
            this.$store.dispatch(FETCH_PLAYLIST_LIST);
        }
    },
    mounted() {
        this.$store.dispatch(FETCH_PLAYLIST_LIST);
    },
    computed: {
        ...mapState({
            tableData: state => state.playlist.playlistList,
            isLoading: state => state.isLoading
        })
    }
};
</script>
