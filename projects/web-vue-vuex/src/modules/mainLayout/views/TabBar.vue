<template>
  <div :class="$style.root + ' g-doc-width'">
    <span>aa</span>
    <span>bb</span>
    <span>cc</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  components: {},
});
</script>
<style lang="less" module>
:global {
  :local(.root) {
    text-align: center;
    height: 100px;
    display: flex;
    flex: none;
    background-color: blue;
    > * {
      display: block;
      flex: 1;
    }
  }
}
</style>
