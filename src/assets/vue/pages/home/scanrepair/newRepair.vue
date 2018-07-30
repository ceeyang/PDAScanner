<template lang="html">
    <f7-page>

        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='新增资产报修'></f7-nav-title>
        </f7-navbar>

        <selected-input title="报修科室" :data="scanRepairStore.departmentNameList" placeholder="请添加科室" @itemClick="departmentSearchItemClickAction" @searchAction="departmentInputSearchAction"></selected-input>
        <selected-input title="资产名称" :data="scanRepairStore.EquNameList" placeholder="请添加资产名称" @itemClick="EquSearchItemClickAction" @searchAction="EquInputSearchAction"></selected-input>
        <selected-input title="资产编号" :data="scanRepairStore.EquCodeList" :value="scanRepairStore.EquData.EquCode" placeholder="请添加资产编号"></selected-input>
        <selected-input title="故障问题" :data="scanRepairStore.problemNameList" placeholder="请输入故障问题" @itemClick="problemSearchItemClickAction" @searchAction="problemInputSearchAction"></selected-input>
        <selected-input title="故障描述" :data="scanRepairStore.EquCodeList" :value="scanRepairStore.problemData.EquCode" placeholder="请添加故障描述"></selected-input>

        <cube-button @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>
    </f7-page>
</template>

<script>
import SelectedInput from '../../../common/selectedinput'
import {
    mapState,
    mapActions,
} from 'vuex';
export default {

    data() {
        return {

        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
        ])
    },

    mounted() {

    },

    methods: {
        ...mapActions([
            'getEquDataList',
            'applyRepair'
        ]),

        NavBack() {
            this.$f7router.back()
        },

        // 资产名称
        EquSearchItemClickAction(equName){
            console.log(equName);
            for (var i = 0; i < this.scanRepairStore.EquDataList.length; i++) {
                if (equName == this.scanRepairStore.EquDataList[i].EquName) {
                    this.scanRepairStore.EquData = this.scanRepairStore.EquDataList[i]
                    this.scanRepairStore.EquCodeValue = this.scanRepairStore.EquDataList[i].EquCode
                }
            }
        },

        EquInputSearchAction(searchvalue) {
            console.log(searchvalue);
            this.scanRepairStore.equSearchValue = searchvalue
            this.getEquDataList(searchvalue)
        },


        // 故障问题
        problemInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        problemSearchItemClickAction(problemName) {
            console.log(problemName);
        },

        // 科室名称
        departmentInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        departmentSearchItemClickAction(departmentName) {
            console.log(departmentName);
        },

        applyButtonAction() {
            this.applyRepair()
            let vm = this
            setTimeout(function () {
                vm.$f7router.back()
            }, 2000);
        },

    },

    components: {
        SelectedInput,

    },
}
</script>

<style lang="css">
</style>
