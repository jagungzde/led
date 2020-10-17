<template>
<div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">LED</div>
    <div class="card-body">
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
      <router-link :to="{ name: 'led-create', params: {dataState:'create'}}" >
        <b-btn
          class="btn btn-block mb-3 btn-transition"
          variant="outline-primary"
        >Create New LED</b-btn>
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
            >{{ data.item.isActive ? "Active" : "Under Maintenance" }}</b-btn>
          </div>
        </template>
        <template v-slot:cell(actions)="data">
          <router-link :to="{ name: 'led-edit', params: {Code: data.item.deviceCode, dataState:'edit' }}">
        <b-btn
          class="btn btn-warning btn-hover-shine"
        >Edit</b-btn>
      </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        tableData:Array
    },
}
</script>
