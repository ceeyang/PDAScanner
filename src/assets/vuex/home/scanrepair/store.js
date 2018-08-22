import * as actions from './actions';

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

    // 报修人员
    mRepairUser: [],

    // 报修电话
    mRepairNumber: '',

    // 报修地址:
    mRepairLocation: '',

    // 问题
    mProblemData: [], // 当前选择问题

    // 故障描述
    mProblemDes: '',

    // 备注
    mRemark: '',

    // 详情页面的资产信息, 包括扫码申请, 新增申请, 已经设备报修申请
    mEquModel: [],

    // 详情页面类型 : 1. apply 申请页面; 2. check 查看页面
    mViewType: '',



}

export default {
    state,
    actions,
}
