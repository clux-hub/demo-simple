<template>
  <div v-if="list && listSearch && listSummary" :class="[$style.root, 'g-pic-list']">
    <SearchBar :keyword="listSearch.keyword" @submit="onSearch" />
    <div>
      <div v-for="item in list" :key="item.id" className="list-item">
        <div className="list-pic" :style="{backgroundImage: `url(${StaticPrefix + item.coverUrl})`}">
          <div className="list-title">{{ item.title }}</div>
          <div className="props">
            <span className="iconfont icon-location" /> {{ item.departure }}
            <span className="iconfont icon-tag" :style="{marginleft: '5px'}" />
            {{ item.type }}
          </div>
          <div className="desc">
            <div className="price">
              <span className="unit">￥</span>
              <span className="num">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <simple-pagination :total-pages="listSummary.totalPages" :page-current="listSummary.pageCurrent" @change="onPageChange" />
  </div>
</template>

<script lang="ts">
import {defineView} from '@clux/vue-web';
import {StaticPrefix, GetRouter} from '@/Global';
import SimplePagination from '@stage/components/SimplePagination.vue';
import SearchBar from '@stage/components/SearchBar.vue';
import {ListItem, ListSearch, ListSummary} from '../entity';

export default defineView({
  components: {
    SearchBar,
    SimplePagination,
  },
  data() {
    return {StaticPrefix};
  },
  computed: {
    listSearch(): ListSearch | undefined {
      return this.$store.state.photo.listSearch;
    },
    list(): ListItem[] | undefined {
      return this.$store.state.photo.list;
    },
    listSummary(): ListSummary | undefined {
      return this.$store.state.photo.listSummary;
    },
  },
  methods: {
    onPageChange(pageCurrent: number) {
      GetRouter().push({extendParams: 'current', params: {photo: {listSearch$: {pageCurrent}}}});
    },
    onSearch(keyword: string) {
      GetRouter().push({extendParams: 'current', params: {photo: {listSearch$: {pageCurrent: 1, keyword}}}});
    },
  },
});
</script>
<style lang="less" module>
:global {
  :local(.root) {
    .props {
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      left: 0;
      top: 75px;
      padding: 3px 15px 2px 20px;
      border-radius: 0 30px 30px 0;
      font-size: 20px;
      color: #ddd;

      .at-icon {
        vertical-align: baseline;
      }
    }
    .desc {
      position: absolute;
      height: 20px;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 0, 0.7);
      padding: 2px 20px 0;
      border-radius: 10px 0;
      line-height: 1;

      .price {
        margin-top: -18px;
      }

      .unit {
        font-size: 26px;
        font-weight: bold;
        color: #f30;
      }
      .num {
        font-style: italic;
        font-size: 35px;
        color: #f30;
        font-weight: bold;
        text-shadow: 0 2px #fff, 2px 0 #fff, -2px 0 #fff, 0 -2px #fff;
      }
    }
  }
}
</style>
