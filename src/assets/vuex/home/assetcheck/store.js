import * as actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {

    allData: [],
    data: [],
    allDataPage: 1,

    allNotCheckData: [],
    notCheckData: [],
    notCheckDataPage: 1,

    // 所有当前已经处理的数据
    allCheckedData: [],
    checkedData: [],
    checkedDataPage: 1,

}

export default {
    state,
    state,
    mutations,
    getters,
    actions
}
