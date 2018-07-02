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

        <cube-button v-if="segmentBarIndex==0" @click="applyButtonAction" class="apply-repair-bottom">申请维修</cube-button>

    </f7-page>
</template>

<script>

import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';

export default {

    data() {
        return {
            segmentBarIndex: 0,
            repairTitlesArr: [{
                "title": "设备名称",
                "name": "EquName",
                "value": "",
                "disabled": true,
            },{
                "title": "报修科室",
                "name": "DepartmentName",
                "value": "西药库",
                "disabled": true
            },
            {
                "title": "报修人员",
                "name": "RepairUserId",
                "value": "管理员",
                "disabled": true
            },
            {
                "title": "报修日期",
                "name": "BXRQ",
                "value": "2018-06-26",
                "disabled": false

            },
            {
                "title": "维修期限",
                "name": "WXQX",
                "value": "2019-06-26",
                "disabled": false
            },
            {
                "title": "资产编号",
                "name": "EquCode",
                "value": "68990500067",
                "disabled": true
            },
            {
                "title": "规格型号",
                "name": "SBXH",
                "value": "",
                "disabled": true
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
                "disabled": true
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

        this.segmentBarIndex = localStorage.segmentBarIndex;

        let itemData = JSON.parse(localStorage.ItemData);
        console.log(itemData);
        for (var item in itemData) {
            for (var i = 0; i < this.repairTitlesArr.length; i++) {
                let repair = this.repairTitlesArr[i];
                if (item == repair.name) {
                    repair.value = itemData[item];
                }
                this.repairTitlesArr[i] = repair;
            }
        }

    },

    methods: {

        // 失去焦点
        onblur() {

        },

        applyButtonAction() {
            const self = this;
            if (!self.toastCenter) {
                self.toastCenter = self.$f7.toast.create({
                    text: '申请成功',
                    closeTimeout: 2000,
                    position: 'center',
                });
            }
            self.toastCenter.open();

            this.$f7router.back();
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
