import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mineStore from './mine/store';
import scanRepairStore from './home/scanrepair/store';
import assetCheckStore from './home/assetcheck/store';
import RepairStore from './home/repair/store';
import MeasureStore from './home/measure/store';
import StoreSearch from './home/search/store';



export default new Vuex.Store({
  modules: {
      mineStore,
      scanRepairStore,
      assetCheckStore,
      RepairStore,
      MeasureStore,
      StoreSearch,
  }
})
