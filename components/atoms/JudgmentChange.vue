<template>
  <div>
    <select v-model="judgmentValue" class="judge_select" @change="updateJudgment(file.fileName,judgment_key,judgment.judge)">
      <option v-for="(op, opk) in judges" :value="op" :key="`opk_${opk}`">{{op}}</option>
    </select>
  </div>
</template>
<script>
export default {
  props:["judgment","judgment_key","file"],
  data(){
    return {
      judges:["","?","◎","○","△","×"]
    }
  },
  computed:{
    judgmentValue:{
      get() {
        let one_user_list = this.$store.getters["listup/sorted_filename"]
        return this.$store.theValue
      },
      set(value) {
        this.$store.dispatch("setTheValue", value)
      }
    }
  },
}
</script>