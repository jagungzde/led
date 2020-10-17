<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="showLocal" max-width="600">
      <v-card class="ms">
        <v-card-title class="headline primary-title">{{ dataState == 'create' ? "Create" : "Edit" }}</v-card-title>
        <v-card-text class="table">
          <b-row class="row mb-3">
            <label class="col-md-3 col-form-label">Description</label>
            <div class="col-md-9">
              <div class="input-group">
                <input
                  type="text"
                  maxlength="20"
                  v-model="localData.description"
                  class="form-control uppercase"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="descriptionPO">
                    <font-awesome-icon icon="info" />
                  </span>
                </div>
                <b-popover target="descriptionPO" triggers="hover" placement="left">
                  <template v-slot:title>Help...</template>
                  <ul>
                    <li>Playlist Description</li>
                  </ul>
                </b-popover>
              </div>
            </div>
          </b-row>
          <b-row class="row mb-3">
            <label class="col-md-3 col-form-label">Media Select</label>
            <div class="col-md-9">
              <div class="input-group">
                <b-table
                  class="general-table"
                  :striped="true"
                  small
                  responsive
                  :outlined="true"
                  :hover="true"
                  :fields="fields"
                  :items="localData.playlistcontent"
                >
                <template v-slot:cell(sequence)="data">
          <div>{{ data.index  + 1}}</div>
        </template>
                  <template v-slot:cell(filename)="data">
                    <div>{{ data.item.filename }}</div>
                  </template>
                  <template v-slot:cell(actions)="data">
                    <div>
                      <b-btn class="btn btn-warning btn-hover-shine" @click.stop="deleteVideo(data)">Delete</b-btn>
                    </div>
                  </template>
                </b-table>
              </div>
            </div>
          </b-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="v-btn" @click="showLocal = false">Cancel</v-btn>
          <v-btn class="v-btn primary" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import {
  FETCH_MEDIA_LIST,
  CREATE_PLAYLIST
} from "@/store/constants/actions.type";

export default {
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    playlistData: Object,
    dataState: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localData: {},
      selectedMedia: [],
      fields: [
        { key: "filename", sortable: true },
        { key: "actions", class: "actions-column" }
      ]
    };
  },
  computed: {
    ...mapState({
      mediaData: state => state.media.mediaList
    }),
    showLocal: {
      get() {
        return this.isShown;
      },
      set(val) {
        if (!val) {
          this.$emit("closeModal");
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_MEDIA_LIST);
  },
  watch: {
    playlistData: function(val) {
      this.localData = { ...val };
    }
  },
  methods: {
    deleteVideo(data){
      this.localData.playlistcontent.splice(data.index,1)
    },
    includeMedia(mediaCode) {
      if (!this.localData.playlistcontent) {
        this.localData = { playlistcontent: [] };
      }
      this.localData.playlistcontent.push(mediaCode);
    },
    save() {
      if (this.dataState === "create") {
        let mediaArray = this.localData.media.map(data => {
          return { mediaCode: data.mediaCode };
        });
        let payload = {
          Description: this.localData.description,
          PlaylistContent: mediaArray
        };
        this.$store.dispatch(CREATE_PLAYLIST, payload).then(() => {
          this.showLocal = false;
        });
      } else {
        // this.$store.dispatch(EDIT_GAMES, this.localData).then(() => {
        this.showLocal = false;
        // });
      }
    }
  }
};
</script>
<style>
.table {
  overflow: auto;
}
</style>