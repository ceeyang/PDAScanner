<!-- let params = {
    'EquCode': equcode,
    'DepartmentId': DepartmentId,
    'UserCode': localStorage.account,
    'Store': localStorage.storeId,
    'StartDate': this.startDataValue,
    'EndDate': this.endDataValue,
    'RepairOrder': this.repairNumber,
    'RepairStatus': '',
    'SortType': '',
    'AssignOrConfirm': "1",
    'PageIndex': 1,
    'PageSize': 10,
}
let vm = this;

this.post(this.api.dispatchList, params, function(response) {
    var data = JSON.parse(response);
    if (data.Status) {
        console.log(data);
        vm.searchData = data.DispatchList;
    } else {
        let msg = data.Msg;
        console.log(msg);
    }
    if (scroll && scroll.forceUpdate) {
        scroll.forceUpdate()
    }
}); -->
