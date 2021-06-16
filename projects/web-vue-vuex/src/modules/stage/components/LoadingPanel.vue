<template>
  <div v-if="loadingState" :class="[$style.root, loadingState]"><span className="loading-icon iconfont icon-hourglass" /></div>
</template>

<script lang="ts">
import {PropType} from 'vue';
import {defineComponent, LoadingState} from '@clux/vue-web';

export default defineComponent({
  props: {
    loadingState: {
      type: String as PropType<LoadingState>,
    },
  },
  computed: {
    showLoading(): boolean {
      return this.loadingState === LoadingState.Start || this.loadingState === LoadingState.Depth;
    },
  },
});
</script>
<style lang="less" module>
@import '../assets/css/var.less';
:global {
  :local(.root) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100000;
    background-color: rgba(0, 0, 0, 0);
    display: none;

    > .loading-icon {
      opacity: 0.4;
      position: absolute;
      width: 70px;
      height: 70px;
      font-size: 70px;
      overflow: hidden;
      color: @primaryColor;
      left: 50%;
      top: 50%;
      margin-left: -35px;
      margin-top: -35px;
      animation: g-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    &.Start {
      display: block;
    }
    &.Depth {
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
      > .loading-icon {
        opacity: 1;
      }
    }
  }
}
</style>
