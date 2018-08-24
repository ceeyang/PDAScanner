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
        <input class="search-input" v-model='StoreSearch.mSearchvalue' @keyup='search($event)' placeholder="🔍 搜索" @blur.prevent="onblur" />


        <template v-if="StoreSearch.mSearchdDataTitles.length > 0">
            <cube-scroll class="list-module" :item="StoreSearch.mSearchdDataTitles">
                <li v-for="(item,index) in StoreSearch.mSearchdDataTitles" @click="itemClick(item,$event)" :key="index" :item="item">
                    <span class="list-module-item">{{item}}</span>
                </li>
            </cube-scroll>
        </template>
        <template v-else>
            <img src="../../../../images/NoMoreData.png">
        </template>

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
            'scanRepairStore',
            'RepairStore',
        ])
    },

    mounted() {
        if (this.StoreSearch.mType == "department") {
            this.title = "请选择科室报修"
        }

        if (this.StoreSearch.mType == "user") {
            this.title = "请选择报修人员"
        }

        if (this.StoreSearch.mType == "problem") {
            this.title = "请选择故障问题"
        }

        this.search()
    },

    methods: {
        ...mapActions([
            'searchValue',
        ]),


        NavBack() {
            this.$f7router.back()
        },

        onblur() {
            console.log('onblur');
            this.searchData = []
        },

        search: function(e) {
            this.searchValue().then((res)=>{
                console.log(res);
            })
        },

        itemClick: function(data, event) {
            this.searchvalue = data;
            console.log('itemClick: ' + data);
            for (var i = 0; i < this.StoreSearch.mSearchData.length; i++) {

                var itemName = ""
                if (this.StoreSearch.mType == "department") {
                    itemName = this.StoreSearch.mSearchData[i].DepaName
                    if (itemName == data) {
                        this.StoreSearch.mValue = this.StoreSearch.mSearchData[i]
                        this.scanRepairStore.departmentData = this.StoreSearch.mSearchData[i]
                        break
                    }
                }

                else if (this.StoreSearch.mType == "user") {
                    itemName = this.StoreSearch.mSearchData[i].UserName
                    if (itemName == data) {
                        this.StoreSearch.mValue = this.StoreSearch.mSearchData[i]
                        this.scanRepairStore.mRepairUser = this.StoreSearch.mSearchData[i]

                        // 设置 维修派单 回调
                        this.RepairStore.mSearchRepairUser = this.StoreSearch.mSearchData[i]
                        break
                    }
                }

                else if (this.StoreSearch.mType == "problem") {
                    itemName = this.StoreSearch.mSearchData[i].QuestionTypeName
                    if (itemName == data) {
                        this.StoreSearch.mValue = this.StoreSearch.mSearchData[i]
                        this.scanRepairStore.mProblemData = this.StoreSearch.mSearchData[i]
                        break
                    }
                }
            }
            this.$f7router.back()
        },
    },
}
</script>

<style lang="css">
</style>
