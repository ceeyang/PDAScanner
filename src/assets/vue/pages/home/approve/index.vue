<template>
<f7-page ptr @ptr:refresh="headerRefreshAction" infinite :infinite-distance="50" :infinite-preloader="showPreloader" @infinite="footerRefreshAction">

    <f7-navbar backLink title="我的审批"></f7-navbar>
    <f7-list media-list>
        <f7-list-item v-for="(item, index) in StoreApprove.mAuditList"
        :key="index"
        link="#"
        :title="item.AssetName"
        :subtitle="item.HandlingName"
        @click="itemclick(item)"
        >
            <img slot="media" src="../../../../images/home/IMG_Approve.png" width="80" />
            <p>{{item.RepairNo}}</p>
            <p>{{item.FaultDescription}}</p>

        </f7-list-item>

        <f7-block-footer>
            <p v-if="mNoMore==true" style="text-align: center">没有更多了</p>
            <p v-else style="text-align: center">下拉加载更多</p>
        </f7-block-footer>

    </f7-list>
</f7-page>
</template>


<script>
import {
    mapState,
    mapActions,
} from 'vuex';
export default {
    data() {
        return {

            mNoMore: true,

            allowInfinite: false,
            showPreloader: false,
        };
    },

    mounted() {
        this.getApproveList()
    },

    computed: {
        ...mapState([
            'StoreApprove',
        ])
    },

    methods: {

        ...mapActions([
            'getApproveList',
        ]),

        headerRefreshAction(event, done) {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            this.getApproveList().then((res) => {
                done();
                toast.hide()
            })
        },



        footerRefreshAction(event, done) {
            const self = this;
            setTimeout(() => {
                const picURL = `http://lorempixel.com/88/88/abstract/${Math.round(Math.random() * 10)}`;
                const song = self.songs[Math.floor(Math.random() * self.songs.length)];
                const author = self.authors[Math.floor(Math.random() * self.authors.length)];

                self.items.push({
                    title: song,
                    author,
                    img: picURL,
                });

                done();
            }, 1000);
        },

        itemclick(item) {
            this.StoreApprove.mCurrentApprove = item
            this.$f7router.navigate('/approveDetail/')
        },
    },
};
</script>
