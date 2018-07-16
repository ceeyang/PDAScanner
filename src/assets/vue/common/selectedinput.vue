<template>
<div class="vue-selected-input">

    <div class="selecte-user-title">
        {{title}}
    </div>

    <div class="selecte-user-input">
        <!-- 输入框 -->
        <div class="search-input">
            <input class="search-text" v-model='searchvalue' @keyup='search($event)' :placeholder="placeholder" @blur.prevent="onblur" />
            <i class="search-icon iconfont">&#xe651;</i>
        </div>

        <ul class="list-module" v-show="searchData">
            <li v-for="(item,index) in searchData" @click="appClick(item,$event)" :key="index" :item="item">
                <span>{{item}}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            searchData: this.data,
            searchvalue: this.value,
        }
    },
    props: {
        'title': String,
        'data': Array,
        'value': String,
        'placeholder': String
    },

    watch: {
        data: function(newValue, oldValue) {
            this.searchData = newValue;
        }
    },
    methods: {
        onblur() {
            console.log('onblur');
            this.searchData = []
        },
        appClick: function(data, event) {
            this.searchvalue = data;
            console.log('itemClick: ' + data);
            this.$emit('itemClick', data, event);

        },
        search: function(e) {


            this.searchvalue = e.currentTarget.value;
            this.$emit('searchAction', this.searchvalue);

            console.log(this.searchvalue);
        },
    },
    mounted: function() {

    }
}
</script>

<style lang="scss" scoped>

</style>
