import * as actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    readyrepairData:[],            // 未报修
    repairCompletedData:[],        // 已报修

    // 选中列表
    currentIndex:0,                 //列表选中(未报修,未报修)


    readyrepairPage:1,
    repairCompletedPage:1,             //页码

    departmentData: [], // 科室数据


    // 新增资产
    // 资产
    equSearchValue: '',
    EquData: [], // 当前选中的资产
    EquDataList: [], // 当前资产列表
    EquNameList: [], // 当前资产名称列表
    EquCodeValue: "",

    // 科室
    departmentData: [], // 当前选择科室
    departmentDataList: [], // 当前搜索科室列表
    departmentNameList: [], // 当前搜索科室名称列表

    // 问题
    problemData: [], // 当前选择问题
    problemDataList: [], // 当前搜索问题列表
    problemNameList: [], // 当前搜索问题名称列表

}

export default {
    state,
    actions,
}
