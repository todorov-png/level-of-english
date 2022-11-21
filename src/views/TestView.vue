<template>
    <div class="content">
        <h2>{{ getTestName }}</h2>
        <div v-for="(question, indexQuestions) in questions" :key="indexQuestions" class="question">
            <p class="question__title">{{ `${indexQuestions + 1}) ${question.title}` }}</p>
            <div class="question__answers">
                <label
                    v-for="(answer, indexAnswer) in question.answers"
                    :key="indexAnswer"
                    :class="statusCheck && answer.value ? 'correct' : ''"
                >
                    <input
                        type="radio"
                        :name="indexQuestions"
                        @click="question.selected = indexAnswer"
                        :disabled="statusCheck"
                    />
                    {{ answer.text }}
                </label>
            </div>
        </div>
        <button type="button" @click="checkAnswers">Check</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TestView',
    emits: ['pop-up'],
    data() {
        return {
            answersUser: [],
            questions: [],
            statusCheck: false,
        };
    },
    async created() {
        if (!(await this.checkAuth())) this.$router.push({ name: 'auth' });
        this.questions = this.sortArrayQuestions();
    },
    computed: mapGetters(['getTestName', 'getTestQuestions']),
    methods: {
        ...mapActions(['checkAuth']),
        sortArrayQuestions() {
            const questionsLength = this.getTestQuestions.length;
            const allСycles = questionsLength < 20 ? questionsLength : 20;
            const arrayIndex = [];
            const arrayQuestions = [];

            for (let i = 0; i < questionsLength; i++) {
                arrayIndex.push(i);
            }
            for (let i = 0; i < allСycles; i++) {
                arrayIndex.splice(Math.random() * questionsLength, 1)[0];
            }
            for (let i = 0; i < allСycles; i++) {
                arrayQuestions.push(this.getTestQuestions[arrayIndex[i]]);
            }
            return arrayQuestions;
        },
        checkAnswers() {
            this.statusCheck = true;
            let counterAnswers = 0;
            this.questions.forEach(question => {
                if (
                    Object.prototype.hasOwnProperty.call(question, 'selected') &&
                    question.answers[question.selected].value
                ) {
                    counterAnswers++;
                }
            });
            this.$emit('pop-up', {
                title: `Result ${this.getTestName}`,
                text: `You gave ${counterAnswers} correct answers. Your level is ${this.levelDetection(
                    counterAnswers
                )}`,
            });
        },
        levelDetection(answers) {
            let result = '';
            switch (true) {
                case answers < 2:
                    result = 'STARTER';
                    break;
                case answers < 3:
                    result = 'BEGGINER 1';
                    break;
                case answers < 5:
                    result = 'BEGGINER 2';
                    break;
                case answers < 7:
                    result = 'ELEMENTARY 1';
                    break;
                case answers < 10:
                    result = 'ELEMENTARY 2';
                    break;
                case answers < 11:
                    result = 'PRE-INTERMIDIATE 1';
                    break;
                case answers < 12:
                    result = 'PRE-INTERMIDIATE 2';
                    break;
                case answers < 13:
                    result = 'INTERMIDIATE 1';
                    break;
                case answers < 14:
                    result = 'INTERMIDIATE 2';
                    break;
                case answers < 15:
                    result = 'UPPER-INTERMIDIATE 1';
                    break;
                case answers < 16:
                    result = 'UPPER-INTERMIDIATE 2';
                    break;
                case answers < 17:
                    result = 'ADVANCED 1';
                    break;
                case answers < 18:
                    result = 'ADVANCED 2';
                    break;
                case answers < 19:
                    result = 'MASTER 1';
                    break;
                default:
                    result = 'MASTER 2';
                    break;
            }
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
h2 {
    margin: 0 auto 20px;
    text-align: center;
    font-size: 30px;
    line-height: 130%;
}
.question {
    border: 2px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 18px;
    &__title {
        margin: 0 0 5px;
    }
    &__answers {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        label {
            display: inline-flex;
            cursor: pointer;
            margin-bottom: 5px;
            input {
                width: 16px;
                height: 16px;
            }
            &.correct {
                color: green;
            }
        }
    }
}
button {
    min-width: 100px;
    font-family: inherit;
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: #DDC5A2;
    color: #fff;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background: #301B28;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 4px #301B28;
    }
}
</style>
