<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">
      <div class="text-left">
      {{"DataPlanUsage"|translate}}
      </div>
    </div>
    <div class="card-body">
      <b-btn class="btn btn-info btn-hover-shine mb-2">
           {{"Refresh"|translate}}
        </b-btn>
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
      <b-table
        class="general-table"
        :striped="true"
        small
        responsive
        :outlined="true"
        :hover="true"
        :items="dummy"
        :fields="fields"
      >
        <template v-slot:cell(buildNumber)="data">
          <div>{{ data.item.buildNumber }}</div>
        </template>
        <template v-slot:cell(name)="data">
          <div>{{ data.item.name }}</div>
        </template>
        <template v-slot:cell(downtimeStatus)="data">
          <div>{{ data.item.downtimeStatus }}</div>
        </template>
        <template v-slot:cell(uptimeStatus)="data">
          <div>{{ data.item.uptimeStatus }}</div>
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
      <!-- </router-link> -->
        </template>
        <template v-slot:head(buildNumber)="data">
          <div>{{"buildNumber"|translate}}</div>
        </template>
        <template v-slot:head(name)="data">
          <div>{{"Name"|translate}}</div>
        </template>
        <template v-slot:head(downtimeStatus)="data">
          <div>{{"DowntimeStatus"|translate}}</div>
        </template>
        <template v-slot:head(uptimeStatus)="data">
          <div>{{"UptimeStatus"|translate}}</div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showDialog: false,
    fields: [
      { key: "buildNumber", sortable: true },
      { key: "name", sortable: true },
      { key: "downtimeStatus", sortable: true },
      { key: "uptimeStatus", sortable: true},
      // { key: "actions", class: "actions-column" }
    ],
    record: null,
    state: "",
    dummy:[
        {"buildNumber": "0f8a01e7-22a6-4d58-94ae-b554fdde4db2", "name":"LED 4", "downtimeStatus":"02:12:05","uptimeStatus":"12:15:06"},
        {"buildNumber": "271df1bc-cd78-4fa0-9476-117f5a2d2159", "name":"LED 1", "downtimeStatus":"03:22:07","uptimeStatus":"12:15:06"},
        {"buildNumber": "83db6cbe-3dc2-4213-897f-00d55c957f83", "name":"LED Try", "downtimeStatus":"01:21:07","uptimeStatus":"14:09:01"},
        {"buildNumber": "a625bdee-862e-4d8e-8053-1f6706184504", "name":"LED 2", "downtimeStatus":"00:31:01","uptimeStatus":"18:11:11"},
        {"buildNumber": "b38dfc51-c346-470b-a190-e23e4ca9e549", "name":"LED6", "downtimeStatus":"00:31:01","uptimeStatus":"18:11:11"},
        {"buildNumber": "edc88c18-0ab2-426e-b917-a9c27bd6346e", "name":"LED 3", "downtimeStatus":"03:22:07","uptimeStatus":"12:15:06"},
    ]
  }),
//   computed: {
//     ...mapState({
//       isLoading: state => state.isLoading
//     })
//   }
};
</script>