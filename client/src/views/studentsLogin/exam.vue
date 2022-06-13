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
    
    <VueFinalModal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <button type="button" class="modal__close" @click="examLogout">
        &times;
      </button>
      <span class="modal__title">Exams Result</span>
      <div class="modal__content">
        <p>Scored {{examResult.score}} out of {{examResult.totalQuestion}} questions.</p>
      </div>
      <div class="modal__action">
        <button @click="examLogout">Exit Exam</button>
      </div>
    </VueFinalModal>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { VueFinalModal } from "vue-final-modal";
import { useStoreExam } from "../../store";
import { MutationTypes } from "../../store/exam";
import Timer from "../../components/Timer.vue";
import QuestionsList from "../../components/Questions/QuestionsList.vue";
import SwitchBtn from "../../components/Questions/SwitchBtn.vue";

const store = useStoreExam();
const router = useRouter();

const questions = store.getters.getExamQuestions;
const currentQuestion = computed(
  () => questions[store.getters.getCurrentQuestion]
);
const questionIndex = computed(() => store.getters.getCurrentQuestion);

const examStatus = computed(() => store.getters.getExamStatus);

const examResult = computed(() => store.getters.getResults);

const pickedAnswer = ref("");

const showModal = ref(false);

const examLogout = () => {
  showModal.value = false;
  router.push({name: "Students_login"});
}

watch(questionIndex, () => {
  pickedAnswer.value = store.getters.getStudentAnswer[questionIndex.value]
    ? store.getters.getStudentAnswer[questionIndex.value]
    : "";
});

watch(pickedAnswer, (_new) => {
  store.commit(MutationTypes.UPDATE_PICKED_ANSWER, _new);
});

watch(examStatus, (_new) => {
  if (!_new) {
    showModal.value = true;
  }
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

:deep(.modal-container) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
:deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  background-image: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;

  &:focus {
    border: 1px black solid;
    padding: 0.4rem;
  }
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  padding: 2rem;
  flex-grow: 1;
  overflow: auto;

  p {
    font-size: larger;
  }
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
  gap: 2rem;

  button {
    padding: 0.7rem;
    @include btn_base_style($primaryGreen, $primaryBGColor);
  }
}
</style>