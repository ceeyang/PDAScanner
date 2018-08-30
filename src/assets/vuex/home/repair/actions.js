import Vue from 'vue';
import { resolve } from 'path';

export const getRepaiingrHandleList = ({commit,dispatch,state}) => {
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
                resolve(true)
            } else {
                console.log(data.Msg);
                resolve(false)
            }
        });
    })
}


/**
 * 维修派工
 */
export const sendDeviceOrder = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        // 清空当前资产维修记录列表
        state.mCurrentRepairProcessList = []
        debugger
        let params = {
            "RepairOrder": state.mReadyRepairDetail.RepairNo.replace(/\s*/g, ""),
            "AssignUserId": state.mSearchRepairUser.UserCode.replace(/\s*/g, ""),
            "UserCode": localStorage.account,
            "LineNumber": 1,
            "Store": localStorage.storeId,
            "EquCode": state.mReadyRepairItme.EquCode.replace(/\s*/g, ""),
            "RepairStatus":1,
        };
        Vue.prototype.post(Vue.prototype.api.sendOrder, params, function(response) {
            var data = JSON.parse(response);
            debugger
            if (data.Status) {
                state.mCurrentRepairProcessList = data.RepairProcessList
                resolve(data)

            }
            resolve(data)

        });
    })
}

/**
 * 忽略订单
 */
export const ignoreDeviceOrder = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        // 清空当前资产维修记录列表
        state.mCurrentRepairProcessList = []
        let params = {
            "RepairOrder": state.mReadyRepairDetail.RepairNo.replace(/\s*/g, ""),
            "UserCode": localStorage.account,
        };
        debugger
        console.log(params);
        Vue.prototype.post(Vue.prototype.api.dispatchIgnore, params, function(response) {
            var data = JSON.parse(response);
            debugger
            if (data.Status) {

                resolve(true)
            }
            resolve(false)

        });
    })
}

/**
 * 维修接单
 */
export const repairCheckOrder = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        // 清空当前资产维修记录列表
        state.mCurrentRepairProcessList = []
        let params = {
            "RepairOrder": state.mTakeOrderItmeDetail.RepairNo.replace(/\s*/g, ""),
            "Store": localStorage.storeId,
            "UserCode": localStorage.account,
        };
        Vue.prototype.post(Vue.prototype.api.checkOrder, params, function(response) {
            var data = JSON.parse(response)
            console.log(data)
            if (data.Status) {
                resolve(true)

            } else {
                resolve(false)
            }
        });
    })
}

export const getRepairProcessList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        // 清空当前资产维修记录列表
        state.mCurrentRepairProcessList = []
        let params = {
            "RepairNo": state.mCurrentRepair.RepairNo,
        };
        Vue.prototype.get(Vue.prototype.api.repairProcessList, params, function(response) {
            var data = JSON.parse(response);
            if (data.Status) {
                state.mCurrentRepairProcessList = data.RepairProcessList
            }
        });
    })
}



/**
 * 获取待派工的报修基本信息
 */

 export const getReadyRepairDetail = ({ commit,dispatch,state}, RepairNo) => {
     return new Promise((resolve,reject) => {
         let params = {
             "RepairNo": RepairNo,
             "Store": localStorage.storeId,
         }

         Vue.prototype.get(Vue.prototype.api.getDefaultRepairInfo, params, function(response) {
             var data = JSON.parse(response);
             console.log(data);
             resolve(data)
         });
     })
 }


 /**
  * 忽略维修
  */

  export const dispatchIgnoreRepair = ({ commit,dispatch,state}) => {
      return new Promise((resolve,reject) => {
          let params = {
              "RepairOrder": state.mReadyRepairDetail.RepairNo.replace(/\s*/g, ""),
              "UserCode": localStorage.account,
          }

          Vue.prototype.post(Vue.prototype.api.dispatchIgnore, params, function(response) {
              var data = JSON.parse(response);
              resolve(data)
          });
      })
  }
