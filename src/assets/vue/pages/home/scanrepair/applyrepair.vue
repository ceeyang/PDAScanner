<!--
申请设备维修页面
codeer: cee
2018-06-25 18:16:13
-->
<template lang="html">
    <f7-page class="apply-repair-page">
        <!-- Nav  -->
        <f7-navbar title="申请报修" back-link="Back"></f7-navbar>

        <scroll class="apply-repair-scroll" :items="repairTitlesArr">
            <li v-for="(item,index) in repairTitlesArr" :key="index" :item="item">
                <input-cell :title="item.title" :disabled="item.disabled" :onblur="onblur" v-model="item.value"></input-cell>
            </li>
        </scroll>

        <cube-button v-if="repairViewType=='apply'" @click="applyButtonAction" class="apply-repair-bottom">申请维修</cube-button>

    </f7-page>
</template>

<script>

import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';

export default {

    data() {
        return {
            // 页面类型, 因为有多个页面跳入此页面
            // apply: 申请维修
            // check: 查看详细
            //
            repairViewType: 0,

            repairTitlesArr: [{
                "title": "设备名称",
                "name": "EquName",
                "value": "",
                "disabled": false,
            },{
                "title": "报修科室",
                "name": "DepartmentName",
                "value": "",
                "disabled": false
            },
            {
                "title": "报修人员",
                "name": "RepairUserId",
                "value": "",
                "disabled": false
            },
            {
                "title": "报修日期",
                "name": "BXRQ",
                "value": "",
                "disabled": false

            },
            {
                "title": "维修期限",
                "name": "WXQX",
                "value": "",
                "disabled": false
            },
            {
                "title": "资产编号",
                "name": "EquCode",
                "value": "",
                "disabled": false
            },
            {
                "title": "规格型号",
                "name": "SBXH",
                "value": "",
                "disabled": false
            },
            {
                "title": "报修电话",
                "name": "BXDH",
                "value": "",
                "disabled": false
            },
            {
                "title": "维修状态",
                "name": "SBZT",
                "value": "",
                "disabled": false
            },
            {
                "title": "资产厂家",
                "name": "SBCJMC",
                "value": "",
                "disabled": false
            },
            {
                "title": "故障描述",
                "name": "GZMS",
                "value": "",
                "disabled": false
            }],
        }
    },

    mounted() {

        this.repairViewType = localStorage.repairViewType;

        if (localStorage.ItemData) {
            let itemData = JSON.parse(localStorage.ItemData);
            for (var item in itemData) {
                for (var i = 0; i < this.repairTitlesArr.length; i++) {
                    let repair = this.repairTitlesArr[i];
                    if (item == repair.name) {
                        repair.value = itemData[item];
                    }
                    this.repairTitlesArr[i] = repair;
                }
            }
        }
    },

    methods: {

        // 失去焦点
        onblur() {

        },

        getValueWithPropsName(name){
            let value = ''
            for (var i = 0; i < this.repairTitlesArr.length; i++) {
                let repair = this.repairTitlesArr[i];
                if (item == name) {
                    value = itemData[item];
                    continue
                }
                this.repairTitlesArr[i] = repair;
            }
            return value
        },

        applyButtonAction() {

            let params = {
                "EquId": '',
                "EquName": '',
                "StoreNumber": '',
                "Store": '',
                "RepairUserId": '',
                "RepairUserName": '',
                "DepartmentId": '',
                "DepartmentName": '',
                "RepairStatus": '',
                "ApplyDate": '',
                "SupplierId": '',
                "SupplierName": '',
                "RepairTerm": '',
                "RepairPhone": '',
                "FaultId": '',
                "FaultDesription": '',
                "Remark": '',
                "RepairNo": '',
                "RepairNoReadonly": '',
            }
            let vm = this;
            let URL = this.deviceStatus == 0 ? this.api.notRepairList : this.api.hadRepairedList
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);


                if (data.Status) {
                    console.log(data);
                } else {
                    let msg = data.Msg;
                    console.log(msg)
                }

                let msg = data.Msg;
                if (!vm.toastCenter) {
                    vm.toastCenter = vm.$f7.toast.create({
                        text: '申请成功',
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                vm.toastCenter.open();

                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate()
                }
            });
            vm.$f7router.back();
        },

        itemClick() {

        },

        switchTab(index) {
            this.currentIndex = index;
        },

        onPullingDown(scroll) {
            console.log('pullingDown: ' + scroll);
            setTimeout(function () {
                scroll.forceUpdate();
            }, 1000);
        },

        onPullingUp(scroll) {
            setTimeout(function () {
                scroll.forceUpdate();
            }, 1000);
        },
    },


    components: {
        scroll,
        RepairItem,
        InputCell
    }
}
</script>

<style lang="css">
</style>
