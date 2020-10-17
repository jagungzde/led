<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="showLocal" max-width="600">
      <v-card>
        <v-card-title class="headline primary-title"></v-card-title>
        <v-card-text>
          <b-row class="mb-3">
            <b-col cols="4">{{"Username"|translate}}</b-col>
            <b-col cols="8">
              <div class="input-group">
                <input type="text" v-model="localData.Username" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="usernamePO">
                    <font-awesome-icon icon="info" />
                  </span>
                </div>
                <b-popover target="usernamePO" triggers="hover" placement="left">
                  <template v-slot:title>Help...</template>
                  <ul>
                    <li>Sub-Account Username</li>
                  </ul>
                </b-popover>
              </div>
            </b-col>
          </b-row>
        <b-row class="mb-3">
            <b-col cols="4">{{"Email"|translate}}</b-col>
            <b-col cols="8">
              <div class="input-group">
                <input type="text" v-model="localData.EmailAddress" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="emailPO">
                    <font-awesome-icon icon="info" />
                  </span>
                </div>
                <b-popover target="emailPO" triggers="hover" placement="left">
                  <template v-slot:title>Help...</template>
                  <ul>
                    <li>Sub-Account Email</li>
                  </ul>
                </b-popover>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">{{"Password"|translate}}</b-col>
            <b-col cols="8">
              <div class="input-group">
                <input type="password" v-model="localData.Password" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="passwordPO">
                    <font-awesome-icon icon="info" />
                  </span>
                </div>
                <b-popover target="passwordPO" triggers="hover" placement="left">
                  <template v-slot:title>Help...</template>
                  <ul>
                    <li>Sub-Account Password</li>
                  </ul>
                </b-popover>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">{{"ConfirmPassword"|translate}}</b-col>
            <b-col cols="8">
              <div class="input-group">
                <input type="password" v-model="localData.ConPassword" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="conpasswordPO">
                    <font-awesome-icon icon="info" />
                  </span>
                </div>
                <b-popover target="conpasswordPO" triggers="hover" placement="left">
                  <template v-slot:title>Help...</template>
                  <ul>
                    <li>Password Confirmation</li>
                  </ul>
                </b-popover>
              </div>
            </b-col>
          </b-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="v-btn" @click="showLocal = false">{{"Cancel"|translate}}</v-btn>
          <v-btn class="v-btn primary" @click="save(selectedCategory)">{{"save"|translate}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  CREATE_USER_ACCOUNT
} from "@/store/constants/actions.type";

export default {
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    orgCode: null,
    newAcc: Object,
  },
  data() {
    return {
      localData: {},
    };
  },
  computed: {
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
    save() {
        this.localData.OrganizationCode = this.orgCode;
        this.$store.dispatch(CREATE_USER_ACCOUNT, this.localData).then((data) => {
          this.newAcc = this.localData;
          this.showLocal = false;
        });
      } 
    }
};
</script>
