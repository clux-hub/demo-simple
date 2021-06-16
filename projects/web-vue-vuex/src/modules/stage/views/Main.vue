<template>
  <MainLayout v-if="!!subView.mainLayout" />
  <LoadingPanel :loading-state="globalLoading" />
</template>

<script lang="ts">
import {LoadingState, defineView} from '@clux/vue-web';
import {LoadView, RouteParams} from '@/Global';
import LoadingPanel from '../components/LoadingPanel.vue';
import {CurUser} from '../entity';
import '../assets/css/iconfont.css';
import '../assets/css/global.module.less';

const MainLayout = LoadView('mainLayout', 'main');

export default defineView({
  name: 'App',
  components: {
    LoadingPanel,
    MainLayout,
  },
  computed: {
    globalLoading(): LoadingState | undefined {
      return this.$store.state.stage.loading?.global;
    },
    subView(): RouteParams {
      return this.$store.state.route.params;
    },
    curUser(): CurUser {
      return this.$store.state.stage.curUser;
    },
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
