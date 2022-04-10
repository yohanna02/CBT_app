<template>
  <div class="container">
    <router-link :to="{ name: 'dashboard' }"
      ><img
        style="
          width: 25px;
          height: 25px;
          position: relative;
          top: 50px;
          left: 0;
        "
        src="../../assets/house.jpg"
        alt="Home"
    /></router-link>
    <div class="wrapper">
      <h1>ADD CLASS</h1>
      <form @submit.prevent="addClass">
        <input v-model="className" type="text" placeholder="Class Name" />
        <button type="submit">{{loading ? "Adding..." : "Add class"}}</button>
      </form>
      
      <h5>Class List</h5>
      <ListGroup :list-arr="classList" @dblclick="deleteClass" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "../../store";
import { ActionTypes } from "../../store/admin";

import ListGroup from "../../components/ListGroup.vue";

const store = useStore();

const className = ref("");
const loading = ref(false);

const classList = computed(() => store.getters.getClasses);

const addClass = async () => {
  try {
    loading.value = true;
    
    await store.dispatch(ActionTypes.ADD_CLASS, {name: className.value});

    className.value = "";
    loading.value = false;
  } catch (err: any) {
    loading.value = false;
    if (err.response) return alert(err.response.data.msg);

    alert("An Error Occured");
  }
};

const deleteClass = async (e: any) => {
  try {
    if (!confirm("Are you sure you want to delete this class")) return;
    
    const id = e.target.dataset.id;
    await store.dispatch(ActionTypes.DELETE_CLASS, {id});
  } catch (err: any) {
    if (err.response) return alert(err.response.data.msg);

    alert("An Error Occured");
  }
};
 
onMounted(async () => {
  await store.dispatch(ActionTypes.FETCH_CLASS_LIST);
});

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

  h5 {
    margin-top: 2.5rem;
  }
}
</style>
