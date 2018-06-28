<template lang="html">
    <f7-page>
        <!-- Nav  -->
        <f7-navbar title="科室报修" back-link="Back"></f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

        <!-- 待维修 -->
        <template v-if="currentIndex==0">
            <scroll :items="readyrepairData.rows" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick" className="readyrepair"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 已维修 -->
        <template v-if="currentIndex==1">
            <scroll :items="repairCompletedData.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in repairCompletedData.rows" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>


    </f7-page>
</template>

<script>

import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import RepairItem from '../../../common/repairitem.vue';
import data from './json/readyrepair.json';

export default {

    data() {
        return {
            titlesArray: ['待报修', '已报修'],
            currentIndex: 0,

            // 待维修
            readyrepairData: [],
            // 已维修
            repairCompletedData: [],
        }
    },

    mounted() {
        this.readyrepairData = data;
    },

    methods: {
        itemClick() {
            this.$f7router.navigate('/applyrepair/');
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
        SegmentBar,
        scroll,
        RepairItem,
    }
}
</script>

<style lang="css">
</style>
