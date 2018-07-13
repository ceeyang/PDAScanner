<template lang="html">
    <f7-page class="device-measure-page">
        <!-- 导航栏  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='设备计量'></f7-nav-title>
            <f7-nav-right>
                <div @click="filterButtonClickAction">
                    <i class="f7-icons">data</i>
                </div>
            </f7-nav-right>
        </f7-navbar>



        <!-- 分类选择器 -->
        <!-- <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar> -->

        <!-- 待计量 -->
        <!-- <template v-if='currentIndex == 0'> -->
            <!-- <cube-scroll :item="items" ref="scroll" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp"> -->
                <!-- <li v-for="item in items"> -->
                    <!-- <measure-item :item="item" :itemClick="itemClick"></measure-item> -->
                <!-- </li> -->
            <!-- </cube-scroll> -->
        <!-- </template> -->

        <!-- 已计量 -->
        <!-- <template v-if='currentIndex == 1'> -->
            <!-- <scroll :item='items' :onPullingDown="onPullingDown" :onPullingUp="onPullingUp"> -->
                <!-- <li v-for="item in items"> -->
                    <!-- <measure-item :item="item" :itemClick="itemClick"></measure-item> -->
                <!-- </li> -->
            <!-- </scroll> -->
        <!-- </template> -->


        <scroll :item="items.rows" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
            <li v-for="(item,index) in items.rows" :key="index" :item="item">
                <measure-item :item="item" :itemClick="itemClick"></measure-item>
            </li>
        </scroll>


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
import TestMenuData from './json/menu.json';
import MeteringData from './json/metering.json';

export default {

    data() {
        return {
            titlesArray: ['待计量', '已计量'],
            currentIndex: 0,
            selectedIndex: [],


            loading: false,
            loadMoreNot: true,
            firstLoad: true,

            // 科室数据
            // 所有科室数据
            menuData: [],
            // 一级科室目录
            data: [],

            //当前列表数据
            items: [],

        }
    },

    mounted() {

        this.items = allData;
        console.log(this.items);
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
        NavBack() {
                this.$f7router.back()
            },

        itemClick() {
            console.log('itemclickaction');
            this.$f7router.navigate('/measuredetail/');
        },

        onPullingDown(scroll) {
            console.log(scroll);
            console.log('onPullingDown');
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    // If have new data, just update the data property.
                    this.items.unshift('I am new data: ' + +new Date())
                    if (scroll) {
                        scroll.forceUpdate()
                    } else {
                        scroll.forceUpdate()
                    }
                } else {
                    // If no new data, you need use the method forceUpdate to tell us the load is done.
                    if (scroll) {
                        scroll.forceUpdate()
                    } else {
                        scroll.forceUpdate()
                    }
                }
            }, 1000)
        },

        onPullingUp(scroll) {
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
                    scroll.forceUpdate()
                } else {
                    // If no new data, you need use the method forceUpdate to tell us the load is done.
                    scroll.forceUpdate()
                }
            }, 1000)
        },


        // cube-drawer 事件
        // 一级按钮点击事件
        changeHandler(index, item, selectedVal, selectedIndex, selectedText) {

            // 获取当前选择目录下所有子集目录
            var arr = [];
            for (var i = 0; i < this.menuData.length; i++) {
                if (this.menuData[i].name == selectedText) {
                    arr = this.menuData[i].children;
                    continue;
                }
            }

            // 获取当前目录下子集目录的所有名称
            var secondArr = [];
            for (var i = 0; i < arr.length; i++) {
                secondArr.push(arr[i].name);
            }

            // 重新渲染当前二级目录
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
