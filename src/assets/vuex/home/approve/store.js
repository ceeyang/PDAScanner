import * as actions from './actions';

const state = {

    /// 审批列表
    mAuditList: [],

    /// 当前处理审核数据
    mCurrentApprove: [],

    /// 当前处理配件列表
    mCurrentPartsList: [],

    /// 当前配件总价格
    mApprovePartsTotalPrice: 0,

    /// 当前维修总价格
    mApproveTotalPrice: 0,

    /// 当前审批意见
    mAuditAdvice: '',

    /// 当前审核流程人员
    mAuiitorList: [],
}

export default {
    state,
    actions
}
