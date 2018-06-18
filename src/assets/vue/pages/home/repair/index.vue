<template lang="html">
    <f7-page class="repair-manager-page">
        <!-- Nav  -->
        <f7-navbar title="维修处理" back-link="Back"></f7-navbar>



        <scroll class="repair-scroll" :onfresh='onfresh'>
            <!-- <div class="repair-nav-items">
                <repair-item text="维修派工" :href='/scanrepair/'> <i class="f7-icons">camera</i> </repair-item>
                <repair-item text="维修接单" :href='/scanrepair/'> <i class="f7-icons">camera</i> </repair-item>
                <repair-item text="维修处理" :href='/scanrepair/'> <i class="f7-icons">camera</i> </repair-item>
            </div> -->

            <f7-list media-list  v-for="(item,index) in data.rows" :key="index" :item="item">
                <f7-list-item
                link="/home/"
                :text=item.SBMC
                >
                    <div slot="root-start">申请单号: {{item.SBBH}}</div>
                    <div slot="root">最后报修时间: 2018-06-18 03:00:58</div>
                    <!-- <div slot="content-start">{{item.SBMC}}</div> -->
                    <!-- <div slot="content">Content End</div> -->
                    <!-- <div slot="media-start">Media Start</div> -->
                    <!-- <div slot="media">{{item.SBMC}}</div> -->
                    <!-- <span slot="after-start">After Start</span> -->
                    <!-- <span slot="after">After End</span> -->
                    <div slot="inner-start">{{item.SBMC}}</div>
                    <div slot="inner">维修状态: {{item.WXPHONE || '暂无维修状态'}}</div>
                    <!-- <div slot="before-title">Before Title</div>
                    <div slot="after-title">After Title</div> -->
                </f7-list-item>
            </f7-list>

        </scroll>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import RepairItem from './repairitem.vue';
import data from './repair.json';
export default {

    data() {
        return {
            data: []
        }
    },

    mounted() {

        this.data = data;

    },

    methods: {
        onfresh() {
            let vm = this;
            setTimeout(function() {
                vm.data = data;
                vm.$f7.ptr.done();
            }, 2000);
        },
    },

    components: {
        scroll,
        RepairItem,
    }
}
</script>

<style lang="css">
</style>
