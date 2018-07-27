<template lang="html">
    <div class="measure-item" >
        <i class="iconfont item-content-left" @click='itemClicks'>&#xe62a;</i>

        <div class="item-content-centern" @click='itemClicks'>
            <div class="item-content-subtitle">
                记录行号: {{item.LineNumber}}
            </div>
            <div class="item-content-subtitle">
                维修时间: {{item.RepairTime}}
            </div>
            <div class="item-content-subtitle">
                记录标志: {{item.RepairMark}}
            </div>
            <div class="item-content-subtitle">
                维修结果: {{item.RepairResult}}
            </div>
            <div class="item-content-subtitle">
                配件状态: {{item.RepairResult}}
            </div>
        </div>

        <div class="item-content-right" @click='itemDeleteBtnClicks'>
            <i class="iconfont">&#xe628;</i>
        </div>

    </div>
</template>

<script>
export default {

    props: ['item', 'itemClick', 'itemDeleteBtnClick'],

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
        },

        itemDeleteBtnClicks() {
            if (this.itemClick) {
                let itemDataJson = JSON.stringify(this.item);
                localStorage.setItem('ItemData',itemDataJson);
                this.itemDeleteBtnClick(this.item);
            }
        }
    }
}
</script>

<style lang="css">
</style>
