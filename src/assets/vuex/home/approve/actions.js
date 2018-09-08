import Vue from 'vue';
import { resolve } from 'path';

export const getApproveList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        let params = {
            "UserCode": localStorage.account,
            "Store": localStorage.storeId,
            "RepairNo": "",

            // RepairNo：维修单号
            // PageIndex：页码
            // PageSize：每页行数
        };

        Vue.prototype.post(Vue.prototype.api.auditList, params, function(response) {
            var data = JSON.parse(response);
            if (data.Status) {
                state.handleingData = state.handleingPageNumber == 1 ? data.RepairHandleList : state.handleingData.concat(data.RepairHandleList)
                resolve(true)
            } else {
                console.log(data.Msg);
                resolve(false)
            }
        });
    })
}
