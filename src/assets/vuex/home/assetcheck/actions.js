import Vue from 'vue';
import { resolve } from 'path';

export const refreshFinishedData = ({commit,dispatch,state}, itemData) => {
    return new Promise((resolve,reject) => {
        var cacheKeyFinished = 'KeyCacheFinished+' + itemData.InventoryNo
        var finishedData = localStorage.getItem(cacheKeyFinished)
        if (finishedData) {
            state.allCheckedData = JSON.parse(localStorage.getItem(cacheKeyFinished))
        }
        console.log('refreshFinishedData');
        console.log(state.finishedData);
    })
}


export const refreshUnFinishedData = ({commit,dispatch,state}, itemData) => {
    return new Promise((resolve,reject) => {
        var cacheKeyUnfinished = 'KeyCacheUnfinished+' + itemData.InventoryNo
        var unfinishedData = localStorage.getItem(cacheKeyUnfinished)
        if (!unfinishedData) {
            state.allNotCheckData = state.allData
        } else {
            state.allNotCheckData = JSON.parse(localStorage.getItem(cacheKeyUnfinished))
        }
        console.log('refreshUnFinishedData');
        console.log(state.unfinishedData);
    })
}


export const refreshAllData = ({commit,dispatch,state}, itemData) => {
    return new Promise((resolve,reject) => {
        var cacheKey = 'KeyCache+' + itemData.InventoryNo
        let allData = JSON.parse(localStorage.getItem(cacheKey))
        state.allData = allData
        console.log('refreshAllData');
        console.log(state.allData);
    })
}


// 模拟求请求, 加载服务器数据
export const getNewAssetData = ({commit,dispatch,state}, type) => {
    return new Promise((resolve,reject) => {

        // 用来储存当前应该新增的
        var arr = []
        // 自定义每次加载多少数据
        var pageSize = 20
        // 第一次加载的个数
        var firstIndex = 0

        if (type == 0) {

            if (state.data) {
                firstIndex = state.data.length
            }

            if (state.allDataPage == 1) {
                firstIndex = 0
            }

            // 遍历总数组, 获取应该加载的数组
            outer:
                for (var i = firstIndex; i < state.allData.length; i++) {

                    // 添加各个 item 到需要新增的数组
                    arr.push(state.allData[i])

                    // 当前遍历次数达到 pagesize 值
                    if (i - firstIndex == pageSize - 1) {
                        break outer
                    }
                }

            // 将应该新增的内容添加到原有数组
            state.data = firstIndex == 0 ? arr : state.data.concat(arr)
        }


        // 未完成
        else if (type == 1) {
            if (state.notCheckData) {
                firstIndex = state.notCheckData.length
            }

            if (state.notCheckDataPage == 1) {
                firstIndex = 0
            }

            // 遍历总数组, 获取应该加载的数组
            for (var i = firstIndex; i < state.allNotCheckData.length; i++) {

                // 添加各个 item 到需要新增的数组
                arr.push(state.allNotCheckData[i])

                // 当前遍历次数达到 pagesize 值
                if (i - firstIndex == pageSize - 1) {
                    break
                }
            }

            // 将应该新增的内容添加到原有数组
            state.notCheckData = firstIndex == 0 ? arr : state.notCheckData.concat(arr)

        } else {

            let itemData = JSON.parse(localStorage.ItemData);
            var cacheKeyFinished = 'KeyCacheFinished+' + itemData.InventoryNo
            var finishedData = localStorage.getItem(cacheKeyFinished)
            if (finishedData) {
                state.allCheckedData = JSON.parse(localStorage.getItem(cacheKeyFinished))
            }

            if (state.checkedData) {
                firstIndex = state.checkedData.length
            }

            if (state.checkedDataPage == 1) {
                firstIndex = 0
            }

            // 遍历总数组, 获取应该加载的数组
            for (var i = firstIndex; i < state.allCheckedData.length; i++) {

                // 添加各个 item 到需要新增的数组
                arr.push(state.allCheckedData[i])

                // 当前遍历次数达到 pagesize 值
                if (i - firstIndex == pageSize - 1) {
                    break
                }
            }

            // 将应该新增的内容添加到原有数组
            state.checkedData = firstIndex == 0 ? arr : state.checkedData.concat(arr)

        }
    })
}
