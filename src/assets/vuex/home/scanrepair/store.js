import * as actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    readyrepairData:[],            // 未报修
    repairCompletedData:[],        // 已报修

    // 选中列表
    currentIndex:0,                 //列表选中(未报修,未报修)


    readyrepairPage:1,
    repairCompletedPage:1,             //页码

}

export default {
    state,
    mutations,
    getters,
    actions
}
