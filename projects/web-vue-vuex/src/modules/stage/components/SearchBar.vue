<template>
  <form :class="$style.root" @submit.stop.prevent="onSubmit">
    <input v-model="value" name="keyword" className="keyword" type="text" placeholder="请输入搜索关键字..." />
    <button type="submit" className="submit iconfont icon-search" />
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  emits: ['submit'],
  data() {
    return {
      value: '',
    };
  },
  watch: {
    keyword: {
      handler(value: string) {
        this.value = value;
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.value);
    },
  },
});
</script>
<style lang="less" module>
@import '../assets/css/var.less';

:global {
  :local(.root) {
    background-color: #ccc;
    padding: 14px;
    color: #000;
    display: flex;
    .keyword {
      padding: 12px 20px;
      font-size: 30px;
      border: #aaa 2px solid;
      outline: none;
      flex: 1;
    }
    .submit {
      padding: 12px 25px;
      font-size: 30px;
      outline: none;
      border: #666 2px solid;
      border-left: 0;
      border-radius: 0 10px 10px 0;
      background-color: #666;
      color: #fff;
      flex: none;
    }
  }
}
</style>
