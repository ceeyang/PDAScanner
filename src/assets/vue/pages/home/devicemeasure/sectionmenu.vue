<template lang="html">
    <div class="menu-list-view">
        <f7-list class="list menu-left-list">
            <template v-for='(item,index) in MenuData' :index='index' :item='item'>
                <f7-list-item :title="item.name"></f7-list-item>
            </template>
        </f7-list>
        <f7-list class="menu-right-list">

        </f7-list>
    </div>
</template>

<script>
import TestMenuData from './json/menu.json';
export default {
    data() {
        return {
            MenuData: [],
        }
    },

    mounted() {
        console.log(TestMenuData);
        this.MenuData = TestMenuData;
    },

    methods: {

    },


}
</script>

<style lang="css">
</style>
