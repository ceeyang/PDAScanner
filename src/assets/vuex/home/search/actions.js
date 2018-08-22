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
 * 整体搜索接口
 */
export const searchValue = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        state.mSearchData = []

        console.log(state.mSearchvalue);

        // 搜索科室
        if (state.mType == "department") {
            dispatch('getDepartmentList').then((res)=>{
                resolve(res)
            })
        }

        // 搜索报修人员
        else if (state.mType == "user") {
            dispatch('getRpairUserList').then((res)=>{
                resolve(res)
            })
        }

        else if (state.mType == "problem") {
            dispatch('getQuestionTypeList').then((res)=>{
                resolve(res)
            })
        }
    })
}



/**
 * 搜索故障问题接口
 */
export const getQuestionTypeList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        state.mSearchData = []
        let params = {
                'QueryText': state.mSearchvalue,
            };
        Vue.prototype.get(Vue.prototype.api.getQuestionTypeList, params, function(response) {
            var data = JSON.parse(response);
            state.mSearchData = data.QuestionTypeList
            state.mSearchdDataTitles = []
            let tempArr = []
            for (var i = 0; i < data.QuestionTypeList.length; i++) {
                tempArr.push(data.QuestionTypeList[i].QuestionTypeName)
            }
            state.mSearchdDataTitles = tempArr

            resolve(data)
        });
    })
}


/**
 * 搜索科室接口
 */
export const getDepartmentList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        state.mSearchData = []
        let params = {
                'UserCode': localStorage.account,
                'QueryText': state.mSearchvalue,
            };
        Vue.prototype.post(Vue.prototype.api.departmentList, params, function(response) {
            var data = JSON.parse(response);

            state.mSearchData = data.DepartmentList
            state.mSearchdDataTitles = []
            let tempArr = []
            for (var i = 0; i < data.DepartmentList.length; i++) {
                tempArr.push(data.DepartmentList[i].DepaName)
            }
            state.mSearchdDataTitles = tempArr

            resolve(data)
        });
    })
}

/**
 * 搜索报修用户接口
 */
export const getRpairUserList = ({commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        state.mSearchData = []
        let params = {
            'QueryText': state.mSearchvalue,
            'UserCode': localStorage.account,
            'PageIndex': 1,
            'PageSize': 100,
        };
        Vue.prototype.get(Vue.prototype.api.getRepaitUsers, params, function(response) {
            var data = JSON.parse(response);
            state.mSearchData = data.AssignUserList
            state.mSearchdDataTitles = []
            let tempArr = []
            for (var i = 0; i < data.AssignUserList.length; i++) {
                tempArr.push(data.AssignUserList[i].UserName)
            }
            state.mSearchdDataTitles = tempArr
            resolve(data)
        });
    })
}
