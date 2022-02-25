<template>
    <div class="body">
        <div class="container">
            <router-link to="/studentlogin" class="link">TAKE EXAMS</router-link>
            <router-link to="/" class="link">LOGIN</router-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "../assets/styles/abstracts" as *;
@use "../assets/styles/resets" as *;
@use "../assets/styles/mixins" as *;
html {
  scroll-behavior: smooth;
  overflow: hidden;

  .body {
    background: $primaryBGColor;
    width: 100vw;
    max-width: 1700px;
  }
}
.container {
    width: $width;
    overflow-y: hidden;
    @include flex_fun(column, space-between, center);
    .link {
        text-decoration: underline;
        color: $primaryBlack;
        &:first-child {
            font-size: calc(2.5 * $fontsize);
            word-spacing: 0.5rem;
            margin-top: 10rem;
        }
        &:last-child {
            font-size: calc($fontsize - 3px);
            margin-bottom: 5rem;
        }
        &:hover {
            color: $primaryBlue;
        }
    }
}
</style>