<template>
  <div class="card-hover-shadow card-border mb-3 card">
    <div class="card-header">{{"Video"|translate}}</div>
    <div class="card-body">
      <VueElementLoading :active="isLoading" spinner="ring" color="var(--success)" />
        <b-btn
          @click.stop="openModal()"
          class="btn btn-block mb-3 btn-transition"
          variant="outline-primary"
        >{{"UploadNewVideo" | translate}}</b-btn>
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
        <template v-slot:cell(locationUrl)="data">
          <div>{{ data.item.locationUrl }}</div>
        </template>
        <template v-slot:cell(orientation)="data">
          <div>{{ data.item.orientation }}</div>
        </template>
        <template v-slot:cell(isActive)="data">
          <div>{{ data.item.isActive ?  "Not Active" : "Active" }}</div>
        </template>
        <template v-slot:cell(actions)="data">
          <div>
            <b-btn
              @click.stop="deleteVideo(data.item)"
              class="btn btn-danger btn-hover-shine"
            >{{"Delete"|translate}}</b-btn>
          </div>
        </template>
        <template v-slot:head(description)="data">
          <div>{{"desc" | translate}}</div>
        </template>
        <template v-slot:head(locationUrl)="data">
          <div>{{"LocationURL" | translate}}</div>
        </template>
        <template v-slot:head(orientation)="data">
          <div>{{ "Orientation" | translate }}</div>
        </template>
        <template v-slot:head(isActive)="data">
          <div>{{"isActive" | translate}}</div>
        </template>
        <template v-slot:head(actions)="data">
          <div>{{"Actions" | translate}}</div>
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
import {FETCH_MEDIA_LIST, DELETE_MEDIA} from "@/store/constants/actions.type";
import { mapState } from "vuex";
import Modal from "./VideoModal";

export default {
  components: {
    Modal
  },
  data: () => ({
    showDialog: false,
    fields: [
      { key: "description", sortable: true },
      { key: "locationUrl", sortable: true },
      {key:"orientation", sortable:true},
      { key: "isActive", sortable: true },
      { key: "actions", class: "text-right" }
    ],
    record: null,
    state: "",
  }),
  methods: {
    openModal(videodata) {
      if (!videodata) {
        this.state = "create";
        this.showDialog = true;
      } else {
          this.state = "edit";
          this.record = videodata;
          this.showDialog = true;
      }
    },
    closeModal() {
      this.showDialog = false;
      this.record = {};
    },
    deleteVideo(videoData) {
      this.$swal({
        title: "Proceed with deleting video " + videoData.description + "?" 
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(DELETE_MEDIA, videoData.mediaCode).then(()=>{
            this.$store.dispatch(FETCH_MEDIA_LIST);
          })
        }
      });
    }
  },
  
  mounted() {
    this.$store.dispatch(FETCH_MEDIA_LIST);
  },
  computed: {
    ...mapState({
      tableData: state => state.media.mediaList,
      isLoading: state => state.isLoading
    })
  }
};
</script>