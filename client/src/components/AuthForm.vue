<template>
  <form @submit.prevent="login">
    <input v-model="email" type="text" placeholder="Email" required />
    <input
      v-model="password"
      type="password"
      placeholder="Enter password"
      required
    />
    <button type="submit">
      <span v-if="authType === 'LOGIN'">
        {{ loading ? "Loading..." : "Login" }}
      </span>
      <span v-else>
        {{ loading ? "Adding..." : "Add Admin" }}
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { ActionTypes } from "../store/admin";
import { ref, PropType } from "vue";
const store = useStore();
const router = useRouter();

type AuthStingType = "ADMIN" | "LOGIN";

const props = defineProps({
  authType: {
    type: String as PropType<AuthStingType>,
    required: true
  }
});

const email = ref("");
const password = ref("");
const loading = ref(false);


const login = async () => {
  try {
    loading.value = true;
    if (props.authType === 'LOGIN') {
      await store.dispatch(ActionTypes.LOG_IN, {
        email: email.value,
        password: password.value,
      });
      router.push({ name: "dashboard" });
    } else {
      await store.dispatch(ActionTypes.ADD_ADMIN, {
        email: email.value,
        password: password.value
      });

      email.value = "";
      password.value = "";
    }
    loading.value = false;
  } catch (err: any) {
    loading.value = false;
    if (err.response) {
      alert(err.response.data.msg);
      return;
    }
    alert("Error");
  }
};
</script>

<style lang="scss" scoped>
form {
  background-color: $PrimaryWhite;
  padding: 2rem;
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
</style>
