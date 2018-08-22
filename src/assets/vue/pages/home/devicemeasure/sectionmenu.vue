<template lang="html">
    <div class="menu-list-view">
        <cube-scroll class="menu-left-list" :data="leftDataArr" @click='leftItemTapAction'></cube-scroll>
        <cube-scroll class="menu-right-list" :data="rightItemNameArr" @click='rightItemTapAction'></cube-scroll>
    </div>
</template>

<script>
//import TestMenuData from './json/menu.json';
export default {

    props: ['rightItemTapAction'],

    data() {
        return {
            menuData:[],
            rightItemArr: [],
            leftDataArr: [],
            rightItemNameArr: [],
        }
    },

    mounted() {

        // this.menuData = TestMenuData;
        this.leftDataArr = this.getFirstLeavelData();

    },

    methods: {
        getFirstLeavelData() {
            console.log(this.menuData);
            var arr = [];
            for (var i = 0; i < this.menuData.length; i++) {
                let item = this.menuData[i];
                arr.push(item.name);
            }
            return arr;
        },

        leftItemTapAction(item) {
            console.log(item);
            this.rightItemNameArr = [];
            var arr = [];
            for (var i = 0; i < this.menuData.length; i++) {
                if (this.menuData[i].name == item) {
                    arr = this.menuData[i].children;
                    continue;
                }
            }
            for (var i = 0; i < arr.length; i++) {
                this.rightItemNameArr.push(arr[i].name);
            }
        },

    },


}
</script>

<style lang="css">
</style>
