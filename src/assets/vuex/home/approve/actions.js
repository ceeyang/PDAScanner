import Vue from 'vue';
import { resolve } from 'path';

export const getApproveList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        let params = {
            "UserCode": localStorage.account,
            "RepairNo": "",
            "PageIndex": 1,
            "PageSize": 10,
        };

        Vue.prototype.post(Vue.prototype.api.auditList, params, function(response) {
            var data = JSON.parse(response);
            if (data.Status) {
                state.mAuditList = data.AuditList
                resolve(data)
            } else {
                console.log(data.Msg);
                resolve(data)
            }
        });
    })
}



/**
 * 审核 配件列表
 */
export const getApprovePartList = ({
  commit,
  dispatch,
  state
}) => {
  return new Promise((resolve, reject) => {
    let params = {
      "RepairNo": state.mCurrentApprove.RepairNo.replace(/\s*/g, ""),
      "LineNumber": 1,
    }

    Vue.prototype.get(Vue.prototype.api.repairPartsList, params, function(response) {
      var data = JSON.parse(response);
      console.log(data);
      if (data.Status) {
        state.mCurrentPartsList = data.RepairPartsList

        // 更新配件价格
        dispatch('updateApprovePartsPrices')
      }
      resolve(data)
    });
  })
}



/**
 * 审核, 审核人列表
 */
export const getApproveAuditorList = ({
  commit,
  dispatch,
  state
}) => {
  return new Promise((resolve, reject) => {
    let params = {
      "RepairNo": state.mCurrentApprove.RepairNo.replace(/\s*/g, ""),
      "UserCode": localStorage.account,
    }

    Vue.prototype.get(Vue.prototype.api.getApproveAuditorList, params, function(response) {
      var data = JSON.parse(response);
      console.log(data);
      if (data.Status) {
          state.mAuiitorList = data.AuiitorList
      }
      resolve(data)
    });
  })
}


/**
 * 刷新配件总价格
 */
export const updateApprovePartsPrices = ({
  commit,
  dispatch,
  state
}) => {
  return new Promise((resolve, reject) => {

    var totalPrice = 0
    for (var i = 0; i < state.mCurrentPartsList.length; i++) {
      let part = state.mCurrentPartsList[i];
      totalPrice += Number(part.Money)
    }

    state.mApprovePartsTotalPrice = totalPrice

    state.mApproveTotalPrice = Number(totalPrice) + Number(state.mCurrentApprove.RepairFee)
  })
}



/**
 * 审核
 */
export const requestRepairAudit = ({
  commit,
  dispatch,
  state
}, auditStatus) => {
  return new Promise((resolve, reject) => {
    let params = {
      "UserCode": localStorage.account,
      "AuditAdvice": state.mAuditAdvice,   //：审批意见
      "IsAdopt": auditStatus,       //：是否通过(1.通过 2.否决)
      "CheckLineNumber": 1,//：检查行号
      "CheckNo":state.mCurrentApprove.RepairNo,        //：检查编号
      "ApplyOrder": "",    //：申请单号
    }

    Vue.prototype.post(Vue.prototype.api.requestRepairAudit, params, function(response) {
      var data = JSON.parse(response);
      console.log(data);
      if (data.Status) {

      }
      resolve(data)
    });
  })
}
