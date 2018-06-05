<template>
    <f7-page class="chats-page">

        <!-- Nav -->
        <nav-bar title='消息'></nav-bar>

        <!-- segment 选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

        <f7-list media-list>
  <f7-list-item
    link="/about/"
    title="王志是傻逼"
    subtitle="真的不骗你"
    text="Text"
    after="Read more"
    >
      <img src="path-to-my-image.jpg" slot="media">
      <div slot="root-start">最新消息</div>
      <div slot="root">Root End</div>
      <div slot="content-start">Content Start</div>
      <div slot="content">Content End</div>
      <div slot="media-start">Media Start</div>
      <div slot="media">Media</div>
      <span slot="after-start">After Start</span>
      <span slot="after">After End</span>
      <div slot="inner-start">Inner Start</div>
      <div slot="inner">Inner End</div>
      <div slot="before-title">Before Title</div>
      <div slot="after-title">After Title</div>
  </f7-list-item>
</f7-list>

        <!-- tabbar -->
        <foot-bar select="chats"></foot-bar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
import SegmentBar from '../../common/segmentBar';

export default {

    data () {
        return {
            titlesArray:['全部','待维修','已完成'],
                currentIndex:0,
                loading: false,
                loadMoreNot: true,
                firstLoad: true,
        }
    },

    methods: {
        // 导航栏点击事件
            switchTab(index) {
                this.currentIndex = index;
            },
    },

    components: {
        FootBar, NavBar,SegmentBar
    }
}
</script>

<style lang="css">
</style>
