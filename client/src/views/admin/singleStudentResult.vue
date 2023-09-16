<template>
<div class="container">
    <h1>RESULT FOR {{ studentResult.regNo }}</h1>
    <p>Scored <b>{{ studentResult.score }}</b> out of <b>{{ studentResult.totalQuestion }}</b> questions</p>
    <p>Scored <b>{{ scorePercentage }}%</b></p>

    <div class="grade">
        <span v-if="scorePercentage >= 75" class="a">A</span>
        <span v-else-if="scorePercentage >= 70 && scorePercentage <= 74" class="ab">AB</span>
        <span v-else-if="scorePercentage >= 65 && scorePercentage <= 69" class="b">B</span>
        <span v-else-if="scorePercentage >= 60 && scorePercentage <= 64" class="bc">BC</span>
        <span v-else-if="scorePercentage >= 55 && scorePercentage <= 59" class="c">C</span>
        <span v-else-if="scorePercentage >= 50 && scorePercentage <= 54" class="cd">CD</span>
        <span v-else-if="scorePercentage >= 45 && scorePercentage <= 49" class="d">D</span>
        <span v-else-if="scorePercentage >= 40 && scorePercentage <= 44" class="e">E</span>
        <span v-else-if="scorePercentage < 40" class="f">F</span>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

interface StudentResult {
  regNo: string;
  totalQuestion: number;
  score: number;
  _id: string;
}

const studentResult = ref<StudentResult>({
  regNo: "",
  totalQuestion: 0,
  score: 0,
  _id: "",
});

const scorePercentage = ref(0);

onMounted(async () => {
  const resultId = route.params.studentResultList;
  const regNo = route.params.regNo;

  const { data } = await axios.get<StudentResult>(
    `/api/result/get-single-result/${resultId}?regNo=${regNo}`,
    {
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
    }
  );

  studentResult.value = { ...data };

  scorePercentage.value = (data.score / data.totalQuestion) * 100;
});
</script>

<style lang="scss" scoped>
.container {
  background: inherit;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2rem;

  p {
    font-size: 1.5rem;
  }

  .grade { 
    span {
        padding: 1.5rem;
        font-weight: bold;
        background-color: #afacac;
        border-radius: 6px;

        &.a {
            background-color: #6abf23;
            color: white;
        }

        &.ab {
            background-color: #00a252;
            color: white;
        }

        &.b {
            background-color: #00737b;
            color: white;
        }

        &.bc {
            background-color: #004b97;
            color: white;
        }

        &.c {
            background-color: #322d84;
            color: white;
        }

        &.cd {
            background-color: #662677;
            color: white;
        }

        &.d {
            background-color: #ffc900;
            color: white;
        }

        &.e {
            background-color: #ff9400;
            color: white;
        }

        &.f {
            background-color: #e90005;
            color: white;
        }
    }
  }
}
</style>