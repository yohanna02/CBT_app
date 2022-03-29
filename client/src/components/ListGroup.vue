<template>
  <ul>
      <List v-for="list in props.listArr" :key="list._id" :list="list" />
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import List from './List.vue';
import { ListData } from '../store/adminInterface';

const props = defineProps({
  listArr: {
    type: Array as PropType<ListData[]>,
    required: true
  }
});

</script>

<style lang="scss" scoped>
ul {
    display: block;
    width: $width;
    height: fit-content;
    margin: 0 auto;
}
</style>