<template>
  <div class="container">
    <div class="wrapper">
      <h1>Take Exams</h1>
      <p class="error">{{ errorMsg }}</p>
      <form @submit.prevent="takeExams">
        <input
          type="text"
          v-model="regNo"
          placeholder="Enter Registration No"
        />
        <div>
          <select v-model="classId">
            <option value="" disabled selected>--Select class--</option>
            <option
              v-for="_class in classList"
              :key="_class._id"
              :value="_class._id"
            >
              {{ _class.name }}
            </option>
          </select>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? "Loading..." : "TAKE EXAMS" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore, useStoreExam } from "../../store";
import { ActionTypes } from "../../store/admin";
import { ActionTypes as ExamActionTypes } from "../../store/exam";
import { notification } from "../../utils/notifications";

const store = useStore();
const examStore = useStoreExam();

const router = useRouter();

const errorMsg = ref("");
const classId = ref("");
const regNo = ref("");
const loading = ref(false);
let socket: WebSocket;

const classList = computed(() => store.getters.getClasses);

const takeExams = async () => {
  try {
    loading.value = true;
    errorMsg.value = "";
    await examStore.dispatch(ExamActionTypes.START_EXAMS, {
      regNo: regNo.value,
      classId: classId.value,
    });
    loading.value = false;

    router.push({ name: "Students_exam" });
  } catch (error: any) {
    loading.value = false;
    errorMsg.value = error.response.data.msg;
    console.log(error.response);
  }
};

onMounted(async () => {
  socket = new WebSocket("ws://localhost:3001/");
  socket.onopen = () => {
    console.log("Connected successfully");
  };

  socket.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data) as { event: string; data: any };

    if (parsedData.event === "exam-start") {
      notification(parsedData.data);
    }
  };

  socket.onerror = () => {
    alert("Websocket error");
  };

  await store.dispatch(ActionTypes.FETCH_CLASS_LIST);
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
  .error {
    color: $PrimaryRed;
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