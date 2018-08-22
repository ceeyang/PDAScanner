export default {
    // 登录
    login:`/api/Login/Login`,

    // 获取仓库集合
    WarehouseList: `/api/Login/WarehouseList`,

    // 获取科室集合
    departmentList: `/api/Repair/DepartmentList`,

    // 未报修设备集合
    notRepairList: `/api/Repair/DepartmentEquListNot`,

    // 已经报修设备集合
    hadRepairedList: `/api/Repair/DepartmentEquListHas`,

    // 4、设备名称集合
    equNameList: `/api/Repair/EquNameList`,

    // 报修申请
    applyRepair: `/api/Repair/ApplyRepair`,

    // 撤销申请
    revokeApply: `/api/Repair/Revoke`,

    // 获取资产信息
    getEquById: `/api/Repair/GetEquById`,

    // 维修, 派工, 接单信息查询
    dispatchList: `/api/Dispatch/DispatchList`,

    // 加载维修派工用户
    getRepaitUsers: `/api/Dispatch/GetRepaitUsers`,

    // 派单或者转单(通过维修状态)
    sendOrder: `/api/Dispatch/Assign`,

    // 忽略维修派工
    dispatchIgnore: `/api/Dispatch/Ignore`,

    // 确认维修派工
    confirmOrder: `/api/PickOrder/ConfirmOrder`,

    // 获取维修信息
    getRepairInfo: `/api/PickOrder/GetRepairInfo`,

    // 故障类型列表
    getQuestionTypeList: `/api/PickOrder/QuestionTypeList`,

    // 故障列表
    getQuestionList: `/api/PickOrder/QuestionList`,

    // 接单
    checkOrder: `/api/PickOrder/CheckOrder`,

    // 撤销接单
    cancelOrder: `/api/PickOrder/CancelOrder`,

    // 审核列表
    auditList: `/api/Audit/AuditList`,

    // 获取维修进程对象
    getRepairProcessModel: `/api/Audit/GetRepairProcessModel`,

    // 维修审核
    repairAudit: `/api/Audit/RepairAudit`,

    // 22、维修处理集合
    repairHandleList: `/api/RepairHandle/RepairHandleList`,

    // 23、维修过程列表
    repairProcessList: `/api/RepairHandle/RepairProcessList`,

    // 24、新增维修过程
    addRepairProcess: `/api/RepairHandle/AddRepairProcess`,

    // 25、维修人员列表
    repairUserList: `/api/RepairHandle/RepairUserList`,

    // 26、新增维修人员
    addRepairUser: `/api/RepairHandle/AddRepairUser`,

    // 27、维修配件列表
    repairPartsList: `/api/RepairHandle/RepairPartsList`,

    // 28、新增维修配件
    addRepairParts: `/api/RepairHandle/AddRepairParts`,

    // 29、提交验收
    submitApproval: `/api/RepairHandle/SubmitApproval`,

    // 30、科室验收列表
    approvalList: `/api/Approval/ApprovalList`,

    // 31、科室验收
    departmentApproval: `/api/Approval/DepartmentApproval`,

    // 获取盘点单列表
    getInventoryList: `/api/Inventory/GetInventoryList`,

    // 获取资产列表
    getInventoryItemList: `/api/Inventory/GetInventoryItemList`,

    // 上传盘点单
    updateInventoryItem: `/api/Inventory/UpdateInventoryItem`,

    // 消息解耦
    getNoticeList: `/api/BlendQuery/NoticeList`,

    // 计量资产的科室列表
    getMeteringEqu: `/api/Metering/MeteringEqu`,

    // 1.	报修基本信息(共用)
    getDefaultRepairInfo: `/api/Repair/GetRepairInfo`,

}
