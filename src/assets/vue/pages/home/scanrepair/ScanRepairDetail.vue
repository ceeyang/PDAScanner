<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title="扫码报修"></f7-nav-title>
        </f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <div class="content-device-name">
                            {{scanRepairStore.mEquModel.EquName || "设备名称"}}
                        </div>
                        <div class="content-device-subname">
                            资产编号:  {{scanRepairStore.mEquModel.EquCode || "无"}}
                        </div>
                        <div class="content-device-subname">
                            规格型号:  {{scanRepairStore.mEquModel.EquType || "无"}}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import CommonCell from '../../../common/commonCell.vue';
import SelectedInput from '../../../common/selectedinput.vue';
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

        NavBack() {
            this.$f7router.back()
        },


    },


    components: {
        scroll,
        RepairItem,
        InputCell,
        SelectedInput,
        CommonCell
    }
}
</script>

<style lang="css">
</style>
