<template>
  <div>
    <select v-model="judgmentValue" class="judge_select">
      <option v-for="(op, opk) in judges" :value="op" :key="`opk_${opk}`">{{op}}</option>
    </select>
  </div>
</template>
<script>
export default {
  props:["judge","judgment_key","file"],
  data(){
    return {
      judges:["","?","◎","○","△","×"]
    }
  },
  computed:{
    judgmentValue:{
      get() {
        return this.judge
      },
      set(value) {
        let data_ary = {}
        data_ary.judge = value
        data_ary.judgment_key = this.judgment_key
        data_ary.file_name = this.file.fileName
        this.$store.commit("listup/judgmentUpdate", data_ary)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.judge_select {
  padding: 0 4px;
  text-align: center;
}
</style>