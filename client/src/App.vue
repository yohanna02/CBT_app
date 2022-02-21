<template>
<div>
  <h1 class="display-1">{{num}}</h1>
  <button class="btn btn-success" @click="count">Count</button>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const num = ref(0);

const count = () => {
  num.value++;
}
</script>

<style>

</style>
