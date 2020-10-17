<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="showLocal" max-width="600">
      <v-card class="ms">
        <v-card-title class="headline primary-title">{{"Delete"| translate}}</v-card-title>
        <v-card-text class="table">
          <b-row class="row mb-12">
            <label class="col-md-12 col-form-label">{{"AreYouSureDelete"|translate}}</label>
          </b-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="v-btn" @click="showLocal = false">{{"Cancel"|translate}}</v-btn>
          <v-btn class="v-btn primary" @click="deletePlaylist()">{{"Delete"|translate}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { DELETE_PLAYLIST } from "@/store/constants/actions.type";

export default {
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    playlistData: Object,
  },
  data() {
    return {
      localData: {},
    };
  },
  computed: {
    ...mapState({
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
  methods: {
    deletePlaylist(){
        this.$store.dispatch(DELETE_PLAYLIST, this.playlistData.playlistCode).then(()=>{
            this.showLocal = false;
        })
    },
  }
};
</script>