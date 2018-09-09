<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar backLink title="资产列表"></f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>


        <!-- 待派工 -->
        <template v-if="segmentBarIndex==0">
            <scroll :items="assetCheckStore.data" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in assetCheckStore.data" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待接单 -->
        <template v-if="segmentBarIndex==1">
            <scroll :items="assetCheckStore.notCheckData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in assetCheckStore.notCheckData" :key="index" :item="item">
                    <asset-item :item="item" :itemClick="itemClick"></asset-item>
                </li>
            </scroll>
        </template>

        <!-- 待处理 -->
        <template v-if="segmentBarIndex==2">
            <scroll :items="assetCheckStore.checkedData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in assetCheckStore.checkedData" :key="index" :item="item">
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
        }
    },

    computed: {
        ...mapState([
            'assetCheckStore',
        ])
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData

        this.$store.dispatch('refreshAllData', itemData)
        this.$store.dispatch('refreshUnFinishedData', itemData)
        this.$store.dispatch('refreshFinishedData', itemData)
        this.$store.dispatch('getNewAssetData',this.segmentBarIndex)

        this.getRepairData()
    },

    methods: {

        itemClick(item) {
            localStorage.setItem('detailAssetData', JSON.stringify(item))
            this.$f7router.navigate('/detailAsset/');
        },

        switchTab(index) {
            this.segmentBarIndex = index;
            if (this.assetCheckStore.notCheckData.length < 1 ||
                this.assetCheckStore.checkedData.length  < 1 ){
                this.$store.dispatch('getNewAssetData',this.segmentBarIndex)
            }
        },

        onPullingDown(scroll) {
            if (this.segmentBarIndex == 0) {
                this.assetCheckStore.allDataPage = 1
            } else if (this.segmentBarIndex == 1) {
                this.assetCheckStore.notCheckDataPage = 1
            } else {
                this.assetCheckStore.checkedDataPage = 1
            }
            this.getRepairData(scroll)
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.assetCheckStore.allDataPage += 1
            } else if (this.segmentBarIndex == 1) {
                this.assetCheckStore.notCheckDataPage += 1
            } else {
                this.assetCheckStore.checkedDataPage += 1
            }
            this.getRepairData(scroll)
        },

        getRepairData(scroll) {
            this.$store.dispatch('getNewAssetData',this.segmentBarIndex)
            if (scroll && scroll.forceUpdate) {
                // 数据量太大, 预留5秒刷新页面
                setTimeout(function() {
                    scroll.forceUpdate();
                }, 2000);
            }
        },

        NavBack() {
            this.$f7router.back()
        }
    },

    beforeDestroy() {
        this.assetCheckStore.data = []
        this.assetCheckStore.notCheckData = []
        this.assetCheckStore.checkedData = []
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
