
<template>
    <f7-page>
        <f7-navbar title="资产列表" back-link=""></f7-navbar>
        <div class="beginAassetcheck-cont">
             <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>
        </div>
    </f7-page>
</template>
<script>
import SegmentBar from '../../../common/segmentBar';
    export default {
        data () {
            return {
                 titlesArray:['全部','未完成','已完成'],
                currentIndex:0,
                loading: false,
                loadMoreNot: true,
                firstLoad: true,
            }
        },
        mounted(){
           console.log(global.detailAssetchecked)
        },
        methods: {
             switchTab(index) {
                this.currentIndex = index;
                console.log(index)
            },
            phoneCall() {
                window.location.href="tel:18108120400"
            },
           
        },
        components: {
         SegmentBar
     }
    }
</script>
<style scoped>
  
</style>