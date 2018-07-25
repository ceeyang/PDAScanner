import Vue from 'vue';

/**
 * 获取调研详情
 */
export const getEquDataList = ({ commit,dispatch,state}, searchvalue) => {
    return new Promise((resolve,reject) => {
        let params = {
            'Store': localStorage.storeId,
            'QueryText': searchvalue,
            'PageIndex': 1,
            'PageSize': 50
        };

        Vue.prototype.post(Vue.prototype.api.equNameList, params, function(response) {
            var data = JSON.parse(response);

            if (data.Status) {

                if (state.equSearchValue != searchvalue) {
                    return
                }

                var nameArr = []
                for (var i = 0; i < data.EquNameList.length; i++) {
                    nameArr.push(data.EquNameList[i].EquName)
                }
                state.EquNameList = nameArr
                state.EquDataList = data.EquNameList;

            } else {
                let msg = data.Msg;
                console.log(msg);
            }
        });
    })
}


/**
 * 申请报修
 */
export const applyRepair = ({ commit,dispatch,state}, searchvalue) => {
    return new Promise((resolve,reject) => {

        var storeNumber = localStorage.storeId
        let params = {
            "EquId": state.EquData.EquCode,
            "EquName": state.EquData.EquName,
            "StoreNumber": '2',
            "Store": localStorage.storeId,
            "RepairUserId": localStorage.account,
            "RepairUserName": localStorage.UserName,
            "DepartmentId": state.departmentData.DepartmentId || "",
            "DepartmentName": state.departmentData.DepartmentName || "",
            "RepairStatus": '1',
            "ApplyDate": '', //
            "SupplierId": '',
            "SupplierName": '',
            "RepairTerm": '',
            "RepairPhone": '', //
            "FaultId": state.problemData.FaultId || "", //
            "FaultDesription": state.problemData.FaultDesription || "", //
            "Remark": '', //
            "RepairNo": '',
            "RepairNoReadonly": 'true',
        }

        Vue.prototype.post(Vue.prototype.api.applyRepair, params, function(response) {
            var data = JSON.parse(response);

            let msg = data.Msg;
            if (data.Status) {

            } else {

            }

            var type = data.Status ? "success" : "error"
            const toast = vm.$createToast({
                time: 0,
                txt: msg,
                type: type,
                time: 2000,
                onTimeout: () => {
                    toast.hide()
                }
            })
            toast.show()
        });
    })
}
