<template lang="html">
    <f7-page class="repairing-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修详情'></f7-nav-title>
        </f7-navbar>

        <div class="repairing-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">
                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <div class="content-device-name">
                            设备名称:  {{RepairStore.mCurrentRepair.EquName || "暂无名称"}}
                        </div>
                        <div class="content-device-subname">
                            报修科室:  {{RepairStore.mCurrentRepair.DepartmentName || "暂无科室"}}
                        </div>
                        <div class="content-device-subname">
                            维修单号:  {{RepairStore.mCurrentRepair.RepairNo || "暂无编号"}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-bottom">
                <div class="content-header-bottom">
                    <div class="content-header-title">
                        维修过程记录
                    </div>
                    <div class="content-add-button" @click="addClickAction">
                        <i class="iconfont">&#xe6df;</i>
                    </div>
                </div>
                <scroll :items="RepairStore.mCurrentRepairProcessList">
                    <li v-for="(item,index) in RepairStore.mCurrentRepairProcessList" :key="index" :item="item">
                        <repairing-item :item="item" :itemClick="repairingItemClick" :itemDeleteBtnClick="itemDeleteBtnClick"></repairing-item>
                    </li>
                </scroll>
            </div>
        </div>


    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import RepairingItem from "./RepairingItem.vue";


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
            'RepairStore',
        ])
    },

    watch: {
        falutDes: function(newValue){
            console.log(newValue);
        }
    },

    mounted() {

        // 初始化维修记录
        this.$store.dispatch('getRepairProcessList')
    },

    methods: {

        addClickAction() {
            this.$f7router.navigate("/NewRepairRecord/")
        },

        NavBack() {
            this.$f7router.back()
        },

        repairingItemClick(item) {
            console.log(item);
        },

        itemDeleteBtnClick(item) {
            let vm = this
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                content: '是否确认删除该条数据?',
                confirmBtn: {
                    text: '删除',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    vm.deleteItem(item)
                },
                onCancel: () => {

                }
            }).show()
        },

        deleteItem(item){

            // let tempArr = []
            // for (var i = 0; i < this.RepairStore.mCurrentRepairProcessList.length; i++) {
            //     if (this.RepairStore.mCurrentRepairProcessList.[i].LineNumber != itemd.LineNumber) {
            //         tempArr.push(this.RepairStore.mCurrentRepairProcessList.[i])
            //     }
            // }
            // this.RepairStore.mCurrentRepairProcessList = tempArr

            if (!this.toastCenter) {
                this.toastCenter = this.$f7.toast.create({
                    text: "删除成功, #^_^# ",
                    closeTimeout: 2000,
                    position: 'center',
                });
            }
            this.toastCenter.open();
        },

        onPullingDown(scroll) {

        },

        onPullingUp(scroll) {

        },
    },


    components: {
        RepairingItem,
        scroll
    }
}
</script>

<style lang="css">
</style>
