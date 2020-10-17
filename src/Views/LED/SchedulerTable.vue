<template>
    <div class="card-hover-shadow card-border mb-3 card">
        <div class="card-header">{{ "Schedule" | translate }}</div>
        <div class="card-body h-100">
            <b-table
                :striped="true"
                small
                responsive
                :outlined="true"
                :hover="true"
                :items="localData"
                :fields="fields"
                class="table"
            >
                <template v-slot:cell(weekOfDay)="data">
                    <div>
                        {{
                            data.item.weekOfDay == 1 ? "Monday" : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 2
                                ? "Tuesday"
                                : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 3
                                ? "Wednesday"
                                : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 4
                                ? "Thursday"
                                : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 5 ? "Friday" : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 6
                                ? "Saturday"
                                : "" | translate
                        }}
                        {{
                            data.item.weekOfDay == 7 ? "Sunday" : "" | translate
                        }}
                    </div>
                </template>
                <template v-slot:cell(playlist)="data">
                    <div>
                        <!-- <select
                            class="form-control custom-select"
                            v-model="data.item.playlistCode"
                        >
                            <option
                                :value="opt.playlistCode"
                                v-for="opt in playlistData"
                                :key="opt.playlistCode"
                                >{{ opt.description }}</option
                            >
                        </select> -->
                        <vselect 
                        v-model="data.item.playlistCode"
                        label="description" 
                        :reduce="x=>x.playlistCode"
                        :options="playlistData" 
                        /> 
                    </div>
                </template>
                <template v-slot:head(weekOfDay)="data">
                    {{ "WeekOfDay" | translate }}
                </template>
                <template v-slot:head(playlist)="data">
                    {{ "Playlist" | translate }}
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import {
    // FETCH_PLAYLIST_LIST,
    FETCH_PLAYLIST_BY_ORIENTATION
} from "@/store/constants/actions.type";

export default {
    props: {
        localData: Array,
        dataState: {
            required: true,
            type: String
        },
        orientation: String,
    },
    data: () => ({
        selected:null,
        track: "description",
        schedule: [
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 1
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 2
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 3
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 4
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 5
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 6
                },
                {
                    playlistCode: "",
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 7
                }
            ],
        playlistData: [],
        fields: [
            { key: "weekOfDay", sortable: true },
            { key: "playlist", sortable: true }
        ]
    }),
    watch: {
        orientation: function(val) {
            this.loadPlaylist(val);
        }
    },
    mounted() {
        this.loadPlaylist(this.orientation);
    },
    methods: {
        loadPlaylist(orientation) {
            this.$store
                .dispatch(FETCH_PLAYLIST_BY_ORIENTATION, orientation)
                .then(data => {
                    this.playlistData = data;
                    // this.playlistData = data.map(x => ({
                    //     playlistCode: x.playlistCode,
                    //     playlistDesc: x.description
                    // }));
                });
        }
    }
};
</script>
<style>
.table {
    overflow-x: visible;
}
</style>
