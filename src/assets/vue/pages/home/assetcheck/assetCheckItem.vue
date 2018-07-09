<template lang="html">
    <div class="asset-checkou-item" @click='itemClicks'>


        <i class="iconfont item-content-left">&#xe62a;</i>

        <div class="item-content-middle">

            <div class="item-content-title">
                单号: {{item.InventoryNo}}
            </div>
            <div class="item-content-subtitle">
                盘点人: {{item.InventoryUserName}}
            </div>
        </div>

        <div class="item-content-right">
            <i class="iconfont">&#xe64a;</i>
        </div>

    </div>
</template>

<script>
export default {

    // type :  列表类型
    // 默认 普通类型,  0 搜索列表的 item
    props: ['item', 'itemClick', 'type'],

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        itemClicks() {
            if (this.itemClick) {

                // 本地资产盘点信息

                if (this.type && this.type == '0') {
                    var localAssetArr = []
                    if (localStorage.localAssetArr) {
                        localAssetArr = JSON.parse(localStorage.localAssetArr);
                    }

                    var inNotExist = true
                    if (localAssetArr.length > 0) {
                        for (var i = 0; i < localAssetArr.length; i++) {
                            if (localAssetArr[i].InventoryNo == this.item.InventoryNo) {
                                console.log('sssssssssssssssssss');
                                const toast = this.$createToast({
                                    time: 0,
                                    type: 'error',
                                    txt: '该单号已经存在了!',
                                })
                                toast.show()
                                setTimeout(function () {
                                    toast.hide()
                                }, 2000);

                                inNotExist = false
                                continue
                            }
                        }
                    }

                    if (inNotExist) {
                        localAssetArr.push(this.item)
                        let localAssetArrData = JSON.stringify(localAssetArr);
                        localStorage.setItem('localAssetArr',localAssetArrData);
                    }

                }

                // 默认类型, 普通 cell
                else {
                    let itemDataJson = JSON.stringify(this.item);
                    localStorage.setItem('ItemData',itemDataJson);
                }

                this.itemClick()

            }
        }
    }
}
</script>

<style lang="css">
</style>
