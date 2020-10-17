<template>
  <b-row>
    <div
      v-for="(item) in tableData"
      v-bind:key="item.deviceCode"
      class="card main-card col-md-3 mt-2 mr-3 ml-3 !important"
    >
      <div class="card-header">
        <div style="width:100%">{{item.name}}</div>
        <div
          v-if="item.isMaintenance == false"
          class="text-right"
          style="width:100%"
        >{{"Online"|translate}} <img src="https://www.shareicon.net/data/16x16/2015/03/03/1647_ledgreen_48x48.png"/></div>
        <div v-else class="text-right" style="width:100%">{{"Offline"|translate}} <img src="https://www.shareicon.net/data/16x16/2015/03/04/1750_record_22x22.png"/></div>
      </div>
      <div class="card-body">
        <b-row>
            <label class="btn btn-info text-darker text center" 
            @click.stop="openModal(item.devicePlaylist)" style="width:100%">{{"DevicePlaylist"|translate}}</label>
            <div class="text-center">
              <div class="text-center badge">
                <label>{{"MediaOperation"|translate}}:</label>
              </div>
              <div>
                <b-btn class="btn btn-info btn-hover-shine mr-1 pe-7s-prev" />
                <b-btn class="btn btn-info btn-hover-shine mr-1 pe-7s-albums" />
                <b-btn class="btn btn-info btn-hover-shine mr-1 pe-7s-play" />
                <b-btn class="btn btn-info btn-hover-shine mr-1 pe-7s-next" />
                <b-btn class="btn btn-info btn-hover-shine mr-1 lnr-volume-low" />
                <b-btn class="btn btn-info btn-hover-shine mr-1 lnr-volume-high" />
              </div>
            </div>
            
        </b-row>
      </div>
    </div>
    <Modal
             :isShown="showDialog"
             :playlistCode="record"
             :code="Code"
             @closeModal="closeModal()"
            />
  </b-row>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_LED_LIST } from "@/store/constants/actions.type";
import Modal from "./RealTimeModal";

export default {
  components: {
    Modal
  },
  data: () => ({
    showDialog: false,
    today : (new Date).getDay(),
    Code:'',
    fields: [
      { key: "buildNumber", sortable: true },
      { key: "name", sortable: true },
      { key: "uptime", sortable: true },
      { key: "region", sortable: true },
      { key: "country", sortable: true },
      { key: "actions", class: "actions-column" }
    ],
    record: '',
    state: ""
  }),
  methods: {
    openModal(playlistData) {
      if (!playlistData) {
        this.showDialog = true;
      } else {
          playlistData.map(data=>{
            if(data.weekOfDay == this.today){
              this.record = data.playlistCode;
            }
          })
          this.Code = playlistData.deviceCode
          this.showDialog = true;
      }
    },
    closeModal() {
      this.showDialog = false;
      this.record = {};
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_LED_LIST);

  },
  computed: {
    ...mapState({
      tableData: state => state.led.ledList,
      isLoading: state => state.isLoading
    })
  }
};
</script>