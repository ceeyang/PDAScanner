<template lang="html">
    <div class="asset-checkou-item">


        <i class="iconfont item-content-left" @click='itemClicks'>&#xe62a;</i>

        <div class="item-content-middle" @click='itemClicks'>

            <div class="item-content-title">
                单号: {{item.InventoryNo}}
            </div>
            <div class="item-content-subtitle">
                盘点人: {{item.InventoryUserName}}
            </div>
        </div>

        <div class="item-content-right" @click="rightBtnActions">
            <i v-if="type=='0'"  class="iconfont">&#xe64a;</i>
            <i v-else  class="iconfont">&#xe628;</i>
        </div>

    </div>
</template>

<script>
export default {

    // type :  列表类型
    // 默认 普通类型,  0 搜索列表的 item
    props: ['item', 'itemClick', 'rightBtnAction', 'type'],

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {

        rightBtnActions() {
            if (this.rightBtnAction) {
                this.rightBtnAction(this.item)
            }
        },
        itemClicks() {
            if (this.itemClick) {
                this.itemClick(this.item)
            }
        },
    }
}
</script>

<style lang="css">
</style>
