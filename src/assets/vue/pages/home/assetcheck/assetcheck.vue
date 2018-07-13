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
            <asset-check-item :item="item" :itemClick="itemClick" :rightBtnAction="deleteBtnAction"></asset-check-item>
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
        if (this.timer) {
            this.timer = []
        }
    },

    mounted() {
        this.loadData()

        let vm = this
        this.timer = setInterval(function() {
            vm.loadData()
        }, 1000);
    },
    methods: {
        deleteBtnAction(item) {
            let vm = this
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                content: '是否确认删除该条数据?',
                confirmBtn: {
                    text: '删除',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    vm.deleteItem(item)
                },
                onCancel: () => {

                }
            }).show()
        },

        deleteItem(item) {
            var localAssetArr = []
            if (localStorage.localAssetArr) {
                localAssetArr = JSON.parse(localStorage.localAssetArr);
            }
            var newLocalAssetArr = []
            if (localAssetArr.length > 0) {
                for (var i = 0; i < localAssetArr.length; i++) {
                    if (localAssetArr[i].InventoryNo == item.InventoryNo) {
                        var cacheKey = 'KeyCache+' + item.InventoryNo
                        localStorage.removeItem(cacheKey);
                        continue
                    }
                    newLocalAssetArr.push(localAssetArr[i])
                }
            }

            let localAssetArrData = JSON.stringify(newLocalAssetArr);
            localStorage.setItem('localAssetArr', localAssetArrData);


            // 删除该盘点单下的所有资产数据
            var cacheKey = 'KeyCache+' + item.InventoryNo
            localStorage.removeItem(cacheKey);

            this.loadData()
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

        itemClick(item) {
            var itemDataJson = JSON.stringify(item);
            localStorage.setItem('ItemData', itemDataJson);
            this.$f7router.navigate('/detailAssetcheck/');
        }


    },
    components: {
        scroll,
        AssetCheckItem,
    }
}
</script>
<style scoped>
</style>
