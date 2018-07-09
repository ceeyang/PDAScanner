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
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="segmentBarIndex==0">
            <scroll :items="readyrepairData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="takeordersData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in takeordersData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
            <scroll :items="waitehandleData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in waitehandleData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import RepairItem from '../../../common/repairitem';

import data from './json/readyrepair.json';

export default {

    data() {
        return {

            titlesArray: ['待派工', '待接单', '待处理'],
            segmentBarIndex: 0,

            // 待派工
            readyrepairData: [],
            readyrepairPage: 1,

            // 待接单
            takeordersData: [],
            takeordersPage: 1,

            // 待处理
            waitehandleData: [],
            waitehandlePage: 1,


        }
    },

    mounted() {
        // 测试数据
        this.readyrepairData = data;

        this.getRepairData(1, 1);

    },

    methods: {
        itemClick() {
            this.$f7router.navigate('/readyrepair/');
        },

        switchTab(index) {
            this.segmentBarIndex = index;
        },

        onPullingDown(scroll) {
            if (this.segmentBarIndex == 0) {
                this.readyrepairPage = 1
            } else if (this.segmentBarIndex == 1){
                this.takeordersPage = 1
            } else {
                this.waitehandlePage = 1
            }
            this.getRepairData(1, 1, scroll)
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.readyrepairPage += 1
            } else if (this.segmentBarIndex == 1){
                this.takeordersPage += 1
            } else {
                this.waitehandlePage += 1
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
                'EquCode': '',
                'DepartmentId': '',
                'UserCode': localStorage.account,
                'Store': localStorage.storeId,
                'StartDate': '',
                'EndDate': '',
                'RepairOrder': '',
                'RepairStatus': '',
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
                    if (vm.segmentBarIndex == 0) {
                        if (pageNumber == 1) {
                            vm.readyrepairData = data.DispatchList;
                        } else {
                            vm.readyrepairData = vm.readyrepairData.push(data.DispatchList)
                        }
                    }

                    else if (vm.segmentBarIndex == 1) {
                        if (pageNumber == 1) {
                            vm.takeordersData = data.DispatchList;
                        } else {
                            vm.takeordersData = vm.takeordersData.push(data.DispatchList)
                        }
                    }

                    else {
                        if (pageNumber == 1) {
                            vm.waitehandleData = data.DispatchList;
                        } else {
                            vm.waitehandleData = vm.waitehandleData.push(data.DispatchList)
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
