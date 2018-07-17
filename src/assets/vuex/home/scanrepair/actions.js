import Vue from 'vue';

/**
 * 获取调研详情
 */
export const getEquDataList = ({ commit,dispatch,state}, searchvalue) => {
    return new Promise((resolve,reject) => {
        let params = {
            'Store': localStorage.storeId,
            'QueryText': searchvalue,
        };

        Vue.prototype.post(Vue.prototype.api.equNameList, params, function(response) {
            var data = JSON.parse(response);

            if (data.Status) {
                var nameArr = []
                for (var i = 0; i < data.EquNameList.length; i++) {
                    nameArr.push(data.EquNameList[i].EquName)
                }
                state.EquNameList = nameArr
                state.EquDataList = data.EquNameList;

            } else {
                let msg = data.Msg;
                console.log(msg);
            }
        });
    })
}
