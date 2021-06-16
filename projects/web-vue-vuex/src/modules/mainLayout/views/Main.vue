<template>
  <NavBar title="相册" />
  <div :class="$style.root">
    <photo v-if="subView.photo" />
  </div>
  <TabBar />
</template>

<script lang="ts">
import {defineView} from '@clux/vue-web';
import {RouteParams, LoadView} from '@/Global';
import NavBar from '@stage/components/NavBar.vue';
import TabBar from './TabBar.vue';

const Photo = LoadView('photo', 'main');

export default defineView({
  components: {
    NavBar,
    TabBar,
    Photo,
  },
  computed: {
    subView(): RouteParams {
      return this.$store.state.route.params;
    },
  },
});
</script>
<style lang="less" module>
:global {
  :local(.root) {
    flex: 1;
    overflow-x: hidden;
    height: 100%;
  }
}
</style>
