<template>
  <Navigation />
  <div :class="$style.root">ffff</div>
  <TabBar />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// import {RouteState, APPState, LoadView} from '@/APP';
import Navigation from './Navigation.vue';
import TabBar from './TabBar.vue';

// const Photo = LoadView('photo', 'main');

// export interface StoreProps {
//   subView: RouteState['params'];
// }

function ccc(a: number) {
  return a;
}
ccc(1);
export default defineComponent({
  components: {
    Navigation,
    TabBar,
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
