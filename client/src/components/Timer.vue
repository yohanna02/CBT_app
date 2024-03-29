<template>
    <div class="timer">
        <span class="hours">{{displayHours}}</span>:
        <span class="minuts">{{displayMinutes}}</span>:
        <span class="secs">{{displaySeconds}}</span>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStoreExam } from "../store";
import { MutationTypes, ActionTypes } from "../store/exam";

const examStore = useStoreExam();

const displayHours = ref("00");
const displayMinutes = ref("00");
const displaySeconds = ref("00");

const _seconds = computed(() => 1000);
const _minutes = computed(() => _seconds.value * 60);
const _hours = computed(() => _minutes.value * 60);
const _days = computed(() => _hours.value * 24);

const examEndTime = computed(() => examStore.getters.getExamEndTime.getTime());

const examStatus = computed(() => examStore.getters.getExamStatus);

let timer: NodeJS.Timer;

const submitExams = () => {
    try {
        examStore.commit(MutationTypes.CHANGE_AUTO_SUBMIT, true);
        examStore.dispatch(ActionTypes.SUBMIT_EXAMS);
    } catch(error) {
        console.error(error);
    }
}

const formatNum = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const showRemaining = () => {
    timer = setInterval(() => {
        const now = new Date();
        const distance = examEndTime.value - now.getTime();

        if (distance < 0) {
            submitExams();
            clearInterval(timer);
            return;
        }

        const hours = Math.floor((distance % _days.value) / _hours.value);
        const minutes = Math.floor((distance % _hours.value) / _minutes.value);
        const seconds = Math.floor((distance % _minutes.value) / _seconds.value);
        
        displayHours.value = formatNum(hours);
        displayMinutes.value = formatNum(minutes);
        displaySeconds.value = formatNum(seconds);
    }, 1000);
}

watch(examStatus, (_new) => {
    if (!_new) {
        clearInterval(timer);
    }
});

onMounted(() => {
    showRemaining();
});

</script>

<style lang="scss" scoped>

.timer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $PrimaryRed;
    span {
        // background: brown;
        display: inline-block;
        padding: .4rem;
        margin: 0.5rem;
        font-weight: bold;
        box-shadow: 0.5px 0.5px 5px $primaryGray;
    }
}
</style>

