<!--
申请设备维修页面
codeer: cee
2018-06-25 18:16:13
-->
<template lang="html">
    <f7-page>
        <!-- Nav  -->
        <f7-navbar title="申请报修" back-link="Back"></f7-navbar>

        <scroll>
            <li>sha</li>
            <li>sha</li>
            <li>sha</li>
            <li>sha</li>
            <li>sha</li>
        </scroll>

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
