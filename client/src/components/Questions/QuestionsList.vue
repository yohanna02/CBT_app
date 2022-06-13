<template>
    <div class="second">
        <div class="Quetions">
            <div class="Qheader">
                <h3>Quetion List</h3>
                <span>{{`${currentIndex + 1}/${questions.length}`}}</span>
            </div>
            <ul>
                <li 
                    :class="{
                        active: index === currentIndex,
                        Answered: store.getters.getStudentAnswer[index]
                    }" 
                    v-for="(question, index) in questions"
                    :key="index"
                    @click="setCurrentQuestion(index)"
                >
                    {{`Question ${index + 1}`}}
                </li>
                <li @click="addQuestion" v-if="route.path === '/admin/adminquesions'">
                    <img src="../../assets/plus.svg" alt="..." />
                </li>
            </ul>
            <button 
                v-if="route.path !== '/admin/adminquesions'" 
                class="submit-btn"
                @click="submitExams"
            >
                Submit
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStoreExam } from "../../store";
import { MutationTypes, ActionTypes } from "../../store/exam";

const store = useStoreExam();
const route = useRoute();

const questions = store.getters.getExamQuestions;

const setCurrentQuestion = (questionIndex: number) => {
    store.commit(MutationTypes.SET_CURRENT_QUESTION, questionIndex);
}

const currentIndex = computed(() => store.getters.getCurrentQuestion);

const addQuestion = () => {
    store.commit(MutationTypes.ADD_QUESTION);
}

const submitExams = () => {
    try {
        store.commit(MutationTypes.CHANGE_AUTO_SUBMIT, false);
        store.dispatch(ActionTypes.SUBMIT_EXAMS);
    } catch(error) {
        console.error(error);
    }
}
</script>

<style lang="scss" scoped>

.second {
    width: 50%;
    height: 100vh;
    @include flex_fun(column, space-between, flex-end);
    & > div {
        &:first-child {
            margin-bottom: 2rem;
            button[type="submit"] {
                @include btn_base_style;
                padding: 1rem 5rem;
                color: $PrimaryWhite;
                font: calc($fontsize - 5px);
                background: $PrimaryRed;
                &:hover {
                    background: darken($color: $PrimaryRed, $amount: 15);
                }
            }
        }
        &:last-child {
            display: block;
            width: 70%;
            min-height: fit-content;
            background: $PrimaryWhite;
            padding: 2rem;
            padding-bottom: 0;
            border: 1px solid $primaryGray;
            border-radius: $border_radius;
            .Qheader {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                h3 {
                    width: 60%;
                    color: $primaryGray;
                    font-size: calc($fontsize * 1.5);
                }
                span {
                    width: 40%;
                    color: $primaryGray;
                    font-size: calc($fontsize * 1.5);
                    text-align: center;
                }
            }
            ul {
                display: block;
                width: 100%;
                height: 70vh;
                overflow-y: scroll;
                li {
                    display: block;
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 1px solid $primaryGray;
                    margin: 1rem 0;
                    border-radius: $border_radius;
                    color: $primaryGray;
                    cursor: pointer;

                    &:hover, &.active {
                        background: $primaryBlue;
                        color: #fff;
                    }

                    &:last-child {
                        display: grid !important;
                        place-items: center;
                        img {
                            width: 20px;
                            height: 20px;
                        }
                        &:hover {
                            background: darken(
                                $color: $primaryGreen,
                                $amount: 15
                            );
                        }
                        // &:active {
                        //     background: $PrimaryRed;
                        // }
                    }
                }
                // a {
                //     color: $primaryGray;
                // }
            }

            .submit-btn {
                background-color: $PrimaryRed;
                border: none;
                padding: .8rem 0;
                color: white;
                margin-bottom: .5rem;
                border-radius: 6px;
                cursor: pointer;
                width: 100%;

                &:hover {
                    background-color: darken($PrimaryRed, 10%);
                }
            }
        }
    }
    @include mediaQuery_max_width(999px) {
        width: 100%;
        margin: 2rem 0 1rem 0;
        @include flex_fun(column-reverse, space-between, center);
        div {
            width: 100% !important;
            &:first-child {
                margin: 1rem 0;
                button {
                    width: 100%;
                }
            }
        }
    }
}

.Answered {
    background: $primaryGreen;
    a {
        color: $PrimaryWhite !important;
    }
    &:hover {
        background: darken($color: $primaryGreen, $amount: 15);
    }
}
</style>