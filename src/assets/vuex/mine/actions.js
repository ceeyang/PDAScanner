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
