import Vue from 'vue';

/**
 * 获取进行中调研目录
 */
export const getOnGoingSurveyList = ({ commit,dispatch,state},a) => {
    return new Promise((resolve,reject) => {
        if (typeof(a) === "undefined") {
            state.onGoingPage++
        } else if ( 1===a ) {
            state.onGoingPage = 1
            state.onGoingDatas = []
        }
        Vue.prototype.post(Vue.prototype.api.surveyList, {'pageNumber':state.onGoingPage,'listType':'0'},'page').then((res) => {
            if (res.ok) {
                let list=res.body.data.list
                for (let i in list) {
                    state.onGoingDatas.push(list[i])
                }
                resolve(list);
            }
        }, (res) => {
        })
    })
}

/**
 * 获取已结束调研目录
 */
export const getFinishedSurveyList = ({ commit,dispatch,state},a) => {
    return new Promise((resolve,reject) => {
        if (typeof(a) === "undefined") {
            state.finishedPage++
        } else if ( 1===a ) {
            state.finishedPage = 1
            state.finishedDatas = []
        }
        Vue.prototype.post(Vue.prototype.api.surveyList, {'pageNumber':state.finishedPage,'listType':'1'},'page').then((res) => {
            if (res.ok) {
                let list=res.body.data.list
                for (let i in list) {
                    state.finishedDatas.push(list[i])
                }
                resolve(list);
            }
        }, (res) => {
        })
    })
}


/**
 * 获取 我的 进行中 调研目录
 */
export const myOnDoingsurveyList = ({ commit,dispatch,state},a) => {
    return new Promise((resolve,reject) => {
        if (typeof(a) === "undefined") {
            state.onDoingPage++
        } else if ( 1===a ) {
            state.onDoingPage = 1
            state.onDoingsurveyList = []
        }
        Vue.prototype.post(Vue.prototype.api.mySurveyList, {'pageNumber':state.onDoingPage,'type':'0'},'page').then((res) => {
            if (res.ok) {
                let list=res.body.data.list
                for (let i in list) {
                    state.onDoingsurveyList.push(list[i])
                }
                resolve(list);
            }
        }, (res) => {
        })
    })
}

/**
 * 获取 我的 已结束 调研目录
 */
export const myPassedsurveyList = ({ commit,dispatch,state},a) => {
    return new Promise((resolve,reject) => {
        if (typeof(a) === "undefined") {
            state.surveyPassedPage++
        } else if ( 1===a ) {
            state.surveyPassedPage = 1
            state.passedsurveyList = []
        }
        Vue.prototype.post(Vue.prototype.api.mySurveyList, {'pageNumber':state.surveyPassedPage,'type':'1'},'page').then((res) => {
            if (res.ok) {
                let list=res.body.data.list
                for (let i in list) {
                    state.passedsurveyList.push(list[i])
                }
                resolve(list);
            }
        }, (res) => {
        })
    })
}

/**
 * 获取调研详情
 */
export const getSurveyInfo = ({ commit,dispatch,state},{id, _this }) => {
    return new Promise((resolve,reject) => {
        //获取课程简介
        Vue.prototype.post(Vue.prototype.api.surveyDetails, {'survey_id':id}, 'sid').then((res) => {
            if (res.ok) {
                state.surveyInfo=res.body.data
                localStorage.surveyInfo=JSON.stringify(state.surveyInfo)
                _this.$router.push({ name: 'surveyDetail'})
            }
        }, (res) => {
        })

    })
}
