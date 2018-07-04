<template>
<f7-page class="chats-page">

    <!-- Nav -->
    <f7-navbar>
        <f7-nav-title title='消息'></f7-nav-title>
        <f7-nav-right>
            <div @click="barcodeScanner">
                <i class="f7-icons">camera</i>
            </div>
        </f7-nav-right>
    </f7-navbar>

    <!-- segment 选择器 -->
    <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

    <!-- 全部 -->
    <template v-if="currentIndex==0">
        <scroll :items="allDataArr" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
            <li v-for="(item,index) in allDataArr" :key="index" :item="item">
                <repair-item :item="item" :itemClick="itemClick" className="readyrepair"></repair-item>
            </li>
        </scroll>
    </template>

    <!-- 待维修 -->
    <template v-if="currentIndex==1">
            <scroll :items="unFinishedDataArr" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in unFinishedDataArr" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

    <!-- 已维修 -->
    <template v-if="currentIndex==2">
            <scroll :items="finishedDataArr" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in finishedDataArr" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>

    <!-- tabbar -->
    <foot-bar select="chats"></foot-bar>
</f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
import SegmentBar from '../../common/segmentBar';
import scroll from '../../common/scroll';

export default {

    data() {
        return {
            titlesArray: ['全部', '待维修', '已完成'],
            currentIndex: 0,
            loading: false,
            loadMoreNot: true,
            firstLoad: true,

            allDataArr: [],
            unFinishedDataArr: [],
            finishedDataArr: [],
        }
    },

    methods: {

        itemClick() {

        },

        onPullingDown(scroll) {
            setTimeout(function() {
                scroll.forceUpdate()
            }, 2000);
        },

        onPullingUp(scroll) {

            setTimeout(function() {
                scroll.forceUpdate()
            }, 2000);

            if (this.currentIndex == 0) {


            } else if (this.currentIndex == 1) {


            } else {

            }
        },

        // 导航栏点击事件
        switchTab(index) {
            this.currentIndex = index;
        },

        barcodeScanner() {

        },

        onfresh() {
            console.log('.....');
            this.$f7.ptr.done();
        },


    },

    components: {
        FootBar,
        NavBar,
        SegmentBar,
        scroll,
    }
}
</script>

<style lang="css">
.ptr-preloader{
    margin-top: -70px;
}
</style>
