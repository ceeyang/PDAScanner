export default [
  {
    path: '/',
    component: require('./assets/vue/pages/home/home.vue')
    // component: require('./assets/vue/pages/home.vue')
    // component: require('./assets/vue/pages/sys/index.vue')
  },
  {
    path: '/chats/',
    component: require('./assets/vue/pages/chats/chats.vue')
  },
  {
    path: '/mine/',
    component: require('./assets/vue/pages/mine/mine.vue')
  },
  {
    path: '/settings/',
    component: require('./assets/vue/pages/mine/settings.vue')
  },
  {
    path: '/about/',
    component: require('./assets/vue/pages/about.vue')
  },
  {
    path: '/login/',
    component: require('./assets/vue/pages/mine/login.vue')
  },



  {
    path: '/form/',
    component: require('./assets/vue/pages/form.vue')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./assets/vue/pages/dynamic-route.vue')
  },
  {
    path: '/panel-left/',
    component: require('./assets/vue/pages/panel-left.vue')
  },
  {
    path: '/color-themes/',
    component: require('./assets/vue/pages/color-themes.vue')
  },
  {
    path: '/chat/',
    component: require('./assets/vue/pages/chat.vue')
  },
  {
    path: '/vuex/',
    component: require('./assets/vue/pages/vuex.vue')
  },
]
