<template>
    <div class="container">
        <button @click="showModal = true">Set Question</button>
        <div class="wrapper">
            <QuestionsAndOptions />
            <QuestionsList />
        </div>
        <VueFinalModal v-model="showModal" classes="modal-container" content-class="modal-content">
            <button type="button" class="modal__close" @click="showModal = false">
                &times;
            </button>
            <span class="modal__title">Exams Options</span>
            <div class="modal__content">
                <form>
                    <div class="form-group">
                        <label for="date-and-time">Date and Time</label>
                        <input type="datetime-local" id="date-and-time" v-model="examTime.timeAndDate">
                    </div>
                    <div class="form-group">
                        <label for="exam-duration">Exam Duration</label>
                        <select id="exam-duration" v-model="examTime.duration">
                            <option value="" disabled>--Select Exam's Duration--</option>
                            <option value="30-m">30 Minutes</option>
                            <option value="1-h">1 Hour</option>
                            <option value="2-h">2 Hour</option>
                            <option value="3-h">3 Hour</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exam-duration">Class</label>
                        <select id="exam-duration" v-model="classId">
                            <option value="" disabled>--Select Class--</option>
                            <option 
                                v-for="_class in classList" 
                                :key="_class._id"
                                :value="_class._id"
                             >{{_class.name}}</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal__action">
                <button @click="setExams">confirm</button>
                <button @click="showModal = false">cancel</button>
            </div>
        </VueFinalModal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal'
import QuestionsAndOptions from '../../components/Questions/QuesttionsAndOptions.vue';
import QuestionsList from '../../components/Questions/QuestionsList.vue';

import { useStoreExam, useStore } from '../../store';
import { ActionTypes } from '../../store/admin';
import { MutationTypes } from '../../store/exam';

const store = useStoreExam();
const adminStore = useStore();

const classId = ref("");
const examTime = computed(() => store.getters.getDateAndTime);
const classList = computed(() => adminStore.getters.getClasses);

const showModal = ref(false);

const setExams = async () => {
    try {
        store.commit(MutationTypes.SET_CLASS_ID, classId.value);
        console.log(store.getters.getExams);
    } catch(err) {

    }
}

onMounted(async () => {
    await adminStore.dispatch(ActionTypes.FETCH_CLASS_LIST);
});

</script>

<style lang="scss" scoped>
// @use "../../assets/styles/abstracts" as *;
// @use "../../assets/styles/resets" as *;
// @use "../../assets/styles/mixins" as *;

.container {
    &> button {
        margin: 0 0 0 auto;
        display: block;
        padding: 1rem;
        border-radius: 6px;
        border: none;
        @include btn_base_style;
        color: white;

        &:hover {
            @include btn_base_style_hover;
        }

        &:active {
            @include btn_base_style_active(white);
            border: 1px solid $primaryBlue;
        }
    }
    .wrapper {
        // position: relative;
        width: 100%;
        min-height: fit-content !important;
        background: inherit;
        @include flex_fun(row, space-between, center);
        padding: 2rem 0;
        @include mediaQuery_max_width(999px) {
            @include flex_fun(column, space-between, center);
        }
    }

    ::v-deep .modal-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ::v-deep .modal-content {
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
            padding: .4rem;   
        }  
    }
    .modal__title {
        margin: 0 2rem 0 0;
        font-size: 1.5rem;
        font-weight: 700;
    }
    .modal__content {
        padding: .5rem;
        flex-grow: 1;
        overflow: auto;
    }

    .modal__action {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        padding: 1rem 0 0;
        gap: 2rem;

        button {
            padding: .7rem;

            &:first-child {
                @include btn_base_style($primaryGreen, $primaryBGColor);
            }

            &:last-child {
                @include btn_base_style($PrimaryRed, $primaryBGColor);
            }
        }
    }
}
</style>