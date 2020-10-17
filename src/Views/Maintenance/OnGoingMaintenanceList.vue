<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">{{"LEDOnGoingMaintenance"|translate}}</div>
    <div class="card-body">
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
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
        <template v-slot:cell(active)="data">
          <div>
            <b-btn
              :class="data.item.isActive ? 'btn-success' : 'btn-danger'"
              class="btn btn-hover-shine btn-success"
              @click.stop="toggleActive(data.item)"
            >{{ data.item.isActive ? "isActive" : "UnderMaintenance"|translate }}</b-btn>
          </div>
        </template>
        <template v-slot:cell(actions)="data">
          <router-link :to="{ name: 'led-edit', params: {Code: data.item.deviceCode, dataState:'edit' }}">
        <b-btn
          class="btn btn-warning btn-hover-shine"
        >Edit</b-btn>
      </router-link>
        </template>
        <template v-slot:head(buildNumber)="data">
          <div>{{"buildNumber"|translate}}</div>
        </template>
        <template v-slot:head(name)="data">
          <div>{{"Name"|translate}}</div>
        </template>
        <template v-slot:head(uptime)="data">
          <div>{{"Uptime"|translate}}</div>
        </template>
        <template v-slot:head(region)="data">
          <div>{{"Region"|translate}}</div>
        </template>
        <template v-slot:head(country)="data">
          <div>{{"Country"|translate}}</div>
        </template>
        <template v-slot:head(active)="data">
          <div>{{"isActive"|translate}}</div>
        </template>
      </b-table>
    </div>
  </div>


<!-- <div class="row col-md-12">
   <div class="row col-md-12">
   <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
      <router-link :to="{ name: 'led-create', params: {dataState:'create'}}" >
        <b-btn
          class="btn btn-block mb-3 btn-transition"
          variant="outline-primary"
        >Create New LED</b-btn>
      </router-link>
   </div>
  <div v-for="(item) in tableData" v-bind:key="item.deviceCode" class="card main-card col-md-3 mt-1 ml-1">
    <div class="card-header">{{item.name}}</div>
    <div class="card-body col-md-12">
      <b-row class="col-md-8 mb-2">
        <v-img
                  src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
                  aspect-ratio="1"
                  class="grey lighten-2"
        />
      </b-row>
          <router-link :to="{ name: 'led-edit', params: {Code: item.deviceCode, dataState:'edit' }}">
        <b-btn
          class="btn btn-warning btn-hover-shine"
        >Detail</b-btn>
      </router-link>
    </div>
  </div>
</div> -->
</template>

<script>
import { mapState } from "vuex";
import {FETCH_LED_LIST,TOGGLE_MAINTENANCE} from "@/store/constants/actions.type";


export default {
  data: () => ({
    showDialog: false,
    fields: [
      { key: "buildNumber", sortable: true },
      { key: "name", sortable: true },
      { key: "uptime", sortable: true },
      { key: "region", sortable: true},
      { key: "country", sortable: true},
      { key: "active", class: "text-right" }
    ],
    record: null,
    state: "",
  }),
  methods: {
    toggleActive(leddata){
        this.$swal({
        title: "Are " + leddata.name + " done maintaining?" 
      }).then(result => {
        if (result.value) {
            this.$store.dispatch(TOGGLE_MAINTENANCE, leddata.deviceCode).then(
                this.$store.dispatch(FETCH_LED_LIST)
            )
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_LED_LIST);
  },
  computed: {
    ...mapState({
      tableData: state => state.led.ledMaintenanceList,
      isLoading: state => state.isLoading
    })
  }
};
</script>