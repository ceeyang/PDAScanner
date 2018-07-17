import * as actions from './actions';

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
    actions
}
