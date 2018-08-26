<template lang="html">
    <div class="parts-item-cell" @click='itemClicks'>

        <div class="item-content-title">
            一次性导管
        </div>

        <!-- 下面的视图 -->
        <div class="item-content-bottom">

            <div class="content-size">
                规格: G520
            </div>

            <div class="content-unit">
                单位: 个
            </div>

            <div class="content-count">
                数量: 1
            </div>

            <div class="content-price">
                ¥ 300
            </div>

            <div class="item-content-right">
                <i class="iconfont">&#xe64a;</i>
            </div>

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
                localStorage.setItem('ItemData',itemDataJson);
                this.itemClick();
            }
        }
    }
}
</script>

<style lang="css">
</style>
