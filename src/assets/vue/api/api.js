
// 正式环境打包使用
// const rootURL = `http://120.78.92.212:8006`
// 浏览器运行使用
const rootURL = ``

export default {
    // 登录
    login:`${rootURL}/api/Login/Login`,

    // 获取仓库集合
    WarehouseList: `${rootURL}/api/Login/WarehouseList`,

    // 获取科室集合
    departmentList: `${rootURL}/api/Repair/DepartmentList`,

    // 未报修设备集合
    notRepairList: `${rootURL}/api/Repair/DepartmentEquListNot`,

    // 已经报修设备集合
    hadRepairedList: `${rootURL}/api/Repair/DepartmentEquListHas`,

    // 4、设备名称集合
    equNameList: `${rootURL}/api/Repair/EquNameList`,

    // 获取所以科室集合
    departmentList: `${rootURL}/api/Repair/DepartmentList`,

    // 报修申请
    applyRepair: `${rootURL}/api/Repair/ApplyRepair`,

    // 撤销申请
    revokeApply: `${rootURL}/api/Repair/Revoke`,

    // 获取资产信息
    getEquById: `${rootURL}/api/Repair/GetEquById`,

    // 维修, 派工, 接单信息查询
    dispatchList: `${rootURL}/api/Dispatch/DispatchList`,

    // 加载维修派工用户
    getRepaitUsers: `${rootURL}/api/Dispatch/GetRepaitUsers`,

    // 派单或者转单(通过维修状态)
    sendOrder: `${rootURL}/api/Dispatch/Assign`,

    // 忽略维修派工
    dispatchIgnore: `${rootURL}/api/Dispatch/Ignore`,

    // 确认维修派工
    confirmOrder: `${rootURL}/api/PickOrder/ConfirmOrder`,

    // 获取维修信息
    getRepairInfo: `${rootURL}/api/PickOrder/GetRepairInfo`,

    // 故障类型列表
    getQuestionTypeList: `${rootURL}/api/PickOrder/QuestionTypeList`,

    // 故障列表
    getQuestionList: `${rootURL}/api/PickOrder/QuestionList`,

    // 接单
    checkOrder: `${rootURL}/api/PickOrder/CheckOrder`,

    // 撤销接单
    cancelOrder: `${rootURL}/api/PickOrder/CancelOrder`,

    // 审核列表
    auditList: `${rootURL}/api/Audit/AuditList`,

    // 获取维修进程对象
    getRepairProcessModel: `${rootURL}/api/Audit/GetRepairProcessModel`,

    // 维修审核
    repairAudit: `${rootURL}/api/Audit/RepairAudit`,

    // 22、维修处理集合
    repairHandleList: `${rootURL}/api/RepairHandle/RepairHandleList`,

    // 23、维修过程列表
    repairProcessList: `${rootURL}/api/RepairHandle/RepairProcessList`,

    // 24、新增维修过程
    addRepairProcess: `${rootURL}/api/RepairHandle/AddRepairProcess`,

    // 25、维修人员列表
    repairUserList: `${rootURL}/api/RepairHandle/RepairUserList`,

    // 26、新增维修人员
    addRepairUser: `${rootURL}/api/RepairHandle/AddRepairUser`,

    // 27、维修配件列表
    repairPartsList: `${rootURL}/api/RepairHandle/RepairPartsList`,

    // 28、新增维修配件
    addRepairParts: `${rootURL}/api/RepairHandle/AddRepairParts`,

    // 29、提交验收
    submitApproval: `${rootURL}/api/RepairHandle/SubmitApproval`,

    // 30、科室验收列表
    approvalList: `${rootURL}/api/Approval/ApprovalList`,

    // 31、科室验收
    departmentApproval: `${rootURL}/api/Approval/DepartmentApproval`,

    // 获取盘点单列表
    getInventoryList: `${rootURL}/api/Inventory/GetInventoryList`,

    // 获取资产列表
    getInventoryItemList: `${rootURL}/api/Inventory/GetInventoryItemList`,

}
