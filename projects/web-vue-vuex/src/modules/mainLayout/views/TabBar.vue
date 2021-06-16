<template>
  <div :class="$style.root">
    <div>
      <span className="icon iconfont icon-camera" />
      <div className="title">相册</div>
    </div>
    <div>
      <span className="icon iconfont icon-video" />
      <div className="title">视频</div>
    </div>
    <div>
      <span className="icon iconfont icon-user" />
      <div className="title">我的</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@clux/vue-web';
import {RouteParams} from '@/Global';

export default defineComponent({
  computed: {
    subView(): RouteParams {
      return this.$store.state.route.params;
    },
  },
});
</script>
<style lang="less" module>
@import '@stage/assets/css/var.less';

:global {
  :local(.root) {
    text-align: center;
    height: 100px;
    display: flex;
    align-items: center;
    flex: none;
    color: #fff;
    background-color: @primaryColor;
    > * {
      font-size: 25px;
      display: block;
      flex: 1;
    }
    .icon {
      font-size: 40px;
    }
  }
}
</style>
