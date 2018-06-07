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

        <div class="page-content pull-to-refresh-content">
            <f7-list>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
                <f7-list-item title="ahah"></f7-list-item>
            </f7-list>
        </div>

        <!-- tabbar -->
        <!-- <foot-bar select="chats"></foot-bar> -->
        <f7-toolbar tabbar>
  <f7-link tab-link="#tab1" active>Tab 1</f7-link>
  <f7-link tab-link="#tab2">Tab 2</f7-link>
</f7-toolbar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
import SegmentBar from '../../common/segmentBar';
import scroll from '../../common/scroll';

export default {

    data () {
        return {
            titlesArray:['全部','待维修','已完成'],
                currentIndex:0,
                loading: false,
                loadMoreNot: true,
                firstLoad: true,
        }
    },

    methods: {
        // 导航栏点击事件
            switchTab(index) {
                this.currentIndex = index;
            },

            barcodeScanner(){

            },

            onfresh(){
                console.log('.....');
                this.$f7.ptr.done();
            },


    },

    components: {
        FootBar, NavBar, SegmentBar, scroll,
    }
}
</script>

<style lang="css">
.ptr-preloader{
    margin-top: -70px;
}
</style>
