<template>
    <div class="timer">
        <span class="hours" contenteditable="true" >00</span>:
        <span class="minuts" contenteditable="true">00</span>:
        <span class="secs" contenteditable="true">00</span>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

.timer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $PrimaryRed;
    span {
        // background: brown;
        display: inline-block;
        padding: .4rem;
        margin: 0.5rem;
        font-weight: bold;
        box-shadow: 0.5px 0.5px 5px $primaryGray;
    }
}
</style>

