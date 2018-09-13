export default [{
    path: '/',
    component: require('./assets/vue/pages/mine/login.vue'),
    // component: require('./assets/vue/pages/main/Tabs.vue'),
    domCache: true,
  },
  {
    path: '/tabs/',
    component: require('./assets/vue/pages/main/Tabs.vue'),
    domCache: true,
  },
  {
    path: '/chats/',
    component: require('./assets/vue/pages/chats/chats.vue'),
    domCache: true,
  },
  {
    path: '/mine/',
    component: require('./assets/vue/pages/mine/mine.vue'),
    domCache: true,
  },
  {
    path: '/settings/',
    component: require('./assets/vue/pages/mine/settings.vue'),
    domCache: true,
  },{
    path: '/about/',
    component: require('./assets/vue/pages/mine/about.vue'),
    domCache: true,
  },
  {
    path: '/login/',
    component: require('./assets/vue/pages/mine/login.vue'),
    domCache: true,
  },



  {
    path: '/home/',
    component: require('./assets/vue/pages/home/home.vue'),
    domCache: true,
    // component: require('./assets/vue/pages/home/index.vue')
  },
  {
    path: '/assetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/assetcheck.vue'),
    domCache: true,
  },
  {
    path: '/newAssetCheck/',
    component: require('./assets/vue/pages/home/assetcheck/newAssetCheck.vue'),
    domCache: true,
  },
   {
    path: '/detailAssetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/detailAssetcheck.vue'),
    domCache: true,
  },
   {
    path: '/beginAassetcheck/',
    component: require('./assets/vue/pages/home/assetcheck/beginAassetcheck.vue'),
    domCache: true,
  },
  {
    path: '/detailAsset/',
    component: require('./assets/vue/pages/home/assetcheck/detailAsset.vue'),
    domCache: true,
  },


   {
    path: '/propertyDetail/',
    component: require('./assets/vue/pages/home/assetcheck/propertyDetail.vue'),
    domCache: true,
  },
  {
    path: '/devicemeasure/',
    component: require('./assets/vue/pages/home/devicemeasure/index.vue'),
    domCache: true,
  },
  {
    path: '/measuredetail/',
    component: require('./assets/vue/pages/home/devicemeasure/detail.vue'),
    domCache: true,
  },



  // Repair
  {
    path: '/repair/',
    component: require('./assets/vue/pages/home/repair/index.vue'),
    domCache: true,
  },
  {
    path: '/readyrepair/',
    component: require('./assets/vue/pages/home/repair/readyrepair.vue'),
    domCache: true,
  },
  {
    path: '/takeorders/',
    component: require('./assets/vue/pages/home/repair/takeorders.vue'),
    domCache: true,
  },
  {
    path: '/repairing/',
    component: require('./assets/vue/pages/home/repair/repairing.vue'),
    domCache: true,
  },
  {
    path: '/NewRepairRecord/',
    component: require('./assets/vue/pages/home/repair/NewRepairRecord.vue'),
    domCache: true,
  },




  //  scanrepair
  {
    path: '/scanrepair/',
    component: require('./assets/vue/pages/home/scanrepair/index.vue'),
    domCache: true,
  },
  {
    path: '/applyrepair/',
    component: require('./assets/vue/pages/home/scanrepair/applyrepair.vue'),
    domCache: true,
  },
  {
    path: '/newRepair/',
    component: require('./assets/vue/pages/home/scanrepair/newRepair.vue'),
    domCache: true,
  },
  {
    path: '/ScanRepairDetail/',
    component: require('./assets/vue/pages/home/scanrepair/ScanRepairDetail.vue'),
    domCache: true,
  },



  {
      path: '/search/',
      component: require('./assets/vue/pages/home/search/index.vue'),
      domCache: true,
  },
  {
      path: '/SearchItemView/',
      component: require('./assets/vue/pages/home/search/SearchItemView.vue'),
      domCache: true,
  },




  {
    path: '/devicepolling/',
    component: require('./assets/vue/pages/home/devicepolling/index.vue'),
    domCache: true,
  },
  {
    path: '/morefunction/',
    component: require('./assets/vue/pages/home/morefunction/index.vue'),
  },


  {
    path: '/approve/',
    component: require('./assets/vue/pages/home/approve/index.vue'),
    domCache: true,
  },
  {
    path: '/approveDetail/',
    component: require('./assets/vue/pages/home/approve/approveDetail.vue'),
    domCache: true,
  },

]
