import * as actions from './actions';
const state = {

    // 处理中
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
