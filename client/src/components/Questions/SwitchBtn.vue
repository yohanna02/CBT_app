<template>
  <div class="next_pre">
    <button class="pre" @click="changeQuestion('prev')">Pre</button>
    <button class="next" @click="changeQuestion('next')">Next</button>
  </div>
</template>

<script setup lang="ts">
import { useStoreExam } from '../../store';
import { MutationTypes } from '../../store/exam';

const store = useStoreExam();

const questions = store.getters.getExamQuestions;

const changeQuestion = (type: string) => {
    const hightestIndex = questions.length - 1;
    if (type === "next") {
        const nextIndex = store.getters.getCurrentQuestion + 1;
        if (nextIndex > hightestIndex) return;

        store.commit(MutationTypes.SET_CURRENT_QUESTION, nextIndex);
        return;
    }

    const nextIndex = store.getters.getCurrentQuestion - 1;
    if (nextIndex < 0) return;

    store.commit(MutationTypes.SET_CURRENT_QUESTION, nextIndex);
}
</script>

<style lang="scss" scoped>
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
</style>