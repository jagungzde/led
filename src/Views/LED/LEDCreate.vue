<template>
    <div class="card main-card">
        <div class="card-header">
            {{ dataState == "create" ? "LEDCreate" : "LEDDetail" | translate }}
        </div>
        <div class="card-body">
            <el-amap
                vid="amapDemo"
                :zoom="14"
                :center="centerAmap"
                :events="events"
                style="width: 100%; height: 500px"
                class="mb-4"
            >
                <el-amap-marker
                    v-if="payload.lat != null || payload.long != null"
                    :position="[
                        parseFloat(payload.long),
                        parseFloat(payload.lat)
                    ]"
                    :events="markerEvents"
                    draggable="true"
                />
            </el-amap>
            <b-row>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "buildNumber" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="50"
                                    v-model="payload.deviceCode"
                                    class="form-control"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="buildnumberPO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="buildnumberPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>Devices/Hardware number</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "desc" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="payload.name"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text" id="namePo">
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="namePo"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>LED Name</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
            </b-row>

            <b-row class="mt-2 mb-2">
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "Longitude" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="payload.long"
                                    class="form-control"
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text" id="longPO">
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="longPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>
                                            Longitude coordinate where LED
                                            placed
                                        </li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "Latitude" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="payload.lat"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="latitudePO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="latitudePO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>
                                            Latitude coordinate where LED placed
                                        </li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
            </b-row>
            <b-row class="mt-2 mb-2">
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "Region" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="payload.region"
                                    class="form-control uppercase"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="regionPO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="regionPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>region where LED placed</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "Country" | translate
                        }}</label>
                        <div class="col-md-9">
                            <div class="input-group">
                                <input
                                    type="text"
                                    maxlength="20"
                                    v-model="payload.country"
                                    class="form-control uppercase"
                                    placeholder=""
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="countryPO"
                                    >
                                        <font-awesome-icon icon="info" />
                                    </span>
                                </div>
                                <b-popover
                                    target="countryPO"
                                    triggers="hover"
                                    placement="left"
                                >
                                    <template v-slot:title
                                        >Help...</template
                                    >
                                    <ul>
                                        <li>country where LED placed</li>
                                    </ul>
                                </b-popover>
                            </div>
                        </div>
                    </div>
                </div>
            </b-row>
            <b-row v-if="dataState == 'edit'" class="mt-2 mb-2">
                <div class="col col-md-6">
                    <div class="row">
                        <label class="col-md-3 col-form-label">{{
                            "StatusMaintenance" | translate
                        }}</label>
                        <div class="col-md-9">
                            <b-checkbox
                                class="mt-3"
                                v-model="payload.isMaintenance"
                                @change="toggleMaintenance(payload.deviceCode)"
                                size="is-large"
                                :switch="true"
                            />
                        </div>
                    </div>
                </div>
            </b-row>
            <div class="card-header">{{ "Dimension" | translate }}</div>
            <div class="card-body">
                <b-row>
                    <div class="col col-md-6">
                        <div class="row">
                            <label class="col-md-3 col-form-label">{{
                                "Height" | translate
                            }}</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <input
                                        type="number"
                                        maxlength="5"
                                        v-model="payload.height"
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
                                        <template v-slot:title
                                            >Help...</template
                                        >
                                        <ul>
                                            <li>Devices height in pixel</li>
                                        </ul>
                                    </b-popover>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-md-6">
                        <div class="row">
                            <label class="col-md-3 col-form-label">{{
                                "Width" | translate
                            }}</label>
                            <div class="col-md-9">
                                <div class="input-group">
                                    <input
                                        type="number"
                                        maxlength="5"
                                        v-model="payload.width"
                                        class="form-control"
                                    />
                                    <div class="input-group-append">
                                        <span
                                            class="input-group-text"
                                            id="widthPO"
                                        >
                                            <font-awesome-icon icon="info" />
                                        </span>
                                    </div>
                                    <b-popover
                                        target="widthPO"
                                        triggers="hover"
                                        placement="left"
                                    >
                                        <template v-slot:title
                                            >Help...</template
                                        >
                                        <ul>
                                            <li>Devices Width in pixel</li>
                                        </ul>
                                    </b-popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-row>
                <b-row class="mt-2">
                    <div class="col col-md-6">
                        <div class="row">
                            <label class="col-md-3 col-form-label">{{
                                "Orientation" | translate
                            }}</label>
                            <div class="col-md-9">
                                    <select
                                        class="form-control custom-select"
                                        v-model="payload.orientation"
                                        placeholder="Orientation"
                                    >
                                        <option value="Landscape">{{
                                            "Landscape" | translate
                                        }}</option>
                                        <option value="Portrait">{{
                                            "Portrait" | translate
                                        }}</option>
                                    </select>
                                    
                            </div>
                        </div>
                    </div>
                </b-row>
            </div>
            <SchedulerTable
                v-if="loadCompleted || dataState == 'create'"
                :dataState="dataState"
                :localData.sync="payload.devicePlaylist"
                :orientation.sync="payload.orientation"
            />
            <div class="d-block card-footer">
                <b-btn
                    @click="save()"
                    class="btn btn-block btn-success btn-lg"
                    >{{ "save" | translate }}</b-btn
                >
            </div>
        </div>
    </div>
</template>

<!-- <link rel="stylesheet" href="https://unpkg.com/vue-select@latest/dist/vue-select.css"> -->
<script>
import SchedulerTable from "./SchedulerTable";
import {
    CREATE_LED,
    GET_LED_SINGLE,
    EDIT_LED,
    TOGGLE_MAINTENANCE
} from "@/store/constants/actions.type";
// import VueRouter from 'vue-router';

export default {
    components: {
        SchedulerTable
    },
    props: {
        dataState: {
            type: String
        },
        Code: String
    },
    data() {
        return {
            selected: null,
            loadCompleted: false,
            centerAmap: [104.149952, 30.7478],
            iseng: [{ data1: "A", data2: "B" }, { data1: "C", data2: "D" }],
            schedule: [
                
            ],
            payload: {
                name: null,
                lat: 0,
                long: 0,
                region: null,
                country: null,
                devicePlaylist: [
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 1
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 2
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 3
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 4
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 5
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 6
                },
                {
                    playlistCode: {},
                    playlistDesc: "Choose Playlist",
                    weekOfDay: 7
                }
                ],
                orientation: null
            },
            markerEvents: {
                dragend: e => {
                    this.payload.lat = e.lnglat.lat;
                    this.payload.long = e.lnglat.lng;
                }
            },
            events: {
                click: e => {
                    this.payload.lat = e.lnglat.lat;
                    this.payload.long = e.lnglat.lng;
                }
            }
        };
    },
    mounted() {
        if (this.dataState === "edit") {
            this.loadData();
        }
    },
    methods: {
        loadData() {
            this.$store.dispatch(GET_LED_SINGLE, this.Code).then(data => {
                this.loadCompleted = true;
                if (data != null) {
                    this.payload = data;
                } 
            });
        },
        save() {
            if (this.dataState == "edit") {
                let Datasend = {
                    BuildNumber: this.payload.deviceCode,
                    DeviceCode: this.payload.deviceCode,
                    isMaintenance: true,
                    Name: this.payload.name,
                    Long: this.payload.long,
                    Lat: this.payload.lat,
                    Country: this.payload.country,
                    Region: this.payload.region,
                    Height: this.payload.height,
                    Width: this.payload.width,
                    Orientation: this.payload.orientation,
                    DevicePlaylist: this.payload.devicePlaylist
                };
                this.$store.dispatch(EDIT_LED, Datasend).then(() => {
                    this.$router.push({ name: "led-list" });
                });
            } else {
                let Datasend = {
                    BuildNumber: this.payload.deviceCode,
                    DeviceCode: this.payload.deviceCode,
                    isMaintenance: true,
                    Name: this.payload.name,
                    Long: this.payload.long,
                    Lat: this.payload.lat,
                    Country: this.payload.country,
                    Region: this.payload.region,
                    Height: this.payload.height,
                    Width: this.payload.width,
                    Orientation: this.payload.orientation,
                    DevicePlaylist: this.payload.devicePlaylist
                };
                // console.log(Datasend);
                this.$store.dispatch(CREATE_LED, Datasend).then(() => {
                    this.$router.push({ name: "led-list" });
                });
            }
        },
        toggleMaintenance(code) {
            this.$store.dispatch(TOGGLE_MAINTENANCE, code);
        }
    }
};
</script>
