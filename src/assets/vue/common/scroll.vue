<template lang="html">
    <cube-scroll :item="items" ref="scroll" :options="options" @pulling-down="pullingDown" @pulling-up="pullingUp">
        <!-- <li v-for="item in items" class="food-item border-1px">
            <slot></slot>
        </li> -->



        <slot></slot>
    </cube-scroll>
</template>

<script>
export default {

    props: ['items', 'onPullingDown', 'onPullingUp'],

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
