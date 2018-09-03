<template lang="html">
    <div class="parts-item-cell" @click='itemClicks'>

        <div class="item-content-title">
            {{item.PartsName}}
        </div>

        <!-- 下面的视图 -->
        <div class="item-content-bottom">

            <div class="content-size">
                规格: {{item.Size}}
            </div>

            <div class="content-unit">
                单位: {{item.Unit}}
            </div>

            <div class="content-count">
                数量: 1
            </div>

            <div class="content-price">
                ¥ {{parseMoney(item.Price)}}
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
        },

        parseMoney(value) {
            var stringS = String(value).split('.')
            return stringS[0]
        }
    }
}
</script>

<style lang="css">
</style>
