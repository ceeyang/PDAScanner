<template lang="html">
    <cube-scroll class="common-scroll" :item="items" ref="scroll" :options="fresh?options:noFreshOptions" @pulling-down="pullingDown" @pulling-up="pullingUp">
        <slot></slot>

        <!-- 刷新列表里显示没有更多数据 -->
        <div v-if="fresh">
            <div class="no-more-data-hint" v-if="!items || items.length < 1">
                一 没有更多啦 一
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
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: 'Refresh success'
                },
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: 'Load more',
                        noMore: 'No more data'
                    }
                }
            },

            noFreshOptions: {

            },

        }
    },

    methods: {
        pullingDown() {
            // console.log('onPullingDown');
            // setTimeout(() => {
            //     if (Math.random() > 0.5) {
            //         // If have new data, just update the data property.
            //         this.items.unshift('I am new data: ' + +new Date())
            //         this.$refs.scroll.forceUpdate()
            //     } else {
            //         // If no new data, you need use the method forceUpdate to tell us the load is done.
            //         this.$refs.scroll.forceUpdate()
            //     }
            // }, 1000)\


            if (this && this.onPullingDown) {
                this.onPullingDown(this.$refs.scroll)
            }

        },

        pullingUp() {
            // console.log('up');
            // // Mock async load.
            // setTimeout(() => {
            //     if (Math.random() > 0.5) {
            //         // If have new data, just update the data property.
            //         let newPage = [
            //             'I am line ' + ++this.itemIndex,
            //             'I am line ' + ++this.itemIndex,
            //             'I am line ' + ++this.itemIndex,
            //             'I am line ' + ++this.itemIndex,
            //             'I am line ' + ++this.itemIndex
            //         ]
            //
            //         this.items = this.items.concat(newPage)
            //         this.$refs.scroll.forceUpdate()
            //     } else {
            //         // If no new data, you need use the method forceUpdate to tell us the load is done.
            //         this.$refs.scroll.forceUpdate()
            //     }
            // }, 1000)

            if (this && this.onPullingUp) {
                this.onPullingUp(this.$refs.scroll)
            }
        },
    }


}
</script>
