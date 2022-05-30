<template>
  <div class="container">
    <!-- <section class="container"> -->
    <Timer />
    <div class="wrapper">
      <div class="first">
        <textarea
          class="Qframe"
          v-model="currentQuestion.question"
          disabled
        ></textarea>
        <SwitchBtn />
        <section class="QAws">
          <label for="rads1">
            <input
              type="radio"
              id="rads1"
              name="Q1"
              value="option_1"
              v-model="pickedAnswer"
            />
            <span>{{ currentQuestion.options[0].option }}</span>
          </label>

          <label for="rads2">
            <input
              type="radio"
              id="rads2"
              name="Q1"
              value="option_2"
              v-model="pickedAnswer"
            />
            <span>{{ currentQuestion.options[1].option }}</span>
          </label>

          <label for="rads3">
            <input
              type="radio"
              id="rads3"
              name="Q1"
              value="option_3"
              v-model="pickedAnswer"
            />
            <span>{{ currentQuestion.options[2].option }}</span>
          </label>

          <label for="rads4">
            <input
              type="radio"
              id="rads4"
              name="Q1"
              value="option_4"
              v-model="pickedAnswer"
            />
            <span>{{ currentQuestion.options[3].option }}</span>
          </label>
        </section>
      </div>
      <QuestionsList />
    </div>
    <!-- </section> -->
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useStoreExam } from "../../store";
import Timer from "../../components/Timer.vue";
import QuestionsList from "../../components/Questions/QuestionsList.vue";
import SwitchBtn from "../../components/Questions/SwitchBtn.vue";
import { MutationTypes } from "../../store/exam";

const store = useStoreExam();

const questions = store.getters.getExamQuestions;
const currentQuestion = computed(
  () => questions[store.getters.getCurrentQuestion]
);
const questionIndex = computed(() => store.getters.getCurrentQuestion);

const pickedAnswer = ref("");

watch(questionIndex, () => {
  pickedAnswer.value = store.getters.getStudentAnswer[questionIndex.value]
    ? store.getters.getStudentAnswer[questionIndex.value]
    : "";
});

watch(pickedAnswer, (_new) => {
  store.commit(MutationTypes.UPDATE_PICKED_ANSWER, _new);
});
</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;
.wrapper {
  width: 100%;
  min-height: fit-content !important;
  background: inherit;
  @include flex_fun(row, space-between, center);
  padding: 2rem 0;
  @include mediaQuery_max_width(999px) {
    @include flex_fun(column, space-between, center);
  }
}
.first {
  width: 50%;
  height: 100vh;
  @include flex_fun(column, space-between, center);
  .Qframe {
    width: 100%;
    height: 40vh;
    border: 1px solid $primaryGray;
    border-radius: 5px;
    resize: none;
    padding: 2rem;
  }
  .next_pre {
    width: 100%;
    @include flex_fun(row, space-between, center);

    .pre,
    .next {
      @include btn_base_style;
      padding: 1rem 2rem;
      color: $PrimaryWhite;

      &:hover {
        background: darken($color: $primaryBlue, $amount: 15);
      }
    }
    .next {
      &:hover {
        background: darken($color: $primaryGreen, $amount: 15) !important;
      }
    }
    .next {
      background: $primaryGreen !important;
    }
  }
  section {
    width: 100%;
    height: auto;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  label {
    @include btn_base_style;
    background: $PrimaryWhite !important;
    position: relative;
    display: block;
    padding: 2rem;
    border: 0.5px solid $primaryGray;
    color: $primaryGray;
    &:hover {
      background: $primaryBlue !important;
      color: $PrimaryWhite;
      border: none;
    }
    &:active {
      background: $primaryGreen !important;
      border: 0.5px solid $primaryGray;
    }
  }

  input[type="radio"] {
    @include btn_base_style;
    position: absolute;
    width: 100px;
    height: 100%;
    opacity: 0;
    &:checked + span {
      background: $primaryGreen;
    }
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
  }
  @include mediaQuery_max_width(999px) {
    @include flex_fun(column, space-between, center);
    width: 100%;
    .Qframe,
    .next_pre,
    section {
      margin-bottom: 1rem;
    }
  }
}
</style>