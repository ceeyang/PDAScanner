export default [{
    path: '/',
    component: require('./assets/vue/pages/mine/login.vue')
  },{
    path: '/home/',
    // component: require('./assets/vue/pages/home.vue')
    component: require('./assets/vue/pages/home/home.vue')
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
  },{
    path: '/about/',
    component: require('./assets/vue/pages/mine/about.vue')
  },
  {
    path: '/login/',
    component: require('./assets/vue/pages/mine/login.vue')
  },


  {
    path: '/assetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/assetcheck.vue')
  },
  {
    path: '/newAssetCheck/',
    component: require('./assets/vue/pages/home/assetcheck/newAssetCheck.vue')
  },
   {
    path: '/detailAssetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/detailAssetcheck.vue')
  },
   {
    path: '/beginAassetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/beginAassetcheck.vue')
  },
  {
    path: '/detailAsset/',
    component: require('./assets/vue/pages/home/assetcheck/detailAsset.vue')
  },


   {
    path: '/propertyDetail/',
    component: require('./assets/vue/pages/home/assetcheck/propertyDetail.vue')
  },
  {
    path: '/devicemeasure/',
    component: require('./assets/vue/pages/home/devicemeasure/index.vue')
  },
  {
    path: '/measuredetail/',
    component: require('./assets/vue/pages/home/devicemeasure/detail.vue')
  },



  // Repair
  {
    path: '/repair/',
    component: require('./assets/vue/pages/home/repair/index.vue')
  },
  {
    path: '/readyrepair/',
    component: require('./assets/vue/pages/home/repair/readyrepair.vue')
  },
  {
    path: '/takeorders/',
    component: require('./assets/vue/pages/home/repair/takeorders.vue')
  },
  {
    path: '/repairing/',
    component: require('./assets/vue/pages/home/repair/repairing.vue')
  },


  //  scanrepair
  {
    path: '/scanrepair/',
    component: require('./assets/vue/pages/home/scanrepair/index.vue')
  },
  {
    path: '/applyrepair/',
    component: require('./assets/vue/pages/home/scanrepair/applyrepair.vue')
  },
  {
    path: '/newRepair/',
    component: require('./assets/vue/pages/home/scanrepair/newRepair.vue')
  },
  {
      path: '/search/',
      component: require('./assets/vue/pages/home/search/index.vue')
  },



  {
    path: '/devicepolling/',
    component: require('./assets/vue/pages/home/devicepolling/index.vue')
  },
  {
    path: '/morefunction/',
    component: require('./assets/vue/pages/home/morefunction/index.vue')
  },


]
