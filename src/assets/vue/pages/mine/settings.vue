<template lang="html">
    <f7-page>
        <f7-navbar title="Stttings" back-link="Back" sliding></f7-navbar>


        <!-- Tabs, 现在容器是"views" -->
<div class="views tabs toolbar-fixed">
  <!-- Tab 1 同时也是 View 1, 默认激活 -->
  <div id="tab1" class="view tab active">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">View 1</div>
      </div>
    </div>
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
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">View 2</div>
      </div>
    </div>
    <div class="pages navbar-fixed">
      <div data-page="home-2" class="page">
        <div class="page-content">
          <div class="content-block">
            <p>This is view 2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Tab 3 - View 3 -->
  <div id="tab3" class="view tab">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="center">View 3</div>
      </div>
    </div>
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
      <a href="#tab1" class="tab-link active"><i class="icon demo-icon-1"></i></a>
      <a href="#tab2" class="tab-link"><i class="icon demo-icon-2"></i></a>
      <a href="#tab3" class="tab-link"><i class="icon demo-icon-3"></i></a>
    </div>
  </div>
</div>

    </f7-page>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
