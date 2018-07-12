<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='资产列表'></f7-nav-title>
        </f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="segmentBarIndex==0">
            <scroll :items="data" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in data" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="notCheckData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in notCheckData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
            <scroll :items="checkedData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in checkedData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import AssetItem from './AssetItem';
import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';
export default {

    data() {
        return {

            titlesArray: ['全部', '未盘点', '已盘点'],
            segmentBarIndex: 0,

            itemData: [],

            // 待派工
            allData: [],
            data: [],
            allDataPage: 1,

            // 待接单
            allNotCheckData: [],
            notCheckData: [],
            notCheckDataPage: 1,

            // 待处理
            allCheckedData: [],
            checkedData: [],
            checkedDataPage: 1,


        }
    },

    computed: {
        ...mapState([
            'assetCheckStore',
        ])
    },

    ...mapActions([
        "refreshFinishedData",
    ]),

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData

        var cacheKey = 'KeyCache+' + itemData.InventoryNo
        let allData = JSON.parse(localStorage.getItem(cacheKey))
        this.allData = allData

        var cacheKeyUnfinished = 'KeyCacheUnfinished+' + itemData.InventoryNo
        var unfinishedData = localStorage.getItem(cacheKeyUnfinished)
        if (!unfinishedData) {
            this.unfinishedData = allData
        } else {
            this.unfinishedData = JSON.parse(localStorage.getItem(cacheKeyUnfinished))
        }

        this.getRepairData()
    },

    methods: {

        loadUnfinishedData() {

        },

        loadFinishedData() {
            debugger
            var cacheKeyFinished = 'KeyCacheFinished+' + this.itemData.InventoryNo
            var finishedData = localStorage.getItem(cacheKeyFinished)
            if (finishedData) {
                this.finishedData = JSON.parse(localStorage.getItem(cacheKeyUnfinished))
            }
        },



        itemClick(item) {
            localStorage.setItem('detailAssetData', JSON.stringify(item))
            this.$f7router.navigate('/detailAsset/');
        },

        switchTab(index) {
            this.segmentBarIndex = index;
        },

        onPullingDown(scroll) {
            if (this.segmentBarIndex == 0) {
                this.allDataPage = 1
            } else if (this.segmentBarIndex == 1) {
                this.notCheckDataPage = 1
            } else {
                this.checkedDataPage = 1
            }
            this.getRepairData(scroll)
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.allDataPage += 1
            } else if (this.segmentBarIndex == 1) {
                this.notCheckDataPage += 1
            } else {
                this.checkedDataPage += 1
            }
            this.getRepairData(scroll)
        },

        getRepairData(scroll) {

            // 用来储存当前应该新增的
            var arr = []
            // 自定义每次加载多少数据
            var pageSize = 20
            // 第一次加载的个数
            var firstIndex = 0

            if (this.segmentBarIndex == 0) {

                if (this.data) {
                    firstIndex = this.data.length
                }

                if (this.allDataPage == 1) {
                    firstIndex = 0
                }

                // 遍历总数组, 获取应该加载的数组
                outer:
                    for (var i = firstIndex; i < this.allData.length; i++) {

                        // 添加各个 item 到需要新增的数组
                        arr.push(this.allData[i])

                        // 当前遍历次数达到 pagesize 值
                        if (i - firstIndex == pageSize - 1) {
                            console.log(i);
                            break outer
                        }
                    }

                // 将应该新增的内容添加到原有数组
                this.data = firstIndex == 0 ? arr : this.data.concat(arr)
            }


            // 未完成
            else if (this.segmentBarIndex == 1) {

                if (this.notCheckData) {
                    firstIndex = this.notCheckData.length
                }

                if (this.notCheckDataPage == 1) {
                    firstIndex = 0
                }

                // 遍历总数组, 获取应该加载的数组
                for (var i = firstIndex; i < this.allNotCheckData.length; i++) {

                    // 添加各个 item 到需要新增的数组
                    arr.push(this.allNotCheckData[i])

                    // 当前遍历次数达到 pagesize 值
                    if (i - firstIndex == pageSize - 1) {
                        break
                    }
                }

                // 将应该新增的内容添加到原有数组
                this.notCheckData = firstIndex == 0 ? arr : this.notCheckData.concat(arr)

            } else {

                if (this.checkedData) {
                    firstIndex = this.checkedData.length
                }

                if (this.checkedDataPage == 1) {
                    firstIndex = 0
                }

                // 遍历总数组, 获取应该加载的数组
                for (var i = firstIndex; i < this.allCheckedData.length; i++) {

                    // 添加各个 item 到需要新增的数组
                    arr.push(this.allCheckedData[i])

                    // 当前遍历次数达到 pagesize 值
                    if (i - firstIndex == pageSize - 1) {
                        break
                    }
                }

                // 将应该新增的内容添加到原有数组
                this.checkedData = firstIndex == 0 ? arr : this.checkedData.concat(arr)

            }



            if (scroll && scroll.forceUpdate) {
                // 数据量太大, 预留5秒刷新页面
                setTimeout(function() {
                    scroll.forceUpdate();
                }, 5000);
            }
        },

        NavBack() {
            this.$f7router.back()
        }
    },

    components: {
        scroll,
        AssetItem,
        SegmentBar
    }
}
</script>

<style lang="css">
</style>
