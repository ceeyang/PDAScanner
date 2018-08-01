<template lang="html">
    <div class="asset-item" @click='itemClicks'>


        <i class="iconfont item-content-left">&#xe6e2;</i>

        <div class="item-content-middle">

            <div class="item-content-title">
                {{item.AssetName}}
            </div>
            <div class="item-content-subtitle">
                资产编号: {{item.AssetNo}}
            </div>
            <div class="item-content-subtitle">
                资产状态: {{item.AssetStateName}}
            </div>
            <div class="item-content-subtitle">
                使用科室: {{item.DepartmentName}}
            </div>
            <div class="item-content-subtitle">
                规格型号: {{item.DepartmentName}}
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
                this.itemClick(this.item)
            }
        }
    }
}
</script>

<style lang="css">
</style>
