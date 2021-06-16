<template>
  <div :class="[$style.root, theme, className]">
    <div v-if="onBack" className="btn-back iconfont icon-left" @click="onBack" />
    <div className="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    className: {
      type: String,
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'dark',
    },
    onBack: {
      type: Function,
    },
  },
});
</script>
<style lang="less" module>
@import '../assets/css/var.less';

:global {
  :local(.root) {
    text-align: center;
    height: 100px;
    line-height: 100px;
    flex: none;
    background-color: #eee;
    color: #000;
    position: relative;
    .btn-back {
      position: absolute;
      left: 0;
      width: 90px;
      font-size: 50px;
      cursor: pointer;
    }
    .title {
      margin: 0 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 40px;
    }
    &.dark {
      background-color: @primaryColor;
      color: #fff;
    }
  }
}
</style>
