<template>
    <div class="container">
        <div class="wrapper">
            <router-link to="/studentlogin" class="link">TAKE EXAMS</router-link>
            <router-link to="/" class="link">LOGIN</router-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// @use "../assets/styles/abstracts" as *;
// @use "../assets/styles/resets" as *;
// @use "../assets/styles/mixins" as *;
.wrapper {
    width: $width;
    height: 100%;
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