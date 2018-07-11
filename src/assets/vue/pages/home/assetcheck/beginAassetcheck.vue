<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='资产列表'></f7-nav-title>
        </f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="segmentBarIndex==0">
            <scroll :items="allData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in allData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="notCheckData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in notCheckData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
            <scroll :items="checkedData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in checkedData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import AssetItem from './AssetItem';

export default {

    data() {
        return {

            titlesArray: ['全部', '未盘点', '已盘点'],
            segmentBarIndex: 0,

            itemData: [],

            // 待派工
            allData: [],
            allDataPage: 1,

            // 待接单
            notCheckData: [],
            notCheckDataPage: 1,

            // 待处理
            checkedData: [],
            checkedDataPage: 1,


        }
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData

        var cacheKey = 'KeyCache+' + itemData.InventoryNo
        let allData = JSON.parse(localStorage.getItem(cacheKey))
        this.allData = allData
        this.notCheckData = allData;

        // this.getRepairData(1, 1);
    },

    methods: {
        itemClick() {
            console.log('itemClick');
            // this.$f7router.navigate('/readyrepair/');
        },

        switchTab(index) {
            this.segmentBarIndex = index;
        },

        onPullingDown(scroll) {
            if (this.segmentBarIndex == 0) {
                this.allDataPage = 1
            } else if (this.segmentBarIndex == 1){
                this.notCheckDataPage = 1
            } else {
                this.checkedDataPage = 1
            }
            this.getRepairData(1, 1, scroll)
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.allDataPage += 1
            } else if (this.segmentBarIndex == 1){
                this.notCheckDataPage += 1
            } else {
                this.checkedDataPage += 1
            }
        },

        getRepairData(pageNumber, type, scroll) {

            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
            })
            toast.show()
            console.log('toast.show()');

            let params = {
                'PageSize': this.config.PageSize,
                'PageIndex': pageNumber,
                'InventoryNo': this.itemData.InventoryNo,
            };
            console.log(params);


            let vm = this;
            let URL = this.api.getInventoryItemList;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    if (vm.segmentBarIndex == 0) {
                        if (pageNumber == 1) {
                            vm.allData = data.InventoryItemList;
                        } else {
                            vm.allData = vm.allData.push(data.InventoryItemList)
                        }
                    }

                    else if (vm.segmentBarIndex == 1) {
                        if (pageNumber == 1) {
                            vm.notCheckData = data.InventoryItemList;
                        } else {
                            vm.notCheckData = vm.notCheckData.push(data.InventoryItemList)
                        }
                    }

                    else {
                        if (pageNumber == 1) {
                            vm.checkedData = data.InventoryItemList;
                        } else {
                            vm.checkedData = vm.checkedData.push(data.InventoryItemList)
                        }
                    }
                }


                else {

                    let msg = data.Msg;
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate();
                }

                toast.hide()
            });
        },

        NavBack() {
            this.$f7router.back()
        }
    },

    components: {
        scroll,
        AssetItem,
        SegmentBar
    }
}
</script>

<style lang="css">
</style>
