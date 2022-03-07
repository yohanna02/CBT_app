<template>
  <div class="container">
    <div class="wrapper">
      <h1>Admin LOGIN</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="text" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Enter password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../store/index";
import { ActionTypes } from "../../store/admin";
import { ref } from "vue";
const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await store.dispatch(ActionTypes.LOG_IN, {email: email.value, password: password.value});
    router.push({ name: "dashboard" });
  } catch ({response}) {
    alert("Error Logging in");
    console.log(response);
  }
};
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
  width: $width;
  height: 80vh;
  background: inherit;
  @include flex_fun(column, center, center);
  h1 {
    @include flex_fun(center, center);
    margin: 1rem 0;
    text-transform: uppercase;
  }
  form {
    width: 30%;
    @include flex_fun(column, space-between, center);

    input[type="text"],
    input[type="password"] {
      width: 100%;
      @include base_input_style(1.5px, 0.7rem, 2rem);
      border-radius: $border_radius;
      margin: 1rem 0;
    }
    input[type="password"] {
      margin-bottom: 1rem;
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
