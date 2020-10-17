<template>
    <div class="app-header header-shadow bg-heavy-rain">
        <div class="logo-src" />
        <div class="app-header__content">
            <div class="app-header-left">
                <!-- <SearchBox/>
                <MegaMenu/> -->
            </div>
            <div class="app-header-right">
                <div class="text-right" style="width:100%">
                    {{'chinese'| translate}}
                    <b-checkbox
                        v-model="chinaMode"
                        @change="toggleCountry()"
                        size="is-large"
                        :switch="true"
                    />
                </div>
                <!-- <HeaderDots/> -->
                <!-- <UserArea/> -->
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button
                    type="button"
                    class="hamburger close-sidebar-btn hamburger--elastic"
                    v-bind:class="{ 'is-active': isOpen }"
                    @click="toggleMobile('closed-sidebar-open')"
                >
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-header__menu">
            <span>
                <b-button
                    class="btn-icon btn-icon-only"
                    variant="primary"
                    size="sm"
                    v-bind:class="{ active: isOpenMobileMenu }"
                    @click="toggleMobile2('header-menu-open')"
                >
                    <div class="btn-icon-wrapper">
                        <font-awesome-icon icon="ellipsis-v" />
                    </div>
                </b-button>
            </span>
        </div>
    </div>
</template>

<script>
// import SearchBox from './Header/SearchBox';
// import MegaMenu from './Header/MegaMenu';
// import HeaderDots from './Header/HeaderDots';
import { mapState } from "vuex";
import Vue from 'vue';
import UserArea from "./Header/HeaderUserArea";
import { CHANGE_LANGUAGE } from "@/store/constants/actions.type";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEllipsisV);
export default {
    name: "Header",
    components: {
        // SearchBox,
        // MegaMenu,
        // HeaderDots,
        UserArea,
        "font-awesome-icon": FontAwesomeIcon
    },

    data() {
        return {
            isOpen: false,
            isOpenMobileMenu: false,
            language: this.$store.state.curLanguage,
            chinaMode:false,
        };
    },
    props: {
        headerbg: String
    },
    methods: {
        toggleCountry() {
            this.chinaMode = !this.chinaMode;
            if (this.language == "en") {
                this.language = "ch";
            } else {
                this.language = "en";
            }
            Vue.i18n.set(this.language);
            this.$store.dispatch(CHANGE_LANGUAGE, this.language);
        },
        toggleMobile(className) {
            const el = document.body;
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },

        toggleMobile2(className) {
            const el = document.body;
            this.isOpenMobileMenu = !this.isOpenMobileMenu;

            if (this.isOpenMobileMenu) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        }
    },
    mounted() {
    if(this.languageState == 'en'){
      this.chinaMode = false;
      this.language = 'en';
    } else{
    this.chinaMode = true;
      this.language = 'ch'
    }
  },
  computed: {
    ...mapState({
      languageState: state=> state.curLanguage,
    })
  }
};
</script>
