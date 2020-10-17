<template>
  <div
    class="app-sidebar sidebar-shadow bg-heavy-rain text-darker"
    @mouseover="toggleSidebarHover('add','closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <div class="logo-src" />
      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active' : isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll">
        <sidebar-menu v-if="chineseMode == false" showOneChild :menu="menu" />
        <sidebar-menu v-else-if="chineseMode == true" showOneChild :menu="chineseMenu" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar
  },
  data() {
    return {
      chineseMode:false,
      isOpen: false,
      sidebarActive: false,
      chineseMenu:[
        {
          title: 'LED清单',
          icon: "pe-7s-rocket",
          href: "/ledlist/"
        },
        {
          title: "广告媒体管理",
          icon: "pe-7s-play",
          href: "/videolist/"
        },
        {
          title: "播放清单管理",
          icon: "pe-7s-copy-file",
          href: "/playlistlist/"
        },
        {
          title: "日常运作监控",
          icon: "pe-7s-photo-gallery",
          child:[
              {
                  title: "状态监控",
                  href:'/dailyReport/statusmonitoring'
              },
              {
                  title: "正常运行时间监控",
                  href:'/dailyReport/uptimemonitoring'
              },
              {
                  title: "数据计划监控",
                  href:'/dailyReport/dataplanusage'
              },
          ]
        },
        // {
        //   title: "LED实时控制器",
        //   icon: "pe-7s-power",
        //   href: "/ledcontroller"
        // },
        {
          title: "进行中的维护",
          icon: "pe-7s-config",
          href: "/ledmaintenancelist/"
        },
        {
          title: "用户管理",
          icon: "pe-7s-user",
          href: "/usermanagement"
        },
        // {
        //   title: "历史报告",
        //   icon: "pe-7s-calculator",
        //   child:[
        //       {
        //           title: "正常运行时间监控",
        //           href:'/historyReport/uptimemonitoring'
        //       },
        //       {
        //           title: "数据计划监控",
        //           href:'/historyReport/dataplanusage'
        //       },
        //       {
        //           title: "维修记录",
        //           href:''
        //       },
        //   ]
        // },
      ],
      menu: [
        {
          title: 'LEDList',
          icon: "pe-7s-rocket",
          href: "/ledlist/"
        },
        {
          title: "Adv Media management",
          icon: "pe-7s-play",
          href: "/videolist/"
        },
        {
          title: "Playlist Management",
          icon: "pe-7s-copy-file",
          href: "/playlistlist/"
        },
        {
          title: "Daily Operation Monitoring",
          icon: "pe-7s-photo-gallery",
          child:[
              {
                  title: "Status Monitoring",
                  href:'/dailyReport/statusmonitoring'
              },
              {
                  title: "Uptime Monitoring",
                  href:'/dailyReport/uptimemonitoring'
              },
              {
                  title: "Data Plan Usage",
                  href:'/dailyReport/dataplanusage'
              },
          ]
        },
        // {
        //   title: "LED Real Time Controller",
        //   icon: "pe-7s-power",
        //   href: "/ledcontroller"
        // },
        {
          title: "On Going Maintenance",
          icon: "pe-7s-config",
          href: "/ledmaintenancelist/"
        },
        {
          title: "User Management",
          icon: "pe-7s-user",
          href: "/usermanagement"
        },
        // {
        //   title: "History Report",
        //   icon: "pe-7s-calculator",
        //   child:[
        //       {
        //           title: "Uptime Monitoring",
        //           href:'/historyReport/uptimemonitoring'
        //       },
        //       {
        //           title: "Data Plan Usage",
        //           href:'/historyReport/dataplanusage'
        //       },
        //       {
        //           title: "Maintenance History",
        //           href:''
        //       },
        //   ]
        // },
      ],
      collapsed: true,

      windowWidth: 0
    };
  },
  props: {
    sidebarbg: String
  },
  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    }
  },
  computed: {
    ...mapState({
      languageState: state=> state.curLanguage,
    })
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },
  watch:{
    languageState: function(value){
      if(value == 'en'){
        this.chineseMode = false;
      } else {
        this.chineseMode = true;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  }
};
</script>
