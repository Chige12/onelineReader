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