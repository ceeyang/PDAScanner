import Vue from 'vue';
import { resolve } from 'path';

export const xxxxx = ({commit,dispatch,state}, itemData) => {
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
