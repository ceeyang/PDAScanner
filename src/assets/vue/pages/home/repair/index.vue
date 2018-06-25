<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar title="维修处理" back-link="Back"></f7-navbar>


        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="currentIndex==0">
            <scroll :items="readyrepairData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="currentIndex==1">
            <scroll :items="takeordersData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in takeordersData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="currentIndex==2">
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
            currentIndex: 0,
            // 待派工
            readyrepairData: [],
            // 待接单
            takeordersData: [],
            // 待处理
            waitehandleData: [],


        }
    },

    mounted() {
        this.readyrepairData = data;
    },

    methods: {
        itemClick() {

        },

        switchTab(index) {
            this.currentIndex = index;
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
