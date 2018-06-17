<template lang="html">
    <f7-page>
        <!-- Nav  -->
        <f7-navbar title="维修处理" back-link="Back"></f7-navbar>

        <f7-list ptr-content>

            <f7-list media-list>
  <f7-list-item
    link="/"
    title="Item Title"
    subtitle="Item Subtitle"
    text="Text"
    after="Read more"
    >
      <img src="path-to-my-image.jpg" slot="media">
      <div slot="root-start">Root Start</div>
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

<f7-list media-list>
  <f7-list-item
    link="/home/"
    title="Item Title"
    subtitle="Item Subtitle"
    text="Text"
    after="Read more"
    >
      <img src="path-to-my-image.jpg" slot="media">
      <div slot="root-start">Root Start</div>
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

        </f7-list>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll';
export default {
    methods: {
        onfresh() {
            let vm = this;
            setTimeout(function () {
                vm.$f7.ptr.done();
            }, 2000);
        },
    },

    components: {
        scroll,
    }
}
</script>

<style lang="css">
</style>
