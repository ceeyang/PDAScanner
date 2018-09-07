import * as actions from './actions';
const state = {

    segmentBarIndex: 0,

    /////////////////////////////////////
    ////           待派工          ///////
    /////////////////////////////////////
    readyrepairData: [],
    readyrepairPage: 1,
    // 当前处理的代派工数据
    mReadyRepairItme: [],
    // 当前处理的 item,的订单详细信息
    mReadyRepairDetail: [],

    // 当前派修的人员
    mSearchRepairUser: [],


    /////////////////////////////////////
    ////           待接单          ///////
    /////////////////////////////////////
    takeordersData: [],
    takeordersPage: 1,
    // 当前处理的待接单数据
    mTakeOrderItme: [],
    // 当前处理的待接单数据详情
    mTakeOrderItmeDetail: [],



    /////////////////////////////////////
    ////           处理中          ///////
    /////////////////////////////////////
    handleingData: [],
    handleingPageNumber: 1,

    // 当前处理的维修设备
    mCurrentRepair: [],
    // code by yangxichuan
    // 如果有详情, 新增一个详情接口, 返回详情内容
    mCurrentRepairDetail: [],

    // 当前设备的维修人记录
    mCurrentRepairUsers: [],

    // 当前处理中设备的维修记录
    mCurrentRepairProcessList: [],

    // 当前选择的维修类型
    mCurrentRepairType: [],

    // 当前维修订单的 配件数据列表
    mCurrentRepairingParts: [],

    // 配件费用
    mRepairingPartsExpense: 0,

    // 维修费用
    mRepairingExpense: 0,

    // 维修类型
    mRepairType: '自修',

}

export default {
    state,
    actions,
}
