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



    /////////////////////////////////////
    ////           处理中          ///////
    /////////////////////////////////////
    handleingData: [],
    handleingPageNumber: 1,

    // 当前处理的维修设备
    mCurrentRepair: [],

    // 当前处理中设备的维修记录
    mCurrentRepairProcessList: [],


}

export default {
    state,
    actions,
}
