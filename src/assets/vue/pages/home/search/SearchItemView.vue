<template lang="html">
    <f7-page class="search-items-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title :title='title'></f7-nav-title>
        </f7-navbar>

        <!-- 输入框 -->
        <input class="search-input" v-model='StoreSearch.mSearchvalue' @keyup='search($event)' placeholder="🔍搜索" @blur.prevent="onblur" />

    </f7-page>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
    data () {
        return {
            title: "搜索",
        }
    },


    computed: {
        ...mapState([
            'StoreSearch',
        ])
    },

    mounted() {
        this.title = this.StoreSearch.mTitle
    },

    methods: {
        NavBack() {
            this.$f7router.back()
        },

        onblur() {
            console.log('onblur');
            this.searchData = []
        },

        search: function(e) {
            console.log(this.StoreSearch.mSearchvalue);
        },
    },
}
</script>

<style lang="css">
</style>
