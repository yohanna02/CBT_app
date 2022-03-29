<template>
    <li :data-id="props.list._id">{{props.list.name}}</li>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ListData } from '../store/adminInterface';
const props = defineProps({
  list: {
    type: Object as PropType<ListData>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
li {
    background: $PrimaryWhite;
    width: 40%;
    margin: 1rem auto;
    cursor: pointer;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0.5px 0.5px 5px $primaryGray;
    @include mediaQuery_max_width(999px) {
        width: 100%;
    }
}
</style>