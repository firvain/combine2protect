<template>
  <v-container grid-list-xl fill-height>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex d-flex xs12 text-xs-center headline>
        Green Check Quiz
      </v-flex>
      <v-flex d-flex xs12> <v-divider></v-divider></v-flex>
      <v-flex xs8 d-flex>
        <v-card flat>
          <v-form
            @submit.prevent="checkAnswers"
            id="check-answers-form"
            ref="myForm"
          >
            <v-flex
              d-flex
              xs12
              v-for="(question, idx) in questions"
              :key="idx"
              pa-0
            >
              <v-layout row wrap align-center>
                <v-flex x12 md4 title text-xs-center pa-0>
                  {{ question.text }}
                </v-flex>
                <v-flex xs12 md8 pa-0>
                  <v-radio-group
                    row
                    v-model="question.choosen"
                    :disabled="disableSubmit"
                  >
                    <v-radio
                      v-for="n in 10"
                      :key="n"
                      :value="n"
                      :label="n.toString()"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-form>
          <v-card-title
            primary-title
            class="title white--text"
            :class="[{ success: score === 1 }, 'error']"
            v-show="showresults"
          >
            <v-spacer></v-spacer>
            Score: {{ (score / 10) * 100 }} %</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              color="primary"
              form="check-answers-form"
              :disabled="disableSubmit"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "TGN",
  data() {
    return {
      score: 0,
      questions: [
        {
          text: "Question 1",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 2",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 3",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 4",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 5",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 6",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 7",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 8",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 9",
          answer: 8,
          choosen: 1
        },
        {
          text: "Question 10",
          answer: 8,
          choosen: 1
        }
      ],
      showresults: false,
      disableSubmit: false
    };
  },
  computed: {
    cardHeight() {
      return window.innerHeight - 250;
    }
  },
  methods: {
    checkAnswers() {
      // const result = this.questions.every(e => e.choosen === e.answer);
      // this.getScore();
      this.questions.forEach(e => {
        if (e.choosen === e.answer) ++this.score;
      });
      this.showresults = true;
      this.disableSubmit = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
