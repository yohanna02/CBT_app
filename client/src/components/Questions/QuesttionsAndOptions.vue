<template>
    <div class="first">
        <textarea class="Qframe" v-model="currentQuestion.question"></textarea>
        <SwitchBtn />
        <section class="QAws">
            <label for="rads1">
                <input type="radio" id="rads1" value="option_1" v-model="answer" />
                <input type="text" v-model="currentQuestion.options[0].option">
            </label>

            <label for="rads2">
                <input type="radio" id="rads2" value="option_2" v-model="answer" />
                <input type="text" v-model="currentQuestion.options[1].option">
            </label>

            <label for="rads3">
                <input type="radio" id="rads3" value="option_3" v-model="answer" />
                <input type="text" v-model="currentQuestion.options[2].option">
            </label>

            <label for="rads4">
                <input type="radio" id="rads4" value="option_4" v-model="answer" />
                <input type="text" v-model="currentQuestion.options[3].option">
            </label>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStoreExam } from "../../store"
import { MutationTypes } from "../../store/exam";
import { optionType } from "../../store/examInterface";

import SwitchBtn from "./SwitchBtn.vue";

const store = useStoreExam();
const answer = ref<optionType>("");

const questions = store.getters.getExamQuestions;
const currentQuestion = computed(() => questions[store.getters.getCurrentQuestion]);
const pickedAnswer = computed(() => {
    if (currentQuestion.value.options[0].answer) return "option_1";
    if (currentQuestion.value.options[1].answer) return "option_2";
    if (currentQuestion.value.options[2].answer) return "option_3";
    if (currentQuestion.value.options[3].answer) return "option_4";

    return "";
});

watch(pickedAnswer, (_new) => {
    answer.value = _new;
});

watch(answer, (ans) => {
    store.commit(MutationTypes.UPDATE_ANSWER, ans);
});
</script>

<style lang="scss" scoped>

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
    
    .QAws {
        width: 100%;
        height: auto;
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    label {
        @include btn_base_style;
        background: $PrimaryWhite !important;
        position: relative;
        padding: 1rem;
        border: 0.5px solid $primaryGray;
        color: $primaryGray;
        cursor: pointer;

        &:hover {
            color: $primaryBlack;
            // color: $PrimaryWhite;
            border: none;
        }
        &:active {
            background: $primaryGreen !important;
            border: 0.5px solid $primaryGray;
        }
        @include mediaQuery_max_width(999px) {
            width: 95%;
            justify-self: right;
        }
        &:first-child {
            &:before {
                content: "Option A";
                position: absolute;
                top: -2.5rem;
                display: block;
                margin: 0.5rem 0;
                z-index: 2;
            }
        }
        &:nth-child(2) {
            &:before {
                content: "Option B";
                position: absolute;
                top: -2.5rem;
                display: block;
                margin: 0.5rem 0;
                z-index: 2;
            }
        }
        &:nth-child(3) {
            &:before {
                content: "Option C";
                position: absolute;
                top: -2.5rem;
                display: block;
                margin: 0.5rem 0;
                z-index: 2;
            }
        }
        &:last-child {
            &:before {
                content: "Option D";
                position: absolute;
                top: -2.5rem;
                display: block;
                margin: 0.5rem 0;
                z-index: 2;
            }
        }
    }
    input[type="radio"] {
        @include btn_base_style;
        position: relative;
        left: -35px;
        // opacity: 0;
    }
    input[type="text"] {
        display: block;
        width: 100%;
        // height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        text-indent: 1rem;
        // background-color: gold;
        // border: none;
    }
    @include mediaQuery_max_width(999px) {
        @include flex_fun(column, space-between, center);
        width: 100%;
        .Qframe,
        .next_pre {
            margin-bottom: 4rem;
        }
        .Qframe {
            height: 600px !important;
        }
        section {
            margin-bottom: 1rem;
        }
    }
}
</style>