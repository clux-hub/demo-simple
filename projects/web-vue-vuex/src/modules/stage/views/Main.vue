<template>
  <MainLayout v-if="!!subView.mainLayout" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {LoadView} from '@/APP';

const MainLayout = LoadView('mainLayout', 'main');

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
  data() {
    return {};
  },
  computed: {
    subView() {
      return this.$store.state.route.params;
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
