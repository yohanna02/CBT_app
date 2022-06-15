<template>
  <div class="container">
    <router-link :to="{ name: 'dashboard' }">
      <img
        style="
          width: 25px;
          height: 25px;
          position: relative;
          top: 50px;
          left: 0;
        "
        src="../../assets/house.jpg"
        alt="..."
      />
    </router-link>
    <div class="wrapper">
      <h1>{{ studentResultList.className.toUpperCase() }} STUDENT RESULT LISTS</h1>
      <h5>Present</h5>
      <ul>
        <li v-for="regNo in studentResultList.resultRegNo" :key="regNo">
          <router-link
            :to="{
              name: 'studentResult',
              params: {
                studentResultList: route.params.studentResultList,
                regNo,
              },
            }"
          >
            {{ regNo }}
          </router-link>
        </li>
      </ul>
      <h5 style="color: crimson">Absent</h5>
      <ul>
        <li v-for="regNo in studentResultList.missedExam" :key="regNo">
          {{ regNo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

interface StudentResultList {
  className: string;
  resultRegNo: string[];
  missedExam: string[];
}

const studentResultList = ref<StudentResultList>({
  className: "",
  resultRegNo: [],
  missedExam: [],
});

onMounted(async () => {
  const resultId = route.params.studentResultList;

  const { data } = await axios.get<StudentResultList>(
    `/api/result/get-results/${resultId}`,
    {
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
    }
  );

  studentResultList.value = { ...data };
});
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
  display: block;
  width: $width;
  background: inherit;
  padding: 4.5rem 0;
  h1 {
    margin: 2rem 0;
  }
  h5 {
    margin: 1.5rem 0;
    text-transform: uppercase;
  }
  ul {
    display: block;
    width: $width;
    height: fit-content;
    li {
      background: $PrimaryWhite;
      width: 40%;
      margin: 1rem 0;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0.5px 0.5px 5px $primaryGray;
      @include mediaQuery_max_width(999px) {
        width: 100%;
      }
    }
  }
}
</style>