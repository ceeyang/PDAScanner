<template lang="html">
    <div class="measure-item" @click='itemClicks'>

        <i class="iconfont item-content-left">&#xe62a;</i>

        <div class="item-content-centern">
            <div class="item-content-title">
                {{item.EquName}}
            </div>
            <div class="item-content-subtitle">
                设备编号: {{item.EquCode}}
            </div>
            <div class="item-content-subtitle">
                购入日期: {{item.BuyDate}}
            </div>
        </div>


        <div class="item-content-right">
            <template v-if="className=='readyrepair'">
                <i class="iconfont">&#xe617;</i>
            </template>
            <template v-else>
                <i class="iconfont">&#xe64a;</i>
            </template>
        </div>
    </div>
</template>

<script>
export default {

    props: ['item', 'itemClick', 'className'],

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        itemClicks() {
            if (this.itemClick) {
                let itemDataJson = JSON.stringify(this.item);
                localStorage.setItem('ItemData',itemDataJson);
                this.itemClick(this.item);
            }
        }
    }
}
</script>

<style lang="css">
</style>
