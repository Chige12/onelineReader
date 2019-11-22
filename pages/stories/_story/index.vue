<template>
  <div>
    <div class="reader">
      <div class="container" id="container">
        <h2>
          <a :href="link">{{ title }}</a>
        </h2>
        <p>著者：{{ writer }}</p>
        <div v-html="bodyHtml" ref="documentBody" class="documentBody"></div>
      </div>
    </div>
    <Whiteout />
    <StopWatch @reset="reset" />
  </div>
</template>

<script>
import StopWatch from "~/components/atoms/stopWatch.vue";
import Whiteout from "~/components/atoms/whiteout.vue";
import summaryJson from "~/contents/summary.json";
import { SlowBuffer } from "buffer";
export default {
  components: {
    Whiteout,
    StopWatch
  },
  data() {
    return {
      nowrow: null,
      rowlist: [],
      whiteupperH: 16
    };
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(
      `contents/posts/${params.story}.md`
    );
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/json/${params.story}.json`), {
      params
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.firstLoad()
      setTimeout(() => this.firstLoad(), 500)
    });
  },
  created() {
    if (process.browser) {
      window.addEventListener("keydown", this.KeydownEvent);
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("keydown", this.KeydownEvent);
    }
  },
  methods: {
    firstLoad() {
      this.rowlist = this.$refs.documentBody.getElementsByTagName("p");
      let whiteout_upper = document.getElementById("whiteout_upper");
      if (whiteout_upper) {
        this.whiteupperH = whiteout_upper.clientHeight;
      }else{
        console.log("whiteout_upper is "+ whiteout_upper)
      }
      for (let i = 0; i < this.rowlist.length; i++) {
        this.rowlist[i].setAttribute("id", `pg_${i}`);
      }
      let questionArray = [];
      let questionNumber = 1;
      while (eval(`this.question_${questionNumber}`)) {
        questionArray.push({
          Q: `${eval(`this.question_${questionNumber}`)}`,
          A: `${eval(`this.answer_${questionNumber}`)}`
        });
        questionNumber++;
      }
      this.$store.commit("questionData", questionArray);

      let storyData = {
        id: this.$route.params.story,
        title: this.title,
        word_count_space: this.word_count_space,
        word_count: this.word_count,
        paragraphs: this.paragraphs
      };
      this.$store.commit("storyData", storyData);
    },
    reset() {
      this.nowrow = null;
    },
    KeydownEvent(e) {
      this.$store.dispatch("KeyDown", e);

      if (e.key === "ArrowUp") {
        this.arrowScrollUp(e);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.arrowScrollDown(e);
      }
      if (e.key === "Enter") {
        this.PressEnter();
      }
    },
    arrowScrollUp(e) {
      let height;
      if (this.nowrow === 0) {
        this.nowrow = null;
      }
      if (this.nowrow > 0) {
        e.preventDefault();
        height = this.rowlist[this.nowrow - 1].clientHeight / 2;
        this.$scrollTo(`#pg_${this.nowrow - 1}`, 100, {
          offset: -this.whiteupperH + height
        });
        this.nowrow--;
      }
      this.$store.commit("updateData", {
        key: "ScrollUp",
        row: this.nowrow,
        height: height
      });
    },
    arrowScrollDown(e) {
      let height;
      if (this.nowrow === null) {
        height = this.rowlist[0].clientHeight / 2;
        this.$scrollTo(`#pg_0`, 100, { offset: -this.whiteupperH + height });
        this.nowrow = 0;
      } else if (0 <= this.nowrow && this.nowrow < this.rowlist.length - 1) {
        height = this.rowlist[this.nowrow + 1].clientHeight / 2;
        this.$scrollTo(`#pg_${this.nowrow + 1}`, 100, {
          offset: -this.whiteupperH + height
        });
        this.nowrow++;
      }
      this.$store.commit("updateData", {
        key: "ScrollDown",
        row: this.nowrow,
        height: height
      });
    },
    PressEnter() {
      this.$store.commit("updateData", {
        key: "Enter",
        row: null,
        height: null
      });
    }
  }
};
</script>

<style>
.reader {
  padding: calc(50vh - 2rem) 0 calc(50vh - 2rem);
}
.container {
  max-width: 980px;
  margin: auto;
}
.documentBody p {
  line-height: 1.5;
  margin: 20px 0;
}
</style>
