<template>
    <div class="container">
        <router-link :to="{name: 'dashboard'}">
            <img
                style="width: 25px; height: 25px; position: relative; top: 50px; left: 0;"
                src="../../assets/house.jpg"
                alt="..."
            />
        </router-link>
        <div class="wrapper">
            <h1>ADD STUDENT</h1>
            <form @submit.prevent="registerStudent">
                <input type="text" v-model="regNo" placeholder="Registration Number" />
                <div>
                    <select v-model="class_id">
                        <option value="" disabled selected>Student Class</option>
                        <option v-for="_class in classList" :key="_class._id" :value="_class._id">{{ _class.name }}</option>
                    </select>
                </div>
                <button type="submit">{{loading ? "Adding..." : "Add student"}}</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "../../store";
import { computed, ref, onMounted } from "vue";

import { ActionTypes } from "../../store/admin";

const store = useStore();

const classList = computed(() => store.getters.getClasses);
const class_id = ref("");
const regNo = ref("");
const loading = ref(false);

onMounted(async () => {
  await store.dispatch(ActionTypes.FETCH_CLASS_LIST);
});

const registerStudent = async () => {
    try {
        loading.value = true;
        await store.dispatch(ActionTypes.ADD_STUDENT, {regNo: regNo.value, class_id: class_id.value});
        loading.value = false;
        regNo.value = "";
        class_id.value = "";
    } catch (err: any) {
        loading.value = false;
        if (err.response) return alert(err.response.data.msg);

        alert("An Error Occured");
    }
};
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
    width: $width;
    height: 100%;
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
            margin: 1rem 0;
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