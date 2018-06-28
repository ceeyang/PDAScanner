import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mineStore from './mine/store';
import departmentStore from './home/scanrepair/store';


export default new Vuex.Store({
  modules: {
      mineStore,
      departmentStore,

  }
})
