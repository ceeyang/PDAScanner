<template lang="html">
  <f7-page class="new-asset-check-page">


      <f7-navbar>
          <f7-nav-left>
              <div @click="NavBack">
                  <i class="iconfont">&#xe605;</i>
              </div>
          </f7-nav-left>
          <f7-nav-title title='新增设备'></f7-nav-title>
      </f7-navbar>


      <div class="search-input">
          <input type="search" placeholder="请输入盘点单号" :value="searchvalue" @keyup='search($event)'>
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

        }
    },

    methods: {
        search: function(e) {
            this.searchvalue = e.currentTarget.value;
            this.getSearchData();
        },

        NavBack() {
            this.$f7router.back()
        },

        itemClick() {
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
        }
    },

    components: {
        scroll, AssetCheckItem
    }
}
</script>

<style lang="css">
</style>
