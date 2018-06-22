<template lang="html">
    <f7-page class="device-measure-page">
        <!-- 导航栏  -->
        <f7-navbar title="设备计量" back-link="Back">
            <f7-nav-right>
                <div @click="filterButtonClickAction">
                    <i class="f7-icons">data</i>
                </div>
            </f7-nav-right>
        </f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

        <!-- 待计量 -->
        <template v-if='currentIndex == 0'>
            <cube-scroll :item="items" ref="scroll" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
                <li v-for="item in items" class="food-item border-1px">
                    <measure-item :title='item.name' :subtitle='item.description' :subtitle1='item.sellCount'></measure-item>
                </li>
            </cube-scroll>
        </template>

        <!-- 已计量 -->
        <template v-if='currentIndex == 1'>
            <scroll :item='items' :onPullingDown="onPullingDown" :onPullingUp="onPullingUp">
                <li v-for="item in items" class="food-item border-1px">
                    <measure-item :title='item.name' :subtitle='item.description' :subtitle1='item.sellCount'></measure-item>
                </li>
            </scroll>
        </template>

        <!-- 科室设备选择器 -->
        <cube-drawer ref="drawer" title="请选择" :data="data" :selected-index="selectedIndex" @change="changeHandler" @select="selectHandler" @cancel="cancelHandler"></cube-drawer>

    </f7-page>
</template>

<script>
import SegmentBar from '../../../common/segmentBar';
import scroll from '../../../common/scroll';
import SectionMenu from './sectionmenu';
import MeasureItem from './measureitem';

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
            titlesArray: ['待计量', '已计量'],
            currentIndex: 0,
            loading: false,
            loadMoreNot: true,
            firstLoad: true,
            menuData: [],

            selectedIndex: [],
            data: [],

            items: [{
                name: 'haha',
                description: 'this is test',
                sellCount: '20'
            }, {
                name: 'haha',
                description: 'this is test',
                sellCount: '20'
            }, {
                name: 'haha',
                description: 'this is test',
                sellCount: '20'
            }, ],
            options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: 'Refresh success'
                },
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: 'Load more',
                        noMore: 'No more data'
                    }
                }
            }
        }
    },

    mounted() {

        this.allData = allData;
        this.finishedData = finished;
        this.unfinishedData = unfinished;
        this.menuData = TestMenuData;

        var arr = [];
        for (var i = 0; i < this.menuData.length; i++) {
            let item = this.menuData[i];
            arr.push(item.name);
        }
        this.data.push(arr);
        this.data.push(this.menuData);

    },


    methods: {

        onPullingDown(scroll) {
            console.log(scroll);
            console.log('onPullingDown');
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    // If have new data, just update the data property.
                    this.items.unshift('I am new data: ' + +new Date())
                    if (scroll) {
                        scroll.forceUpdate()
                    }
                    else {
                        this.$refs.scroll.forceUpdate()
                    }
                } else {
                    // If no new data, you need use the method forceUpdate to tell us the load is done.
                    if (scroll) {
                        scroll.forceUpdate()
                    }
                    else {
                        this.$refs.scroll.forceUpdate()
                    }
                }
            }, 1000)
        },

        onPullingUp() {
            console.log('up');
            // Mock async load.
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    // If have new data, just update the data property.
                    let newPage = [
                        'I am line ' + ++this.itemIndex,
                        'I am line ' + ++this.itemIndex,
                        'I am line ' + ++this.itemIndex,
                        'I am line ' + ++this.itemIndex,
                        'I am line ' + ++this.itemIndex
                    ]

                    this.items = this.items.concat(newPage)
                    this.$refs.scroll.forceUpdate()
                } else {
                    // If no new data, you need use the method forceUpdate to tell us the load is done.
                    this.$refs.scroll.forceUpdate()
                }
            }, 1000)
        },


        // cube-drawer 事件
        // 一级按钮点击事件
        changeHandler(index, item, selectedVal, selectedIndex, selectedText) {
            var arr = [];
            for (var i = 0; i < this.menuData.length; i++) {
                if (this.menuData[i].name == selectedText) {
                    arr = this.menuData[i].children;
                    continue;
                }
            }
            var secondArr = [];
            for (var i = 0; i < arr.length; i++) {
                secondArr.push(arr[i].name);
            }
            this.$refs.drawer.refill(index + 1, secondArr)

        },

        // 按钮选择事件
        selectHandler(selectedVal, selectedIndex, selectedText) {
            console.log(selectedVal, selectedIndex, selectedText);
        },

        cancelHandler() {
            console.log('cancel')
        },


        menuClickAction() {
            console.log(item);
        },

        // 筛选按钮点击事件
        filterButtonClickAction() {
            this.$refs.drawer.show()
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
        MeasureItem,
    }
}
</script>

<style lang="css">
</style>
