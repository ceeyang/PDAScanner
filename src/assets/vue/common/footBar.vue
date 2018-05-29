<template>
    <f7-toolbar tabbar labels class="common-footbar">

          <f7-link :class="[(select=='chats')?'is-selected':'']" href="/chats/" :animate="false" >
               <i class="f7-icons">chats</i>
               <span class="tabbar-label">消息</span>
          </f7-link>
          <f7-link :class="[(select=='home')?'is-selected':'']" href="/" :animate="false" >
              <i class="f7-icons">home</i>
              <span class="tabbar-label">主页</span>
          </f7-link>
          <f7-link :class="[(select=='mine')?'is-selected':'']" href="/mine/" :animate="false" >
              <i class="f7-icons">personal</i>
              <span class="tabbar-label">我的</span>
          </f7-link>

    </f7-toolbar>
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
            this.selected = this.select
        },
        created() {

        },
        methods: {

        },
        props: ['select']
    }
</script>
