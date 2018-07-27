import Vue from 'vue';
import { resolve } from 'path';

export const getRepairHandleList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        let params = {
            "UserCode": localStorage.account,
            "Store": localStorage.storeId,
            "RepairNo": "",
            "EquNo": "",
            "DepartmentId": "",
            "DefaultProcess": "1",
            "RepairState": "",
            "PickSingle": "",
            "SortField": "",
            "SortWay": "",
            "StartDate": "",
            "EndDate": "",
            "PageIndex": state.handleingPageNumber,
            "PageSize": 10,
        };

        Vue.prototype.post(Vue.prototype.api.repairHandleList, params, function(response) {
            var data = JSON.parse(response);
            if (data.Status) {
                state.handleingData = data.RepairHandleList
                console.log(state.handleingData);
            } else {
                let msg = data.Msg;
                console.log(msg);
            }
        });
    })
}

export const getRepairProcessList = ({commit,dispatch,state}, itemData) => {
    return new Promise((resolve,reject) => {
        let params = {
            "RepairNo": itemData.RepairNo,
        };

        Vue.prototype.get(Vue.prototype.api.repairProcessList, params, function(response) {
            var data = JSON.parse(response);
            if (data.Status) {
                state.mCurrentRepairProcessList = data.RepairProcessList
            } else {
                let msg = data.Msg;
                console.log(msg);
            }
        });
    })
}
