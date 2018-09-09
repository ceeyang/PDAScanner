<template lang="html">
    <f7-page class="approve-detail-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修详情'></f7-nav-title>
        </f7-navbar>

        <cube-scroll class="repairing-content" :item="mSectionHeaderTitles">
            <li v-for="(item,index) in mSectionHeaderTitles" :key="index" :item="item">
                <!-- 设备信息 -->
                <div v-if="index==0" class="content-top">
                    <div class="content-header">{{item}}</div>
                    <information-cell title="资产名称" :value="StoreApprove.mCurrentApprove.AssetName"></information-cell>
                    <information-cell title="资产编号" :value="StoreApprove.mCurrentApprove.EquCode"></information-cell>
                    <information-cell title="所属科室" :value="StoreApprove.mCurrentApprove.DepartmentName"></information-cell>
                    <information-cell title="报修时间" :value="StoreApprove.mCurrentApprove.RepairData"></information-cell>

                    </div>
                </div>

                <!-- 配件明细 -->
                <div v-if="index==1" class="content-parts">
                    <div class="content-header">{{item}}</div>
                    <div class="content-parts-content">
                        <template v-if="StoreApprove.mCurrentPartsList==false">
                            <div class="parts-empty">暂无维修配件</div>
                        </template>
                        <template v-else v-for="(part, index) in StoreApprove.mCurrentPartsList"><parts-item :item="part"></parts-item></template>
                    </div>
                </div>


                <!-- 维修费用 -->
                <div v-if="index==2" class="content-price">
                    <div class="content-header">{{item}}</div>
                    <information-cell title="配件费用" :value="StoreApprove.mApprovePartsTotalPrice + '元'"></information-cell>
                    <information-cell title="维修费用" :value="StoreApprove.mCurrentApprove.RepairFee + '元'"></information-cell>
                    <information-cell title="总的费用" :value="StoreApprove.mApproveTotalPrice + '元'"></information-cell>
                </div>

                <!-- 审核流程 -->
                <div v-if="index==3" class="content-users">
                    <div class="content-header">{{item}}</div>
                    <template v-if="StoreApprove.mAuiitorList==false">
                        <div class="parts-empty">暂无审核流程</div>
                    </template>
                    <template v-else v-for="(item, index) in StoreApprove.mAuiitorList">
                        <auditor-item :item="item"></auditor-item>
                    </template>
                </div>

                <!-- 审核意见 -->
                <div v-if="index==4" class="content-des">
                    <div class="content-header">{{item}}</div>
                    <cube-textarea v-model="StoreApprove.mAuditAdvice"></cube-textarea>
                </div>
            </li>
        </cube-scroll>

        <div class="approve-bottom-buttons">
            <cube-button class="bottom-btn" @click="approveButtonAction">同意</cube-button>
            <cube-button class="bottom-btn" @click="ignoreButtonAction">拒绝</cube-button>
        </div>
    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import InformationCell from '../../../common/InformationCell'
import PartsItem from '../../../common/PartsItem'
import Picker from '../../../common/picker.vue';
import AuditorItem from './AuditorItem'

import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';

export default {

    data() {
        return {
            mSectionHeaderTitles: ['等待我的审批', '配件信息', '维修费用', '审批流程', '审批意见'],

            // code by yangxichuan
            // 此处需要设置该值的来
            mPartsItemArr: [],

            mPartsPrices: '300',

            mCurrentSelectedType: '',
        }
    },

    computed: {
        ...mapState([
            'StoreApprove',
        ])
    },

    watch: {
        falutDes: function(newValue) {
            console.log(newValue);
        },
    },

    mounted() {

        this.getApproveAuditorList()

        // 初始化维修记录
        this.getApprovePartList()

    },

    methods: {

        ...mapActions([

            /// 获取维修配件列表
            'getApprovePartList',

            /// 获取维修处理人员记录
            'getApproveAuditorList',

            /// 审核同意
            'requestRepairAudit',
        ]),

        /**
         * 保存按钮点击事件
         */
        submitButtonDidClick() {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            this.submitApproval().then((res) => {
                toast.hide()
            })
        },

        /**
         * 返回
         */
        NavBack() {
            this.$f7router.back()
        },


        /**
         * 同意审批
         */
        approveButtonAction() {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            const self = this;
            this.requestRepairAudit(1).then((res) => {
                toast.hide()

                if (!self.toastCenter) {
                    self.toastCenter = self.$f7.toast.create({
                        text: res.Msg,
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                self.toastCenter.open();

                if (res.Status) {
                    self.$f7router.back()
                }
            })
        },

        /**
         * 拒绝审批
         */
        ignoreButtonAction() {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            const self = this;
            this.requestRepairAudit(2).then((res) => {
                toast.hide()

                if (!self.toastCenter) {
                    self.toastCenter = self.$f7.toast.create({
                        text: res.Msg,
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                self.toastCenter.open();

                if (res.Status) {
                    self.$f7router.back()
                }
            })
        },

    },


    components: {
        scroll,
        InformationCell,
        InputCell,
        PartsItem,
        AuditorItem,
    }
}
</script>

<style lang="css">
</style>
