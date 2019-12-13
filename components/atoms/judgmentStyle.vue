<template>
  <v-container>
    <v-btn @click="changeJudgeStyle()">Change Judgment Style : {{JudgeStyle}}</v-btn>
  </v-container>
</template>
<script>
export default {
  computed: {
    JudgeStyle(){
      return this.$store.state.listup.judge_style;
    }
  },
  methods: {
    changeJudgeStyle(){
      this.$store.commit("listup/changeJudgeStyle");
    }
  }
}
</script>