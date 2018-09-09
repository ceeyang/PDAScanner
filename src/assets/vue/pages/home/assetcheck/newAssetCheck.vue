<template lang="html">
  <f7-page class="new-asset-check-page">

      <f7-navbar backLink title="新增设备"></f7-navbar>


      <div class="search-input">
          <input ref="input" type="search" placeholder="请输入盘点单号" :value="searchvalue" @keyup='search($event)'>
      </div>

      <scroll class="scan-repair-scroll" :items="data" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
          <li v-for="(item,index) in data" :key="index" :item="item">
              <asset-check-item :item="item" :itemClick="itemClick" type='0'></asset-check-item>
          </li>
      </scroll>

  </f7-page>
</template>

<script>
import scroll from '../../../common/scroll'
import AssetCheckItem from './assetCheckItem'
export default {

    data() {
        return {
            searchvalue: '',
            searchPage: 1,
            data: [],
            selectedItem: [],

            popupVisible: true,

        }
    },

    mounted() {
        this.$refs['input'].focus
    },

    methods: {
        search: function(e) {
            this.searchvalue = e.currentTarget.value;
            this.getSearchData();
        },

        NavBack() {
            this.$f7router.back()
        },

        itemClick(item) {

            // 判断本地是否已经存在
            var isNotExist = true
            var localAssetArr = []
            if (localStorage.localAssetArr) {
                localAssetArr = JSON.parse(localStorage.localAssetArr);
            }

            if (localAssetArr.length > 0) {
                for (var i = 0; i < localAssetArr.length; i++) {
                    if (localAssetArr[i].InventoryNo == item.InventoryNo) {
                        const toast = this.$createToast({
                            time: 0,
                            type: 'error',
                            txt: '该单号已经存在了!',
                            mask: true
                        })
                        toast.show()
                        let vm = this
                        setTimeout(function () {
                            toast.hide()
                            vm.$f7router.back()
                        }, 2000);

                        isNotExist = false
                        continue
                    }
                }
            }

            // 如果不存在, 缓存盘点单, 并缓存盘点单下的资产
            if (isNotExist) {
                // 本地资产盘点单列表
                localAssetArr.push(item)
                let localAssetArrData = JSON.stringify(localAssetArr);
                localStorage.setItem('localAssetArr',localAssetArrData);

                this.getRepairData(item)
            }
        },

        // 获取该盘点单下的所有资产
        getRepairData(item) {
            const toast = this.$createToast({
                time: 0,
                txt: '正在缓存资产数据...',
                mask: true
            })
            toast.show()
            console.log('toast.show()');

            let params = {
                'PageSize': 10000,
                'PageIndex': 1,
                'InventoryNo': item.InventoryNo,
            };

            let vm = this;
            let URL = this.api.getInventoryItemList;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    vm.cacheInventorysData(item, data.InventoryItemList)
                }

                else {

                }
                toast.hide()
            });
        },

        cacheInventorysData(item, InventoryItemList) {
            var cacheKey = 'KeyCache+' + item.InventoryNo
            let localAssetArrData = JSON.stringify(InventoryItemList);
            localStorage.setItem(cacheKey,localAssetArrData);
            this.$f7router.back()
        },

        onPullingDown(scroll) {
            scroll.forceUpdate()
        },

        onPullingUp(scroll) {
            scroll.forceUpdate()
        },

        getSearchData() {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true
            })
            toast.show()

            let params = {
                "PageSize": this.config.PageSize,
                "PageIndex": this.searchPage,
                "StartDate": '',
                "EndDate": '',
                "TimeType": '',
                "StoreId": '',
                "InventoryUserCode": '',
                "InventoryState": 0,
                "InventoryNo": this.searchvalue,
            };
            console.log(params);


            let vm = this;
            let URL = this.api.getInventoryList;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    vm.data = data.InventoryList
                }
                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate();
                }

                toast.hide()
            });
        },

    },

    components: {
        scroll, AssetCheckItem
    }
}
</script>

<style lang="css">
</style>
