<template lang="html">
    <f7-page>

        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='资产报修'></f7-nav-title>
        </f7-navbar>

        <selected-input title="报修科室" :data="scanRepairStore.departmentNameList" placeholder="请添加科室" @itemClick="departmentSearchItemClickAction" @searchAction="departmentInputSearchAction"></selected-input>
        <selected-input title="资产名称" :data="scanRepairStore.EquNameList" placeholder="请添加资产" @itemClick="EquSearchItemClickAction" @searchAction="EquInputSearchAction"></selected-input>
        <selected-input title="故障问题" :data="scanRepairStore.problemNameList" placeholder="请输入故障问题" @itemClick="problemSearchItemClickAction" @searchAction="problemInputSearchAction"></selected-input>

        <cube-button @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>
    </f7-page>
</template>

<script>
import SelectedInput from '../../../common/selectedinput'
import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
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
        ]),

        NavBack() {
            this.$f7router.back()
        },

        EquSearchItemClickAction(equName){
            
        },

        EquInputSearchAction(searchvalue) {
            console.log(searchvalue);
            this.getEquDataList(searchvalue)
        },


        problemInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        problemSearchItemClickAction(problemName) {
            console.log(problemName);
        },

        departmentInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        departmentSearchItemClickAction(departmentName) {
            console.log(departmentName);
        },

        applyButtonAction() {

            var storeNumber = localStorage.storeId

            let params = {

                "EquId": this.EquData.EquCode,
                "EquName": this.EquData.EquName,
                "StoreNumber": '2',
                "Store": localStorage.storeId,
                "RepairUserId": localStorage.account,
                "RepairUserName": '', //
                "DepartmentId": this.departmentData.DepartmentId,
                "DepartmentName": this.departmentData.DepartmentName,
                "RepairStatus": '1',
                "ApplyDate": '', //
                "SupplierId": '',
                "SupplierName": '',
                "RepairTerm": '',
                "RepairPhone": '', //
                "FaultId": '', //
                "FaultDesription": '', //
                "Remark": '', //
                "RepairNo": '',
                "RepairNoReadonly": 'true',

            }


            let vm = this;
            let URL = this.api.applyRepair
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);

                let msg = data.Msg;
                if (data.Status) {

                } else {

                }

                var type = data.Status ? "success" : "error"
                const toast = vm.$createToast({
                    time: 0,
                    txt: msg,
                    type: type,
                    time: 2000,
                    onTimeout: () => {
                        toast.hide()
                    }
                })
                toast.show()
            });

        },

    },

    components: {
        SelectedInput,

    },
}
</script>

<style lang="css">
</style>
