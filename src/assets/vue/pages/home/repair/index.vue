<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar title="维修处理" back-link="Back"></f7-navbar>


        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="segmentBarIndex==0">
            <scroll :items="readyrepairData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="takeordersData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in takeordersData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
            <scroll :items="waitehandleData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in waitehandleData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import RepairItem from './repairitem.vue';

import data from './json/readyrepair.json';

export default {

    data() {
        return {

            titlesArray: ['待派工', '待接单', '待处理'],
            segmentBarIndex: 0,
            // 待派工
            readyrepairData: [],
            // 待接单
            takeordersData: [],
            // 待处理
            waitehandleData: [],


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
            console.log('pullingDown: ' + scroll);
            setTimeout(function () {
                scroll.forceUpdate();
            }, 1000);
        },

        onPullingUp(scroll) {
            setTimeout(function () {
                scroll.forceUpdate();
            }, 1000);
        },

        getRepairData(pageNumber, type, scroll) {

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

                console.log(params);

                console.log("---------------------------------------------------------------------: ");
                console.log(" 请求地址: " + URL);
                console.log(" 返回数据: ");
                console.log(data);
                console.log("---------------------------------------------------------------------- ");

                if (data.Status) {
                    if (vm.segmentBarIndex == 0) {
                        vm.readyrepairData = data;
                    }

                    else {
                        vm.takeordersData = data;
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
            });
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
