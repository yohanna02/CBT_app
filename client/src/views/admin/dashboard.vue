<template>
    <div class="container">
        <div class="wrapper">
            <h1>ADMIN DASHBOARD</h1>
            <div class="wrapLinks">
                <div @click="router.push({name: 'addClass'})" class="item">
                    <div>
                        <img src="../../assets/school.jpg" alt="..." />
                    </div>
                    <p>ADD Class</p>
                </div>
                <div @click="router.push({name: 'addStudent'})" class="item">
                    <div>
                        <img src="../../assets/user-graduate.jpg" alt="..." />
                    </div>
                    <p>ADD Student</p>
                </div>
                <div @click="router.push({name: 'Settings'})" class="item">
                    <div>
                        <img src="../../assets/gear.jpg" alt="..." />
                    </div>
                    <p>Settings</p>
                </div>
                <div @click="router.push({name: 'adminSetQuesions'})" class="item">
                    <div>
                        <img src="../../assets/file.jpg" alt="..." />
                    </div>
                    <p>ADD Quetion</p>
                </div>
                <div @click="router.push({name: 'examResult'})" class="item">
                    <div>
                        <img src="../../assets/plus.jpg" alt="..." />
                    </div>
                    <p>Exams Results</p>
                </div>
                <div @click="logout" class="item">
                    <div>
                        <img src="../../assets/arrow-right-from-bracket.jpg" alt="..." />
                    </div>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../store"
import { ActionTypes } from "../../store/admin";

const store = useStore();
const router = useRouter();
const logout = async () => {
    await store.dispatch(ActionTypes.LOG_OUT);
    router.push({name: "AdminLogin"});
}
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
    width: $width;
    padding: 1rem 0;
    background: inherit;
    @include flex_fun(column, center, center);
    h1 {
        @include flex_fun(center, center);
        margin: 1rem 0;
    }
    .wrapLinks {
        width: 70%;
        height: auto;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        margin: 5rem auto 0 auto;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid $primaryGray;
            background: $PrimaryWhite;
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid $primaryGray;
            box-shadow: 0.5px 0.5px 5px $primaryGray;
            cursor: pointer;

            div {
                width: 90px;
                height: 90px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            p {
                width: 100%;
                text-align: center;
                margin: 1rem 0 0 0;
                color: $primaryGray;
                font-weight: bold;
            }
        }
    }
}
</style>