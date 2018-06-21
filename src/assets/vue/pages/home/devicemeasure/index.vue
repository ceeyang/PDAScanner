<template lang="html">
    <f7-page class="device-measure-page">
        <!-- Nav  -->
        <f7-navbar title="设备计量" back-link="Back">
            <f7-nav-right>
                <div @click="filterButtonClickAction">
                    <i class="f7-icons">data</i>
                </div>
            </f7-nav-right>
        </f7-navbar>

        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>


        <template v-if='currentIndex == 1'>
            <scroll :onfresh='onfresh'>
                <f7-list media-list>
                    <template v-for='(item,index) in allData.rows' :index='index' :item='item'>
                        <f7-list-item @click='itemclickaction'>
                            <div slot="root-start">证书编号: {{item.ZSBH}}</div>
                            <div slot="title">{{item.SBMC}}</div>
                            <div slot="subtitle">备注: {{item.BZ || '暂无备注' }}</div>
                            <div slot="after">计量检测</div>
                            <!-- <img src="path-to-my-image.jpg" slot="media"> -->
                            <!-- <div slot="root-start">证书编号: {{item.ZSBH}}</div> -->
                            <!-- <div slot="content-start">Content Start</div> -->
                            <!-- <div slot="content">Content End</div> -->
                            <!-- <div slot="media-start">Media Start</div> -->
                            <!-- <div slot="media">Media</div> -->
                            <!-- <span slot="after-start">After Start</span> -->
                            <!-- <span slot="after">After End</span> -->
                            <!-- <div slot="inner">检查日期: {{item.JLSJ}}</div> -->
                            <!-- <div slot="before-title">Before Title</div> -->
                            <!-- <div slot="after-title">After Title</div> -->
                        </f7-list-item>
                    </template>
                </f7-list>
            </scroll>
        </template>

        <template v-else-if='currentIndex == 2'>
            <scroll :onfresh='onfresh'>
                <f7-list media-list>
                    <template v-for='(item,index) in finishedData.rows' :index='index' :item='item'>
                        <f7-list-item @click='itemclickaction'>
                            <div slot="root-start">证书编号: {{item.ZSBH}}</div>
                            <div slot="title">{{item.SBMC}}</div>
                            <div slot="subtitle">备注: {{item.BZ || '暂无备注' }}</div>
                            <div slot="after">计量检测</div>
                        </f7-list-item>
                    </template>
                </f7-list>
            </scroll>
        </template>

        <section-menu v-else :menuData='menuData' :rightItemTapAction='menuClickAction'></section-menu>

    </f7-page>
</template>

<script>
import SegmentBar from '../../../common/segmentBar';
import scroll from '../../../common/scroll';
import SectionMenu from './sectionmenu';

import allData from './json/allmeasure.json';
import finished from './json/finishedmeasure.json'
import unfinished from './json/unfinishedmeasure.json'
import TestMenuData from './json/menu.json';

export default {

    data() {
        return {
            allData: [],
            finishedData: [],
            unfinishedData: [],
            titlesArray: ['全部', '已计量', '待计量'],
            currentIndex: 1,
            loading: false,
            loadMoreNot: true,
            firstLoad: true,
            menuData: [],
        }
    },

    mounted() {

        this.allData = allData;
        this.finishedData = finished;
        this.unfinishedData = unfinished;
        this.menuData = TestMenuData;

    },


    methods: {

        menuClickAction() {
            console.log(item);
        },

        // 筛选按钮点击事件
        filterButtonClickAction() {
            console.log('筛选');
        },

        // 导航栏点击事件
        switchTab(index) {
            this.currentIndex = index;
        },

        onfresh() {
            console.log('onfresh');
            let vm = this;
            setTimeout(function() {
                vm.$f7.ptr.done();
            }, 1000);
        },

        itemclickaction() {
            console.log('itemclickaction');
            this.$f7router.navigate('/measuredetail/');
        },

        menuClickAction(item) {
            console.log(item);
        }




    },

    components: {
        SegmentBar,
        scroll,
        SectionMenu,
    }
}
</script>

<style lang="css">
</style>
