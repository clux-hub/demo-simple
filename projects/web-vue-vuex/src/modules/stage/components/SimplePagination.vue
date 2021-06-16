<template>
  <div :class="$style.root">
    <a v-if="pageCurrent > 1" className="item" @click.stop.prevent="onChange(pageCurrent - 1)">
      <span className="iconfont icon-left" />
      上一页
    </a>
    <a v-if="pageCurrent < totalPages" className="item" @click.stop.prevent="onChange(pageCurrent + 1)">
      下一页
      <span className="iconfont icon-right" />
    </a>
    <div className="info">- 第 {{ pageCurrent }} 页 / 共 {{ totalPages }} 页 -</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
    pageCurrent: {
      type: Number,
      default: 1,
    },
  },
  emits: ['change'],
  methods: {
    onChange(currentPage: number) {
      this.$emit('change', currentPage);
    },
  },
});
</script>
<style lang="less" module>
:global {
  :local(.root) {
    background-color: #ccc;
    text-align: center;
    color: #000;
    overflow: hidden;
    .item {
      font-size: 26px;
      border: #bbb 2px solid;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, 0.6);
      display: inline-block;
      padding: 0 30px;
      line-height: 55px;
      height: 55px;
      margin: 40px 15px 0;
      cursor: pointer;
    }
    .info {
      color: #666;
      font-size: 24px;
      padding-bottom: 40px;
      margin-top: 20px;
    }
  }
}
</style>
