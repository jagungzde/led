<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="showLocal" max-width="600">
      <v-card>
        <v-card-title class="headline primary-title">{{"NowPlaying"|translate}}</v-card-title>
        <v-card-text>
          <b-row class="row mb-3">
            <label class="col-md-2 col-form-label">{{"PlaylistDescription"|translate}}</label>
            <div class="col-md-10">
              <div class="input-group">
                <input
                  type="text"
                  maxlength="50"
                  v-model="localData.description"
                  class="form-control uppercase"
                  readonly
                />
              </div>
            </div>
          </b-row>
          <b-row class="row mb-3">
            <label class="col-md-2 col-form-label">{{"MediaList"|translate}}</label>
            <div class="col-md-10">
              <b-table
                class="general-table"
                :striped="true"
                small
                responsive
                :outlined="true"
                :hover="true"
                :items="localData.playlistContent"
                :fields="field"
                :sort-desc="false"
              >
                <template v-slot:cell(sequence)="data">
                  <div>{{ data.item.sequence }}</div>
                </template>
                <template v-slot:cell(media)="data">
                  <div>{{ data.item.media.description }}</div>
                </template>
              </b-table>
            </div>
          </b-row>
          <v-card-title class="headline primary-title">{{"ChangePlaylist"|translate}}</v-card-title>
          <b-row class="row mb-3">
            <label class="col-md-2 col-form-label">{{"Playlist"|translate}}</label>
            <div class="col-md-10">
              <div class="input-group">
                <select
                  class="form-control custom-select"
                  v-model="devicePlaylist"
                  label="description"
                >
                <option v-for="opt in playlistData" v-bind:key="opt.playlistCode" :value="opt.playlistCode" >{{opt.description}}</option>
                </select>
              </div>
            </div>
          </b-row>
          <b-row class="row mb-3">
            <label class="col-md-2 col-form-label">{{"MediaList"|translate}}</label>
            <div class="col-md-10">
              <b-table
                class="general-table"
                :striped="true"
                small
                responsive
                :outlined="true"
                :hover="true"
                :items="changePlaylistMedia"
                :fields="field"
                :sort-desc="false"
              >
                <template v-slot:cell(sequence)="data">
                  <div>{{ data.item.sequence }}</div>
                </template>
                <template v-slot:cell(media)="data">
                  <div>{{ data.item.media.description }}</div>
                </template>
              </b-table>
            </div>
          </b-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="v-btn" @click="showLocal = false">{{"Cancel"|translate}}</v-btn>
          <v-btn class="v-btn primary" @click="save()">{{"save"|translate}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import {
  FETCH_PLAYLIST_LIST,
  GET_PLAYLIST_SINGLE
} from "@/store/constants/actions.type";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    playlistCode: String
  },
  data() {
    return {
      localData: Object,
      file: "",
      code: "",
      changePlaylistMedia:Array,
      devicePlaylist: String,
      field: [
        { key: "sequence", sortable: true },
        { key: "media", sortable: true }
      ]
    };
  },
  computed: {
    ...mapState({
      playlistData: state => state.playlist.playlistList,
      isLoading: state => state.isLoading
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
    this.$store.dispatch(FETCH_PLAYLIST_LIST);
  },
  watch: {
    playlistCode: function(val) {
      this.$store.dispatch(GET_PLAYLIST_SINGLE, val).then(data => {
        this.localData = data;
        this.nowPlayingMedia = data.playlistContent
      });
    },
    devicePlaylist: function(val){
      this.$store.dispatch(GET_PLAYLIST_SINGLE, val).then(data => {
        this.changePlaylistMedia = data.playlistContent;
      });
    }
  },
  methods: {}
};
</script>
