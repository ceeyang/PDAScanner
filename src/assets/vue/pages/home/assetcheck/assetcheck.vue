<template>
<f7-page class="asset-check-page">
    <f7-navbar>
        <f7-nav-left>
            <div @click="NavBack">
                <i class="iconfont">&#xe605;</i>
            </div>
        </f7-nav-left>
        <f7-nav-title title='设备盘点'></f7-nav-title>
        <f7-nav-right>
            <div @click="addDevice">
                <i class="iconfont">&#xe6b9;</i>
            </div>
        </f7-nav-right>
    </f7-navbar>


    <scroll class="asset-check-scroll" :items="data" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
        <li v-for="(item,index) in data" :key="index" :item="item">
            <asset-check-item :item="item" :itemClick="itemClick"></asset-check-item>
        </li>
    </scroll>




</f7-page>
</template>

<script>
import scroll from '../../../common/scroll'
import AssetCheckItem from './assetCheckItem'
export default {
    data() {
        return {
            data: [],
            timer: [],
        }
    },

    beforeDestroy() {
        console.log('xxxbeforeDestroy');
    },

    mounted() {
        this.loadData()

        var storageHander = function() {
            let localAssetArr = []
            if (localStorage.localAssetArr) {
                localAssetArr = JSON.parse(localStorage.localAssetArr);
            }
            this.data = localAssetArr
        }
//window.addEventListener('storage', storageHander, false)
    },
    methods: {

        // 本方法重复监听  缓存值是否变化,
        initTimmer() {

        },

        loadData() {
            let localAssetArr = []
            if (localStorage.localAssetArr) {
                localAssetArr = JSON.parse(localStorage.localAssetArr);
            }
            this.data = localAssetArr
        },

        addDevice() {

            this.$f7router.navigate('/newAssetCheck/');
        },

        NavBack() {
            this.$f7router.back()
        },

        onPullingDown(scroll) {
            scroll.forceUpdate()
        },

        onPullingUp(scroll) {
            scroll.forceUpdate()
        },

        itemClick() {

        }


    },
    components: {
        scroll, AssetCheckItem,
    }
}
</script>
<style scoped>
</style>
