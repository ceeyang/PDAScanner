<template lang="html">
    <f7-page class="search-items-page">
        <!-- Nav  -->
        <f7-navbar backLink :title="title"></f7-navbar>

        <!-- 输入框 -->
        <input class="search-input" v-model='StoreSearch.mSearchvalue' @keyup='search($event)' placeholder="🔍 搜索" @blur.prevent="onblur" />


        <template v-if="StoreSearch.mSearchdDataTitles.length > 0">
            <cube-scroll class="list-module" :item="StoreSearch.mSearchdDataTitles">
                <li else v-for="(item,index) in StoreSearch.mSearchdDataTitles" @click="itemClick(item,$event)" :key="index" :item="item">
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
import PartsItem from '../../../common/PartsItem'
import { mapState, mapActions} from 'vuex';
export default {
    data () {
        return {
            title: "请选择配件",
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

        else if (this.StoreSearch.mType == "user") {
            this.title = "请选择报修人员"
        }

        else if (this.StoreSearch.mType == "problem") {
            this.title = "请选择故障问题"
        }

        else if (this.StoreSearch.mType == "Part") {
            this.title = "请选择配件"
        }


        this.search()
    },

    methods: {
        ...mapActions([
            'searchValue',

            // repairing
            'addUser'

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
                    let item = this.StoreSearch.mSearchData[i]
                    if (item.UserName == data) {
                        this.StoreSearch.mValue = item
                        this.scanRepairStore.mRepairUser = item

                        // 设置 维修派单 回调
                        this.RepairStore.mSearchRepairUser = item

                        // 设置 维修中,新增维修人员 回调
                        if (this.StoreSearch.mCallbackType == "Repairing_AddUser") {
                            this.addUser(item).then((res)=>{

                            })
                        }

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

                // 配件列表
                else if (this.StoreSearch.mType == "Part") {
                    itemName = this.StoreSearch.mSearchData[i].QuestionTypeName // !!!
                    if (itemName == data) {
                        this.StoreSearch.mValue = this.StoreSearch.mSearchData[i]
                        this.RepairStore.mCurrentRepairType = this.StoreSearch.mSearchData[i]
                        break
                    }
                }
            }
            this.$f7router.back()
        },
    },

    components: {
        PartsItem,
    }
}
</script>

<style lang="css">
</style>
