import * as actions from './actions';
const state = {

    mTitle: "当前搜索标题",

    // department: 科室,  user: 报修人员, problem: 故障问题
    mType: "当前搜索的类型",

    /**
     * 当前结果选中后回调类型
     *
     *   type:
     *   Repairing_AddUser:  维修中, 新增维修人员
     */
    mCallbackType: "当前结果选中后回调类型",

    mValue: "当前搜索的 item",

    mSearchvalue: "", // 当前搜索的 key

    mSearchData: [],// 当前搜索数据

    //当前搜索的 item 应该显示的值
    mSearchdDataTitles: [],
}

export default {
    state,
    actions,
}
