<template>
<div>
    <div class="card-hover-shadow card-border mb-3 card">
        <div class="card-header">
            <div class="text-left" style="width:100%">LED</div>
            <!-- <div class="text-right" style="width:100%">
        {{'chineseMap'|translate}}

         <b-checkbox
                    v-model="chinaMode"
                    @change="toggleCountry()" 
                    size="is-large"
                    :switch="true"
                />
      </div> -->
        </div>
        <div class="card-body">
            <VueElementLoading
                :active="isLoading"
                spinner="ring"
                color="var(--success)"
            />
            <router-link
                :to="{ name: 'led-create', params: { dataState: 'create' } }"
            >
                <b-btn
                    class="btn btn-block mb-3 btn-transition"
                    variant="outline-primary"
                    >{{ "newLED" | translate }}</b-btn
                >
            </router-link>
            <el-amap
                vid="amapDemo"
                :zoom="14"
                :center="centerAmap"
                style="width: 100%; height: 500px"
            >
                <el-amap-marker
                    v-for="m in LEDData"
                    v-bind:key="m.deviceCode"
                    :icon="icon(m)"
                    :position="[parseFloat(m.long), parseFloat(m.lat)]"
                    :events="events"
                >
                </el-amap-marker>
                <!-- <el-amap-info-window
                    v-for="l in LEDData"
                    v-bind:key="l.deviceCode"
                    :visible="infovisible"
                    :events="events"
                    :content="l.name"
                > -->
                <!-- </el-amap-info-window> -->
            </el-amap>
            
            <!-- <google-map v-else :center="center" :zoom="14" style="width: 100%; height: 500px">
        <google-marker
          v-for="m in LEDData"
          v-bind:key="m.deviceCode"
          :position="{'lat':parseFloat(m.lat), 'lng':parseFloat(m.long)}"
          :clickable="true"
          :draggable="false"
          :icon="icon(m)"
          @click="push(m.deviceCode)"
        >
          <gmap-info-window
            class="bg-dark text-lighter"
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="openState"
          >
          <label v-if="m.isMaintenance == true" class="badge badge-danger text-wrap">Devices : {{m.name}}</label>
          </gmap-info-window>
        </google-marker>
      </google-map> -->
        </div>
    </div>
    <div class="card-hover-shadow card-border mb-3 card">
                <div class="card-header">LED List</div>
                <div class="card-body">
                    <VueElementLoading
                        :active="isLoading"
                        spinner="ring"
                        color="var(--success)"
                    />
                    <b-table
                        class="general-table"
                        :striped="true"
                        small
                        responsive
                        :outlined="true"
                        :hover="true"
                        :items="LEDData"
                        :fields="fields"
                    >
                        <template v-slot:cell(buildNumber)="data">
                            <div>{{ data.item.deviceCode }}</div>
                        </template>
                        <template v-slot:cell(name)="data">
                            <div>{{ data.item.name }}</div>
                        </template>
                        <template v-slot:cell(uptime)="data">
                            <div>{{ data.item.uptime }}</div>
                        </template>
                        <template v-slot:cell(region)="data">
                            <div>{{ data.item.region }}</div>
                        </template>
                        <template v-slot:cell(country)="data">
                            <div>{{ data.item.country }}</div>
                        </template>
                        <template v-slot:cell(status)="data">
                            <div>{{ data.item.status }}</div>
                        </template>
                        <template v-slot:cell(isActive)="data">
                            <div>{{ data.item.isActive ? "Deleted" : "" }}</div>
                        </template>
                        <template v-slot:cell(active)="data">
                            <div>
                                <b-btn
                                    :class="
                                        data.item.isActive
                                            ? 'btn-success'
                                            : 'btn-danger'
                                    "
                                    class="btn btn-hover-shine btn-success"
                                    @click.stop="toggleActive(data.item)"
                                    >{{
                                        data.item.isActive
                                            ? "Active"
                                            : "Under Maintenance"
                                    }}</b-btn
                                >
                            </div>
                        </template>
                        <template v-slot:cell(actions)="data">
                            <b-btn class="btn btn-info btn-hover-shine mr-2"
                                   @click.stop="centerMap(data.item)"
                                    >{{"Center"|translate}}</b-btn
                                >
                            <router-link
                                :to="{
                                    name: 'led-edit',
                                    params: {
                                        Code: data.item.deviceCode,
                                        dataState: 'edit'
                                    }
                                }"
                            >
                                <b-btn class="btn btn-warning btn-hover-shine"
                                    >{{"Edit"|translate}}</b-btn
                                >
                               
                            </router-link>
                             <b-btn
                            @click.stop="openModalDelete(data.item)"
                            class="btn btn-danger btn-hover-shine ml-2"
                            >{{ "Delete" | translate }}</b-btn
                        >
                        </template>
                        <template v-slot:head(buildNumber)="data">
                            <div>{{ "buildNumber" | translate }}</div>
                        </template>
                        <template v-slot:head(name)="data">
                            <div>{{ "Name" | translate }}</div>
                        </template>
                        <template v-slot:head(status)="data">
                            <div>{{ "Status" | translate }}</div>
                        </template>
                        <template v-slot:head(uptime)="data">
                            <div>{{ "Uptime" | translate }}</div>
                        </template>
                        <template v-slot:head(region)="data">
                            <div>{{ "Region" | translate }}</div>
                        </template>
                        <template v-slot:head(country)="data">
                            <div>{{ "Country" | translate }}</div>
                        </template>
                        <template v-slot:head(actions)="data">
                            <div>{{ "Actions" | translate }}</div>
                        </template>
                        <template v-slot:head(isActive)="data">
                            <div>{{ "Status" | translate }}</div>
                        </template>
                    </b-table>
                </div>
                <DeleteModal
                :isShown="showDelete"
                :deviceData.sync="record"
                @closeModal="closeModalDelete()"
            />
            </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import {
    FETCH_LED_LIST,
} from "@/store/constants/actions.type";
// import * as VueGoogleMaps from "vue2-google-maps";
// import Vue from "vue";
// import VueAMap from "vue-amap";
import DeleteModal from "./DeleteModal";

export default {
    components: {
        // "google-map": VueGoogleMaps.Map,
        // "google-marker": VueGoogleMaps.Marker,
        DeleteModal
    },

    data() {
        return {
            infovisible: false,
            language: this.$store.state.curLanguage,
            showDialog: false,
            showDelete: false,
            fields: [
                { key: "buildNumber", sortable: true },
                { key: "name", sortable: true },
                { key: "uptime", sortable: true, class:"text-center" },
                { key: "region", sortable: true },
                { key: "country", sortable: true },
                { key: "isActive", sortable: true },
                { key: "actions", class: "text-right" }
            ],
            record: null,
            chinaMode: false,
            state: "",
            center: {
                lat: -6.19088,
                lng: 106.8213
            },
            centerAmap: [104.149952, 30.7478],
            events: {
                // init: o => {},
                moveend: () => {},
                mouseover: () => {
                    this.infovisible = true;
                },
                mouseout: () => {
                    this.infovisible = false;
                },
                complete: () => {},
                zoomchange: () => {},
                click: e => {
                    this.LEDData.map(data => {
                        let longC = parseFloat(data.long);
                        let latC = parseFloat(data.lat);
                        if (
                            longC.toFixed(2) == e.lnglat.lng.toFixed(2) &&
                            latC.toFixed(2) == e.lnglat.lat.toFixed(2)
                        ) {
                            this.$router.push({
                                name: "led-edit",
                                params: {
                                    dataState: "edit",
                                    Code: data.deviceCode
                                }
                            });
                        } else {
                            // alert("not Found!")
                        }
                    });
                }
            },
            openState: false,
            infoWindowPos: null,
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            }
        };
    },
    methods: {
        centerMap(data) {
            this.centerAmap = [parseFloat(data.long),parseFloat(data.lat)]
        },
        push(code) {
            this.$router.push({
                name: "led-edit",
                params: { dataState: "edit", Code: code }
            });
        },
        icon(led) {
            if (led.orientation == "Portrait" && led.isMaintenance == true) {
                return "https://i.ibb.co/bRTydWC/red-portrait.png";
            } else if (
                led.orientation == "Portrait" &&
                led.isMaintenance == false
            ) {
                return "https://i.ibb.co/PQB3wV1/green-portrait.png";
            } else if (
                led.orientation == "Landscape" &&
                led.isMaintenance == true
            ) {
                return "https://i.ibb.co/hRtr6NJ/red-landscape.png";
            } else if (
                led.orientation == "Landscape" &&
                led.isMaintenance == false
            ) {
                return "https://i.ibb.co/LrDrsDK/green-landscape.png";
            }
        },
        toggleCountry() {
            this.chinaMode = !this.chinaMode;
        },
        openModalDelete(playlistData) {
            this.record = playlistData;
            this.showDelete = true;
        },
        closeModalDelete() {
            this.showDelete = false;
            this.record = {};
        }
    },
    mounted() {
        this.$store.dispatch(FETCH_LED_LIST);
        if (this.languageState == "en") {
            this.language = "en";
        } else {
            this.language = "ch";
        }
    },
     watch:{
    showDelete:function(){
      this.$store.dispatch(FETCH_LED_LIST)
    }
  },
    computed: {
        ...mapState({
            LEDData: state => state.led.ledList,
            isLoading: state => state.isLoading,
            languageState: state => state.curLanguage
        })
    }
};
</script>
