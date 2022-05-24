<template>
    <div class="container">
        <div class="wrapper">
            <h1>Take Exams</h1>
            <form @submit.prevent="takeExams">
                <input type="text" v-model="regNo" placeholder="Enter Registration No"/>
                <div>
                    <select v-model="classId">
                        <option value="" disabled selected>{{loading ? "Loading..." : "--Select class--"}}</option>
                        <option v-for="_class in classList" :key="_class._id" :value="_class._id">
                            {{ _class.name }}
                        </option>
                    </select>
                </div>
                <button type="submit">TAKE EXAMS</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from '../../store';
import { ActionTypes } from '../../store/admin';

const store = useStore();

const classId = ref("");
const regNo = ref("");
const loading = ref(false);

const classList = computed(() => store.getters.getClasses);

const takeExams = () => {

};

onMounted(async () => {
    loading.value = true;
    await store.dispatch(ActionTypes.FETCH_CLASS_LIST);
    loading.value = false;
});
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
    width: $width;
    height: 100vh;
    background: inherit;
    @include flex_fun(column, center, center);
    h1 {
        @include flex_fun(center, center);
        margin: 1rem 0;
    }
    form {
        width: 30%;
        @include flex_fun(column, space-between, center);

        input[type="text"] {
            width: 100%;
            @include base_input_style(1.5px, 0.7rem, 2rem);
            border-radius: $border_radius;
            margin: 2rem 0;
        }

        div {
            width: 100%;
            select {
                display: block;
                width: 100%;
                border: none;
                border-radius: 5px;
                padding: 1rem;
                margin: 0 0 2rem 0;
                flex: none;
                @include base_input_style(1.5px, 0.7rem, 2rem);
            }
        }

        button[type="submit"] {
            width: 100%;
            @include btn_base_style;
            @include base_input_style(1.5px, 0.7rem, 2rem);
            color: $PrimaryWhite;
            font-size: calc($fontsize - 2px);

            &:hover {
                @include btn_base_style_hover($primaryBlue);
            }
            &:active {
                @include btn_base_style_active($PrimaryWhite);
            }
        }
        @include mediaQuery_max_width {
            width: 100%;
        }
    }
}
</style>