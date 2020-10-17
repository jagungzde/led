<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">{{"StatusMonitoring"|translate}}</div>
    <div class="card-body">
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
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
        <template v-slot:cell(networkStatus)="data">
          <div>{{ data.item.status }}</div>
        </template>
        <!-- <template v-slot:cell(active)="data">
          <div>
            <b-btn
              :class="data.item.isActive ? 'btn-success' : 'btn-danger'"
              class="btn btn-hover-shine btn-success"
              @click.stop="toggleActive(data.item)"
            >{{ data.item.isActive ? "Active" : "Under Maintenance" }}</b-btn>
          </div>
        </template> -->
        <template v-slot:cell(actions)="data">
          <!-- <router-link :to="{ name: 'led-edit', params: {Code: data.item.deviceCode, dataState:'edit' }}"> -->
        <b-btn
          class="btn btn-warning btn-hover-shine"
        >{{"isActive"|translate}}</b-btn>
         
      <!-- </router-link> -->
        </template>
        <template v-slot:head(buildNumber)="data">
          <div>{{"buildNumber"|translate}}</div>
        </template>
        <template v-slot:head(name)="data">
          <div>{{"Name"|translate}}</div>
        </template>
        <template v-slot:head(networkStatus)="data">
          <div>{{"NetworkStatus"|translate}}</div>
        </template>
        <template v-slot:head(actions)="data">
          <div>{{"Actions"|translate}}</div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
    FETCH_LED_LIST,
} from "@/store/constants/actions.type";
import { mapState } from "vuex";

export default {
  data: () => ({
    showDialog: false,
    fields: [
      { key: "buildNumber", sortable: true },
      { key: "name", sortable: true },
      { key: "networkStatus", sortable: true,  class: "text-right" },
      // { key: "actions", class: "text-right" }
    ],
    record: null,
    state: "",
    dummy:[
        {"buildNumber": "0f8a01e7-22a6-4d58-94ae-b554fdde4db2", "name":"LED 4", "networkStatus":"Active"},
        {"buildNumber": "271df1bc-cd78-4fa0-9476-117f5a2d2159", "name":"LED 1", "networkStatus":"Active"},
        {"buildNumber": "83db6cbe-3dc2-4213-897f-00d55c957f83", "name":"LED Try", "networkStatus":"Inactive"},
        {"buildNumber": "a625bdee-862e-4d8e-8053-1f6706184504", "name":"LED 2", "networkStatus":"Active"},
        {"buildNumber": "b38dfc51-c346-470b-a190-e23e4ca9e549", "name":"LED6", "networkStatus":"Inactive"},
        {"buildNumber": "edc88c18-0ab2-426e-b917-a9c27bd6346e", "name":"LED 3", "networkStatus":"Active"},
    ]
  }),
mounted() {
        this.$store.dispatch(FETCH_LED_LIST);
    },
  computed: {
        ...mapState({
            LEDData: state => state.led.ledList,
            isLoading: state => state.isLoading,
        })
    }
};
</script>