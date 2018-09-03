import Vue from 'vue';
import { resolve } from 'path';

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

        else if (state.mType == "Part") {
            dispatch('getRepairingPartsList').then((res)=>{
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

/**
 * 获取维修配件列表
 */
 export const getRepairingPartsList = ({commit,dispatch,state}) => {
     return new Promise((resolve,reject) => {
         state.mSearchData = []

         // code by yangxichuan
         // 此处需要设置该值的来源
         let params = {
             "QueryString": state.mSearchvalue,
             "Limit": 20,
             "StoreId": localStorage.storeId,
         };
         Vue.prototype.get(Vue.prototype.api.allPartsList, params, function(response) {
             var data = JSON.parse(response);
             state.mSearchData = data.PartsList
             state.mSearchdDataTitles = data.PartsList
             resolve(data)
         });
     })
 }
