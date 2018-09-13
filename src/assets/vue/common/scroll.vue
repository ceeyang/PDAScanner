<template lang="html">
    <cube-scroll class="common-scroll" :item="items" ref="scroll" :options="fresh?options:noFreshOptions" @pulling-down="pullingDown" @pulling-up="pullingUp">
        <slot></slot>

        <!-- 刷新列表里显示没有更多数据 -->
        <div v-if="fresh">
            <div class="no-more-data-hint" v-if="!items || items.length < 1">
                <img src="../../images/NoMoreData.png">
            </div>
        </div>
    </cube-scroll>
</template>

<script>
export default {

    props: [
        'items',  // 数据源
        'fresh',  // 是否需要刷新
        'onPullingDown', // 下拉刷新事件
        'onPullingUp' // 上啦刷新事件
    ],

    data() {
        return {

            options: {
                scrollbar: true,
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: '刷新成功'
                },
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: '加载更多',
                        noMore: '没有更多啦'
                    }
                }
            },

            noFreshOptions: {

            },

        }
    },

    methods: {
        pullingDown() {

            if (this && this.onPullingDown) {
                this.onPullingDown(this.$refs.scroll)
            }

        },

        pullingUp() {

            if (this && this.onPullingUp) {
                this.onPullingUp(this.$refs.scroll)
            }
        },
    }


}
</script>
