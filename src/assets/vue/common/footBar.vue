<template>
    <div class="home-foot">

        <div class="top-line"></div>

        <div class="foot-content">
            <a class="tabbar-item" :class="[(select=='chats')?'is-selected':'']" @click="switchFootBar('chats')">
                <i class="f7-icons">chats_fill</i>
                <span class="tabbar-label">消息</span>
            </a>
            <a class="tabbar-item" :class="[(select=='home')?'is-selected':'']" @click="switchFootBar('home')">
                <i class="f7-icons">home_fill</i>
                <span class="tabbar-label">主页</span>
            </a>
            <a class="tabbar-item" :class="[(select=='mine')?'is-selected':'']" @click="switchFootBar('mine')">
                <i class="f7-icons">persons</i>
                <span class="tabbar-label">我的</span>
            </a>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                selected: 'home',
                flag:0
            }
        },
        components: {}
        ,
        computed: {

        },
        mounted() {

        },
        created() {

        },
        methods: {
            switchFootBar(val){
                let _this = this
                if ('chats' === val) {
                    this.$f7router.navigate('/chats/', {"animate": false});
                } else if ('home' === val) {
                    _this.$f7router.navigate('/home/', {"animate":false, "reloadPages": true});
                } else if ('mine' == val) {
                    _this.$f7router.navigate('/mine/', {"animate":false, "stackPages": true});
                }
            }
        },
        props: ['select']
    }
</script>
