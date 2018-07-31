import Vue from 'vue';

/**
 * 获取资产详情
 */
export const xxxxxx = ({ commit,dispatch,state}, equId) => {
    return new Promise((resolve,reject) => {
        let params = {
            "EquNo": equId,
            "UserCode": localStorage.account,
            "Store": localStorage.storeId,
        }

        Vue.prototype.get(Vue.prototype.api.getEquById, params, function(response) {
            var data = JSON.parse(response);
            state.mEquModel = data.EquModel
            resolve(data)
        });
    })
}
