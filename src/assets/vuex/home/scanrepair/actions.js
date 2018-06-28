import Vue from 'vue';

/**
 * 获取调研详情
 */
export const getReadyDeviceList = ({ commit,dispatch,state}) => {
    return new Promise((resolve,reject) => {
        let params = {
            'DepartmentId': '',
            'EquName': '',
            'EquType': '',
            'StartDate': '',
            'EndDate': '',
            'UserCode': localStorage.account,
            'Store': localStorage.storeId,
            'PageIndex': 1,
            'PageSize': this.config.PageSize,
        };
        console.log('xxxxxxxxxxxxxxxxxxx ');
        this.post(this.api.notRepairList, params, function(response) {
            var data = JSON.parse(response);
            console.log(data);
            resolve(data);
        });

    })
}
