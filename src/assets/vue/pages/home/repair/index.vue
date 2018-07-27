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
                    <repair-item :item="item" :itemClick="readyrepairItemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="takeordersData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in takeordersData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="takeordersItemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
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
        this.getRepairData(1, 1);
    },

    methods: {
        ...mapActions([
            'getRepairHandleList',
            'getRepairProcessList',
        ]),

        // 待派单
        readyrepairItemClick() {
            this.$f7router.navigate('/readyrepair/');
        },
        // 待接单
        takeordersItemClick() {
            this.$f7router.navigate('/takeorders/');
        },
        // 维修中
        handleingItemClick(itemData) {
            this.getRepairProcessList(itemData)
            this.$f7router.navigate('/repairing/');
        },

        switchTab(index) {
            this.segmentBarIndex = index;
            if (index == 1) {
                if (this.takeordersData.length < 1) {
                    this.onPullingDown()
                }
            } else if (index == 2){
                if (this.RepairStore.handleingData.length < 1) {
                    this.onPullingDown()
                }
            }
        },

        onPullingDown(scroll) {
            if (this.segmentBarIndex == 0) {
                this.readyrepairPage = 1
                this.getRepairData(1, 1, scroll)
            } else if (this.segmentBarIndex == 1){
                this.takeordersPage = 1
                this.getRepairData(1, 2, scroll)
            } else {
                this.waitehandlePage = 1
                this.getRepairHandleList()
                console.log(this.RepairStore.handleingData);
            }
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.readyrepairPage += 1
                this.getRepairData(this.readyrepairPage, 2, scroll)
            } else if (this.segmentBarIndex == 1){
                this.takeordersPage += 1
                this.getRepairData(this.takeordersPage, 2, scroll)
            } else {
                this.RepairStore.handleingPageNumber += 1
                this.getRepairHandleList()
            }
        },

        getRepairData(pageNumber, type, scroll) {

            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
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
                            if (data.DispatchList.count > 0) {
                                vm.readyrepairData = vm.readyrepairData.push(data.DispatchList)
                            }
                        }
                    }

                    else if (vm.segmentBarIndex == 1) {
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
