<template lang="html">
    <div class="measure-item" @click='itemClicks'>
        <div class="item-content-left">
            <div class="item-content-title">
                {{item.SBMC}}
            </div>
            <div class="item-content-subtitle">
                设备编号: {{item.SBBH}}
            </div>
            <div class="item-content-subtitle">
                使用科室: {{item.SYKSMC}}
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
                this.itemClick();
            }
        }
    }
}
</script>

<style lang="css">
</style>
