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
                证书编号: {{item.ZSBH}}
            </div>
        </div>
        <div class="item-content-right">
            <div class="item-content-status">
                {{item.status == 0 ? "未完成" : "已完成"}}
            </div>
            <i class="iconfont">&#xe64a;</i>
        </div>
    </div>
</template>

<script>
export default {

    props: ['item', 'itemClick'],

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        itemClicks() {
            if (this.itemClick) {
                // localStorage.measureItem = this.item;
                let itemDataJson = JSON.stringify(this.item);
                console.log(itemDataJson);
                localStorage.setItem('measureItemData',itemDataJson);
                this.itemClick();
            }
        }
    }
}
</script>

<style lang="css">
</style>
