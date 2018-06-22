<template lang="html">
    <div class="measure-item">
        <div class="item-content-left">
            <div class="item-content-title">
                {{title}}
            </div>
            <div class="item-item-subtitle">
                {{subtitle}}
            </div>
            <div class="item-item-subtitle">
                {{subtitle1}}
            </div>
        </div>
        <div class="item-content-right">
            <i class="iconfont">&#xe64a;</i>
        </div>
    </div>
</template>

<script>
export default {

    props: ['title', 'subtitle', 'subtitle1'],

    data() {
        return {

        }
    }
}
</script>

<style lang="css">
</style>
