<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">{{"DataPlanUsage"|translate}}</div>
    <div class="card-body">
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
        <template v-slot:cell(simCard)="data">
          <div>{{ data.item.simCard }}</div>
        </template>
        <template v-slot:cell(dataUsage)="data">
          <div>{{ data.item.dataUsage }}</div>
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
        >{{"Edit"|translate}}</b-btn>
      <!-- </router-link> -->
        </template>
        <template v-slot:head(buildNumber)="data">
          <div>{{"buildNumber"|translate}}</div>
        </template>
        <template v-slot:head(name)="data">
          <div>{{"Name"|translate}}</div>
        </template>
        <template v-slot:head(simCard)="data">
          <div>{{"SIMCard"|translate}}</div>
        </template>
        <template v-slot:head(dataUsage)="data">
          <div>{{"DataUsage"|translate}}</div>
        </template>
        <template v-slot:head(actions)="data">
          <div>{{"Actions"|translate}}</div>
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
      { key: "simCard", sortable: true },
      { key: "dataUsage", sortable: true},
      { key: "actions", class: "text-right" }
    ],
    record: null,
    state: "",
    dummy:[
        {"buildNumber": "0f8a01e7-22a6-4d58-94ae-b554fdde4db2", "name":"LED 4", "simCard":"Simpati","dataUsage":"1028 MB"},
        {"buildNumber": "271df1bc-cd78-4fa0-9476-117f5a2d2159", "name":"LED 1", "simCard":"Im3","dataUsage":"514 MB"},
        {"buildNumber": "83db6cbe-3dc2-4213-897f-00d55c957f83", "name":"LED Try", "simCard":"As","dataUsage":"852 MB"},
        {"buildNumber": "a625bdee-862e-4d8e-8053-1f6706184504", "name":"LED 2", "simCard":"3","dataUsage":"456 MB"},
        {"buildNumber": "b38dfc51-c346-470b-a190-e23e4ca9e549", "name":"LED6", "simCard":"XL","dataUsage":"212 MB"},
        {"buildNumber": "edc88c18-0ab2-426e-b917-a9c27bd6346e", "name":"LED 3", "simCard":"SmartFren","dataUsage":"129 MB"},
    ]
  }),
//   computed: {
//     ...mapState({
//       isLoading: state => state.isLoading
//     })
//   }
};
</script>