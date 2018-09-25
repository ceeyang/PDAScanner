<template>
  <f7-page>
    <f7-navbar title="选择主题" back-link="Back"></f7-navbar>
    <f7-block-title>APP 整体颜色</f7-block-title>
    <f7-block>
      <p>APP 主题颜色, 搭配下面的配色会更好看哦(PS: 该功能还在测试阶段).</p>
      <f7-row>
        <f7-col width="50" class="bg-color-white" @click.native="setLayoutTheme('light')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(0,0,0,0.1)"></f7-col>
        <f7-col width="50" class="bg-color-black" @click.native="setLayoutTheme('dark')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(255,255,255,0.1)"></f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>APP 按钮颜色</f7-block-title>
    <f7-block>
      <p>APP 按钮颜色</p>
      <f7-row>
        <f7-col width="33" v-for="color in colors" :key="color">
          <f7-button style="margin-bottom:1em; text-transform: capitalize;" fill round raised :color="color" @click="setColorTheme(color)">
            {{ color }}
          </f7-button>
        </f7-col>
        <f7-col width="33"></f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      const colors = [
        'red',
        'green',
        'blue',
        'pink',
        'yellow',
        'orange',
        'gray',
        'black',
      ];
      return {
        colors,
        colorsAmount: colors.length,
      };
    },
    methods: {
      setLayoutTheme(theme) {
        const self = this;
        const app = self.$f7;
        app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
      },
      setColorTheme(color) {
        const self = this;
        const app = self.$f7;
        const currentColorClass = app.root[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) app.root.removeClass(currentColorClass[0]);
        app.root.addClass(`color-theme-${color}`);
      },
    },
  };
</script>
