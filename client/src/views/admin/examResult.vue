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
      <h1>CLASS RESULT LISTS</h1>
      <p v-if="results.length === 0" style="color: crimson">No Results</p>
      <ul v-else>
        <li v-for="result in results" :key="result._id">
            <router-link 
                :to="{ name: 'studentResultList', params: { studentResultList: result._id }}">
                    {{ result.className }}
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";

interface Results {
  _id: string;
  className: string;
}

const results = ref<Results[]>([]);

onMounted(async () => {
  const { data } = await axios.get<Results[]>("/api/result/get-results", {
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
  });

  results.value = data;
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: block;
  width: $width;
  background: inherit;
  padding: 4.5rem 0;
  h1 {
    margin: 2rem 0;
  }
  ul {
    display: block;
    width: $width;
    height: fit-content;
    li {
      cursor: pointer;
      background: $PrimaryWhite;
      width: 40%;
      margin: 1rem 0;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0.5px 0.5px 5px $primaryGray;
      @include mediaQuery_max_width(999px) {
        width: 100%;
      }

      a {
        color: black;
      }
    }
  }
}
</style>