<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修处理'></f7-nav-title>
        </f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="RepairStore.segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="RepairStore.segmentBarIndex==0">
            <scroll :items="readyrepairData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="readyrepairItemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="RepairStore.segmentBarIndex==1">
            <scroll :items="takeordersData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in takeordersData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="takeordersItemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="RepairStore.segmentBarIndex==2">
            <scroll :items="RepairStore.handleingData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in RepairStore.handleingData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="handleingItemClick"></repair-item>
                </li>
            </scroll>
        </template>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import RepairItem from '../../../common/repairitem';

import {
    mapState,
    mapActions,
} from 'vuex';

export default {

    data() {
        return {

            titlesArray: ['待派工', '待接单', '维修中'],
            segmentBarIndex: 0,

            // 待派工
            readyrepairData: [],
            readyrepairPage: 1,

            // 待接单
            takeordersData: [],
            takeordersPage: 1,

        }
    },

    computed: {
        ...mapState([
            'RepairStore',
        ])
    },

    mounted() {
        // 设置了下拉刷新, 进来的时候会默认刷新一次
        // this.getRepairData(1, 1);

        // 第一次进入该页面的时候加载数据
        this.onPullingDown()
    },

    methods: {
        ...mapActions([
            'getRepaiingrHandleList',
            'getRepairProcessList',
            'getReadyRepairDetail',

        ]),

        // 待派单
        readyrepairItemClick(item) {
            console.log(item);
            this.RepairStore.mReadyRepairItme = item
            let vm = this
            this.getReadyRepairDetail(item.RepairOrder.replace(/\s*/g, "")).then((data)=>{
                this.RepairStore.mReadyRepairDetail = data.RepairInfo
                vm.$f7router.navigate('/readyrepair/');
            })
        },
        // 待接单
        takeordersItemClick(item) {
            this.RepairStore.mTakeOrderItme = item
            let vm = this
            this.getReadyRepairDetail(item.RepairOrder.replace(/\s*/g, "")).then((data)=>{
                // code by yangxichuan
                vm.RepairStore.mTakeOrderItmeDetail = data.RepairInfo
                vm.$f7router.navigate('/takeorders/');
                // else

                // vm.RepairStore.mCurrentRepair = data.RepairInfo
                // vm.RepairStore.mCurrentRepairDetail = data.RepairInfo
                // vm.$f7router.navigate('/repairing/');

            })
        },
        // 维修中
        handleingItemClick(itemData) {
            console.log(itemData);
            this.RepairStore.mCurrentRepair = itemData
            this.getReadyRepairDetail(itemData.RepairNo.replace(/\s*/g, "")).then((data)=>{
                this.RepairStore.mCurrentRepairDetail = data.RepairInfo
                this.$f7router.navigate('/repairing/');
            })
        },

        /**
         * 顶部 segment bar 点击事件
         * @param  {[type]} index 当前 index
         */
        switchTab(index) {
            this.RepairStore.segmentBarIndex = index;
            if (index == 0) {
                if (this.readyrepairData.length < 1) {
                    this.onPullingDown()
                }
            } else if (index == 1) {
                if (this.takeordersData.length < 1) {
                    this.onPullingDown()
                }
            } else if (index == 2){
                if (this.RepairStore.handleingData.length < 1) {
                    this.onPullingDown()
                }
            }
        },

        /**
         * 下拉刷新
         * @param  {[type]} scroll scroll dom, 用于结束刷新
         */
        onPullingDown(scroll) {
            console.log("onPullingDown");
            if (this.RepairStore.segmentBarIndex == 0) {
                this.readyrepairPage = 1
                this.getRepairData(1, 1, scroll)
            } else if (this.RepairStore.segmentBarIndex == 1){
                this.takeordersPage = 1
                this.getRepairData(1, 2, scroll)
            } else {
                this.RepairStore.handleingPageNumber = 1
                this.getRepaiingrHandleList().then((res)=>{
                    if (scroll && scroll.forceUpdate) {
                        scroll.forceUpdate();
                    }
                })
            }
        },

        /**
         * 上拉加载更多
         * @param  {[type]} scroll scroll dom, 用于结束刷新
         */
        onPullingUp(scroll) {
            console.log("onPullingUp");
            if (this.RepairStore.segmentBarIndex == 0) {
                this.readyrepairPage += 1
                this.getRepairData(this.readyrepairPage, 2, scroll)
            } else if (this.RepairStore.segmentBarIndex == 1){
                this.takeordersPage += 1
                this.getRepairData(this.takeordersPage, 2, scroll)
            } else {
                this.RepairStore.handleingPageNumber += 1
                this.getRepaiingrHandleList().then((res)=>{
                    if (scroll && scroll.forceUpdate) {
                        scroll.forceUpdate();
                    }
                })
            }
        },

        getRepairData(pageNumber, type, scroll) {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                //mask: true
            })
            toast.show()

            let params = {
                'EquCode': '',
                'DepartmentId': '',
                'UserCode': localStorage.account,
                'Store': localStorage.storeId,
                'StartDate': '',
                'EndDate': '',
                'RepairOrder': '',
                'RepairStatus': '1',
                'SortType': '',
                'AssignOrConfirm': type,
                'PageIndex': pageNumber,
                'PageSize': this.config.PageSize,
            };
            console.log(params);


            let vm = this;
            let URL = this.api.dispatchList;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    if (vm.RepairStore.segmentBarIndex == 0) {
                        if (pageNumber == 1) {
                            vm.readyrepairData = data.DispatchList;
                        } else {
                            if (data.DispatchList.count > 0) {
                                vm.readyrepairData = vm.readyrepairData.push(data.DispatchList)
                            }
                        }
                    }

                    else if (vm.RepairStore.segmentBarIndex == 1) {
                        if (pageNumber == 1) {
                            vm.takeordersData = data.DispatchList;
                        } else {
                            if (data.DispatchList.count > 0) {
                                vm.takeordersData = vm.takeordersData.push(data.DispatchList)
                            }
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
        RepairItem,
        SegmentBar
    }
}
</script>

<style lang="css">
</style>
