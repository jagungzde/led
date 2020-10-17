import Vue from "vue";
import Router from "vue-router";
// import store from "@/store/";

Vue.use(Router);

let router = new Router({
    // mode: "history",
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // Dashboards
        // {
        //     path: '/',
        //     name: 'analytics',
        //     component: () => import('../DemoPages/Dashboards/Product.vue'),
        // },
        //Master LED
        {
            path: '/ledlist/',
            name: 'led-list',
            component: () => import('../Views/LED/LEDList.vue'),
        },
        {
            path: '/ledlist/:dataState?',
            name: 'led-create',
            props: true,
            component: () => import('../Views/LED/LEDCreate.vue'),
        },
        {
            path: "/ledlist/:dataState/:Code?",
            name: "led-edit",
            props: true,
            component: () => import("@/Views/LED/LEDCreate.vue")
        },
       //Master Video
       {
        path: '/videolist/',
        name: 'video-list',
        component: () => import('../Views/Video/VideoList.vue'),    
       },
       //Master Playlist
       {
        path: '/playlistlist/create/:dataState?',
        name: 'playlist-create',
        props: true,
        component: () => import('../Views/Playlist/PlaylistCreate.vue'),    
       },
       {
        path: '/playlistlist/edit/:playlistCode?',
        name: 'playlist-edit',
        props: true,
        component: () => import('../Views/Playlist/PlaylistCreate.vue'),    
       },
       {
        path: '/playlistlist/',
        name: 'playlist-list',
        component: () => import('../Views/Playlist/PlaylistList.vue'),    
       },
       //DailyReport
       {
        path: '/dailyReport/dataplanusage',
        name: 'daily-dataplan',
        component: () => import('../Views/DailyReport/DataplanUsage.vue'),    
       },
       {
        path: '/dailyReport/statusmonitoring',
        name: 'daily-statusmonitoring',
        component: () => import('../Views/DailyReport/StatusMonitoringList.vue'),    
       },
       {
        path: '/dailyReport/uptimemonitoring',
        name: 'daily-uptimemonitoring',
        component: () => import('../Views/DailyReport/UptimeMonitoring.vue'),    
       },
       //HistoryReport
       {
        path: '/historyReport/dataplanusage',
        name: 'history-dataplan',
        component: () => import('../Views/HistoryReport/DataplanUsage.vue'),    
       },
       {
        path: '/historyReport/statusmonitoring',
        name: 'history-statusmonitoring',
        component: () => import('../Views/HistoryReport/StatusMonitoringList.vue'),    
       },
       {
        path: '/historyReport/uptimemonitoring',
        name: 'history-uptimemonitoring',
        component: () => import('../Views/HistoryReport/UptimeMonitoring.vue'),    
       },
       //LEDREALTIMECONTROLLER
       {
        path: '/ledcontroller',
        name: 'led-realtime-controller',
        component: () => import('../Views/LEDRealTimeController/LEDRealTimeController.vue'),    
       },
       //User Management
       {
        path: '/usermanagement',
        name: 'user-management',
        component: () => import('../Views/UserManagement/UserManagement.vue'), 
       },
       //LED Maintenance List
       {
        path: '/ledmaintenancelist/',
        name: 'led-maintenance-list',
        component: () => import('../Views/Maintenance/OnGoingMaintenanceList.vue'),
    },
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.name !== "user-login" && !store.state.auth.isAuthenticated) {
//         next({ name: "user-login" });
//     } else {
//         next();
//     }
// })

export default router;