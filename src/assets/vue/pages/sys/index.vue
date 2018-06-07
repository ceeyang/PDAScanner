<template lang="html">
    <f7-page>


        <!-- Tabs, 现在容器是"views" -->
<div class="views tabs toolbar-fixed">
  <!-- Tab 1 同时也是 View 1, 默认激活 -->
  <div id="tab1" class="view tab active">
      <f7-navbar title="消息">
          <f7-nav-right>
              <div @click="barcodeScanner">
                  <i class="f7-icons">camera</i>
              </div>
          </f7-nav-right>
      </f7-navbar>

    <div class="pages navbar-fixed">
      <div data-page="home-1" class="page">
        <div class="page-content">
          <div class="content-block">
            <p>This is view 1</p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Tab 2 - View 2 -->
  <div id="tab2" class="view tab">
      <f7-navbar title="深圳市源泰达科技有限公司">
          <f7-nav-right>
              <div @click="barcodeScanner">
                  <i class="f7-icons">camera</i>
              </div>
          </f7-nav-right>
      </f7-navbar>

    <div class="pages navbar-fixed">
      <div data-page="home-2" class="page">
        <home></home>
      </div>
    </div>
  </div>


  <!-- Tab 3 - View 3 -->
  <div id="tab3" class="view tab">
      <f7-navbar title="我">
          <f7-nav-right>
              <div @click="barcodeScanner">
                  <i class="f7-icons">camera</i>
              </div>
          </f7-nav-right>
      </f7-navbar>

    <div class="pages navbar-fixed">
      <div data-page="home-3" class="page">
        <div class="page-content">
          <div class="content-block">
            <p>This is view 3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 带有链接的标签栏 -->
 <div class="toolbar tabbar">
   <div class="toolbar-inner">
     <a href="#tab1" class="tab-link active"><i class="f7-icons">personal</i></i></a>
     <a href="#tab2" class="tab-link"><i class="f7-icons">personal</i></i></a>
     <a href="#tab3" class="tab-link"><i class="f7-icons">personal</i></i></a>
   </div>
 </div>
</div>

    </f7-page>
</template>

<script>
import Home from '../home/hometest.vue';
export default {
    methods: {
        barcodeScanner() {
            console.log('barcodeScanner xxx ');
        }
    },

    components: {
        Home,
    }
}
</script>


<style lang="css">
</style>
