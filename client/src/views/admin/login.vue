<template>
  <div class="container">
    <div class="wrapper">
      <h1>Admin LOGIN</h1>
      <AuthForm authType="LOGIN" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from "../../components/AuthForm.vue";
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.container {
  background-image: url("../../assets/school-gate.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper {
  width: $width;
  height: 80vh;
  background: inherit;
  @include flex_fun(column, center, center);
  h1 {
    @include flex_fun(center, center);
    // color: $PrimaryWhite;
    margin: 1rem 0;
    text-transform: uppercase;
  }
}
</style>
