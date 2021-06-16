<template>
  <List v-if="listView === 'list'" />
</template>

<script lang="ts">
import {defineView} from '@clux/vue-web';
import {ListView, ItemView, ItemDetail} from '../entity';
import List from './List.vue';

export default defineView({
  components: {List},
  computed: {
    listView(): ListView {
      return this.$store.state.photo.listView;
    },
    itemView(): ItemView {
      return this.$store.state.photo.itemView;
    },
    itemDetail(): ItemDetail | undefined {
      return this.$store.state.photo.itemDetail;
    },
  },
});
</script>
