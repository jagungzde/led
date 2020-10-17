<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">{{"UserManagement"|translate}}</div>
    <div class="card-body">
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
      <b-btn
          @click.stop="openModal()"
          class="btn btn-block mb-3 btn-transition"
          variant="outline-primary"
        >{{"NewUser"|translate}}</b-btn>
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
        <template v-slot:cell(username)="data">
          <div>{{ data.item.username }}</div>
        </template>
        <template v-slot:cell(role)="data">
          <div>{{ data.item.role }}</div>
        </template>
        <template v-slot:cell(actions)="data">
        <div>
            <b-btn
              @click.stop="openModal(data.item)"
              class="btn btn-danger btn-hover-shine"
            >{{"Edit"|translate}}</b-btn>
          </div>
        </template>
      </b-table>
      <Modal
        :isShown="showDialog"
        :videoData="record"
        :dataState="state"
        @closeModal="closeModal()"
      />
    </div>
  </div>
</template>

<script>
import Modal from "./UserModal"

export default {
  components: {
    Modal
  },
  data: () => ({
    showDialog: false,
    fields: [
      { key: "username", sortable: true },
      { key: "role", sortable: true },
      { key: "actions", class: "text-right" }
    ],
    record: null,
    state: "",
    dummy:[
        {"username": "Andrea", "role":"super admin"},
        {"username": "Devina", "role":"video admin"},
    ]
  }),
  methods: {
    openModal(userdata) {
      if (!userdata) {
        this.state = "create";
        this.showDialog = true;
      } else {
          this.state = "edit";
          this.record = userdata;
          this.showDialog = true;
      }
    },
    closeModal() {
      this.showDialog = false;
      this.record = {};
    },
  },
};
</script>