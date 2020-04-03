<template>
  <div>
    <v-container class="grey lighten-5">
      <h4>表示方法別情報</h4>
      <div class="wrapper_contents">
        <v-card class="com_card" outlined>
          <v-card-title>一行表示</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>平均時間(1文字当たり):</v-list-item-content>
              <v-list-item-content class="align-end">{{ OnelineAvgTime }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>解答の正確さ:</v-list-item-content>
              <v-list-item-content class="align-end">{{ onelineAvgAccuracy }}%</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>平均注視回数:</v-list-item-content>
              <v-list-item-content class="align-end">{{ onelineAvgFixation }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card class="com_card" outlined>
          <v-card-title>全体表示</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>平均時間(1文字当たり):</v-list-item-content>
              <v-list-item-content class="align-end">{{ scrollAvgTime }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>解答の正確さ:</v-list-item-content>
              <v-list-item-content class="align-end">{{ scrollAvgAccuracy }}%</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>平均注視回数:</v-list-item-content>
              <v-list-item-content class="align-end">{{ scrollAvgFixation }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    sortedFileData() {
      return this.$store.getters["listup/sorted_filename"];
    },
    scrollAvgTime() {
      let scroll_files = this.$store.getters["listup/scroll_files"]
      return this.AllAvgTime(scroll_files);
    },
    OnelineAvgTime() {
      let oneline_files = this.$store.getters["listup/oneline_files"]
      return this.AllAvgTime(oneline_files);
    },
    scrollAvgAccuracy() {
      let scroll_files = this.$store.getters["listup/scroll_files"]
      return this.AllAccuracy(scroll_files);
    },
    onelineAvgAccuracy() {
      let oneline_files = this.$store.getters["listup/oneline_files"]
      return this.AllAccuracy(oneline_files);
    },
    onelineAvgFixation() {
      let oneline_files = this.$store.getters["listup/oneline_files"]
      return this.AvgFixation(oneline_files);
    },
    scrollAvgFixation() {
      let scroll_files = this.$store.getters["listup/scroll_files"]
      return this.AvgFixation(scroll_files);
    }
  },
  methods: {
    AllTime(data) {
      let alltime = data[data.length - 1].time;
      return alltime;
    },
    AllAvgTime(files) {
      let all_file_time = 0;
      let all_word_count = 0;
      for (let i = 0; i < files.length; i++) {
        all_file_time += this.TimeToNumber(this.AllTime(files[i].data));
        all_word_count += files[i].story.word_count;
      }
      let allAvgTime = this.NumberToTimeWithText(
        all_file_time / all_word_count
      );
      return all_file_time / all_word_count ? allAvgTime : "---";
    },
    AllAccuracy(files){
      let all_accurasy = []
      let judge_style = this.$store.state.listup.judge_style;
      for (let i = 0; i < files.length; i++) {
        let file_accurasy = []
        let delete_file_list = false
        for (let j = 0; j < files[i].judgment.length; j++) {
          switch (files[i].judgment[j].judge) {
            case "◎":
              file_accurasy.push(3);
              break;
            case "○":
              file_accurasy.push(judge_style==='four' ? 2 : 3);
              break;
            case "△":
              file_accurasy.push(judge_style==='four' ? 1 : 0);
              break;
            case "×":
              file_accurasy.push(0);
              break;
            case "?":
              file_accurasy.push('question');
              delete_file_list = true
              break;
            default:
              file_accurasy.push(null);
              break;
          }
        }
        if(delete_file_list === false){
          all_accurasy.push(...file_accurasy);
        }
      }
      let sum_accuracy = 0
      let max_accuracy = 0
      for (let i = 0; i < all_accurasy.length; i++) {
        if(all_accurasy[i] !== null){
          sum_accuracy += all_accurasy[i]
          max_accuracy += 3
        }
      }
      if(max_accuracy !== 0) {
        return this.OrgFloor((sum_accuracy/max_accuracy)*100,2)
      }else{
        return "//"
      }
    },
    AvgFixation(files){
      let avg_fix = 0
      let avg_count = 0
      for (let i = 0; i < files.length; i++) {
        if(files[i].maxFixation){
          avg_fix += files[i].maxFixation
          avg_count++
        }
      }
      return this.OrgFloor(avg_fix / avg_count,2) || '//'
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper_contents {
  display: flex;
}
.com_card {
  width: 100%;
  margin: 4px;
}
</style>