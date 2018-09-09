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
        let phoneNumber = state.mRepairNumber
        console.log(phoneNumber);
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
            "RepairPhone": state.mRepairNumber || "", //
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
            const toast = Vue.$createToast({
                time: 0,
                txt: msg,
                type: type,
                mask: true,
                time: 2000,
                onTimeout: () => {
                    toast.hide()
                }
            })
            toast.show()
        });
    })
}


/**
 * 获取资产详情
 */
export const getEquDetail = ({ commit,dispatch,state}, equId) => {
    return new Promise((resolve,reject) => {
        let params = {
            "EquNo": equId,
            "UserCode": localStorage.account,
            "Store": localStorage.storeId,
        }

        Vue.prototype.get(Vue.prototype.api.getEquById, params, function(response) {
            var data = JSON.parse(response);
            state.mEquModel = data.EquModel
            resolve(data)
        });
    })
}


/**
 * 报修基本信息
 */

 export const getRepairDetail = ({ commit,dispatch,state}, equId) => {
     return new Promise((resolve,reject) => {
         let params = {
             "RepairNo": state.mEquModel.EquCode,
             "Store": localStorage.storeId,
         }

         Vue.prototype.get(Vue.prototype.api.getDefaultRepairInfo, params, function(response) {
             var data = JSON.parse(response);
             resolve(data)
         });
     })
 }
