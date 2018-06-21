import * as actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    onGoingDatas:[],            //进行中列表
    finishedDatas:[],           //已结束列表

    // 选中列表
    selected:1,                 //列表选中(进行中1,已结束2)
    myStudySelectedIndex:0,     // 我的学习:0-待审核; 1-未完成; 2-已完成


    onGoingPage:1,
    finishedPage:1,             //页码
    surveyInfo:{},              //调研信息
    loadMoreNot:false,
    surveyPassedPage:1,
    onDoingPage:1,
    onDoingsurveyList:[],
    passedsurveyList:[],
}

export default {
    state,
    mutations,
    getters,
    actions
}
