<template lang="html">

    <!-- 申请报修 -->
    <f7-page class="apply-repair-page">
        <!-- Nav  -->
        <f7-navbar backLink :title="scanRepairStore.mViewType=='apply'?'申请报修':'查看详情'"></f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <information-cell title="资产名称" :value="scanRepairStore.mEquModel.EquName"></information-cell>
                        <information-cell title="资产编号" :value="scanRepairStore.mEquModel.EquCode"></information-cell>
                        <information-cell title="规格型号" :value="scanRepairStore.mEquModel.EquType"></information-cell>
                        <information-cell title="序 列 号" :value="scanRepairStore.mEquModel.EquType"></information-cell>
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">报修信息</div>
                <input-cell type="DataInput" title="报修科室" placeholder="请选择报修科室" :value="scanRepairStore.departmentData.DepaName" :inputClickAction="departmentInputClick"></input-cell>
                <input-cell type="DataInput" title="报修人员" placeholder="请选择报修人员" :value="scanRepairStore.mRepairUser.UserName" :inputClickAction="repairUserInputClick"></input-cell>
                <input-cell title="报修电话" placeholder="请输入报修电话" v-model="scanRepairStore.mRepairNumber"></input-cell>
                <input-cell title="报修地址" placeholder="请输入报修地址" v-model="scanRepairStore.mRepairLocation"></input-cell>
                <input-cell type="DataInput" title="故障问题" placeholder="请选择故障问题" :value="scanRepairStore.mProblemData.QuestionTypeName" :inputClickAction="repairProblemInputClick"></input-cell>
            </div>

            <div class="content-bottom">
                <div class="content-header">故障描述</div>
                <cube-textarea v-model="scanRepairStore.mProblemDes"></cube-textarea>
            </div>

            <div class="content-bottom">
                <div class="content-header">备注</div>
                <cube-textarea v-model="scanRepairStore.mRemark"></cube-textarea>
            </div>


        </div>

        <cube-button v-show="isOriginHei" v-if="scanRepairStore.mViewType=='apply'" @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import SelectedInput from '../../../common/selectedinput.vue';
import InformationCell from '../../../common/InformationCell.vue';

import {
    mapState,
    mapActions,
} from 'vuex';

export default {

    data() {
        return {
            // 页面类型 : 1. apply 申请页面; 2. check 查看页面
            viewType: '',

            itemData: [],

            username: '',

            // 故障问题 title 数组
            problemNameArr: [],

            problemDes: '',


            repairUsersNameArr: [],
            repairUsersArr: [],
            repairUser: [],

            value: "",

            isOriginHei: true,
            screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要），
            originHeight: document.body.clientHeight, //默认高度在watch里拿来做比较

        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
            'StoreSearch'
        ])
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData
        console.log(itemData);

        this.username = localStorage.UserName

        this.viewType = localStorage.repairViewType

        /// 判断当前是否选择了报修用户, 如果没有, 则设置当前登录用户为默认报修人员
        if (this.scanRepairStore.mRepairUser.UserCode == "" ||
            this.scanRepairStore.mRepairUser.UserCode == null) {
            this.scanRepairStore.mRepairUser.UserCode = localStorage.account
            this.scanRepairStore.mRepairUser.UserName = localStorage.UserName
        }

        const that = this
        window.onresize = () => {
            return (() => {
                window.screenHeight = document.body.clientHeight
                that.screenHeight = window.screenHeight
            })()
        }
    },

    watch: {
        screenHeight(val) {
            if (this.originHeight != val) {
                this.isOriginHei = false;
            } else {
                this.isOriginHei = true;
            }
        },
    },

    methods: {

        // 科室选择输入框点击
        departmentInputClick() {
            this.StoreSearch.mType = "department"
            this.$f7router.navigate(`/SearchItemView/`)
        },

        // 报修人员输入框点击事件
        repairUserInputClick() {
            this.StoreSearch.mType = "user"
            this.$f7router.navigate("/SearchItemView/")
        },

        repairProblemInputClick() {
            this.StoreSearch.mType = "problem"
            this.$f7router.navigate("/SearchItemView/")
        },


        problemItemClickAction(title) {
            console.log(title);
        },

        problemInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        NavBack() {
            this.$f7router.back()
        },

        // 遍历用户模型列表取出名称
        parseUsers() {
            this.repairUsersNameArr = []
            var nameArr = []
            for (var i = 0; i < this.repairUsersArr.length; i++) {
                nameArr.push(this.repairUsersArr[i].UserName)
            }
            this.repairUsersNameArr = nameArr
        },

        searchItemClickAction(data, event) {
            this.currentSelecteInputData = []
            for (var i = 0; i < this.repairUsersArr.length; i++) {
                if (this.repairUsersArr[i].UserName == data) {
                    this.repairUser = this.repairUsersArr[i]
                }
            }
        },

        inputSearchAction(searchvalue) {

            let params = {
                'QueryText': searchvalue,
                'UserCode': localStorage.account,
                'PageIndex': 1,
                'PageSize': 100,
            };

            let vm = this;
            this.get(this.api.getRepaitUsers, params, function(response) {
                console.log(params);
                var data = JSON.parse(response);
                if (data.Status) {
                    vm.repairUsersArr = data.AssignUserList;
                    vm.parseUsers()
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
            });
        },

        onblur() {

        },

        applyButtonAction() {

            if (this.scanRepairStore.departmentData.DepaCode == "" || this.scanRepairStore.departmentData.DepaCode == null) {
                if (!this.toastCenter) {
                    this.toastCenter = this.$f7.toast.create({
                        text: "请选择报修科室",
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                this.toastCenter.open();
                return
            }

            if (this.scanRepairStore.mRepairUser.UserCode == "" || this.scanRepairStore.mRepairUser.UserCode == null) {
                if (!this.toastCenter) {
                    this.toastCenter = this.$f7.toast.create({
                        text: "请选择报修人员",
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                this.toastCenter.open();
                return
            }

            if (this.scanRepairStore.mProblemData.QuestionTypeCode == "" || this.scanRepairStore.mProblemData.QuestionTypeCode == null) {
                if (!this.toastCenter) {
                    this.toastCenter = this.$f7.toast.create({
                        text: "请选择故障问题",
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                this.toastCenter.open();
                return
            }

            let params = {
                "EquId": this.itemData.EquCode,
                "EquName": this.itemData.EquName,
                "Store": localStorage.storeId,
                "RepairUserId": this.scanRepairStore.mRepairUser.UserCode,
                "DepartmentId": this.scanRepairStore.departmentData.DepaCode,
                "DepartmentName": this.scanRepairStore.departmentData.DepaName,
                "RepairPhone": this.scanRepairStore.mRepairNumber,
                "FaultId": this.scanRepairStore.mProblemData.QuestionTypeCode,
                "FaultName": this.scanRepairStore.mProblemData.QuestionTypeName,
                "FaultDesription": this.scanRepairStore.mProblemDes,
                "Remark": this.scanRepairStore.mRemark,
                "RepairAddress": this.scanRepairStore.mRepairLocation,
            }

            let vm = this;
            let URL = this.api.applyRepair
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);

                let msg = data.Msg;
                if (data.Status) {
                    vm.$f7router.back()
                } else {

                }

                var type = data.Status ? "correct" : "error"
                const toast = vm.$createToast({
                    time: 0,
                    txt: msg,
                    type: type,
                    time: 2000,
                    mask: true,
                    onTimeout: () => {
                        toast.hide()
                    }
                })
                toast.show()
            });

        },

        itemClick() {

        },

        switchTab(index) {
            this.currentIndex = index;
        },

        onPullingDown(scroll) {
            console.log('pullingDown: ' + scroll);
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },

        onPullingUp(scroll) {
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },
    },


    components: {
        scroll,
        RepairItem,
        InputCell,
        SelectedInput,
        InformationCell,
    }
}
</script>

<style lang="css">
</style>
