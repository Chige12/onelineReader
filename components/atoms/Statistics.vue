<template>
  <v-container>
    <div class="user_name_list">
      <div
        v-for="(p_val,p_val_key) in val_tTestTwoSampleList"
        :key="`tTestTwoSample${p_val_key}`"
        class="user_name_box"
      >{{OrgFloor(p_ttest(p_val,n),4)}}</div>
    </div>
    <div class="p_of_all_data">
      <div>平均値の差の検定（t検定）：{{OrgFloor(val_tTestTwoSample,8)}}</div>
      <div>n：{{n}}, => p値：{{OrgFloor(p_ttest(val_tTestTwoSample,n),8)}} （0.05以下で優位性あり）</div>
    </div>
  </v-container>
</template>
<script>
import { tTestTwoSample } from "simple-statistics";
import { jStat } from "jstat";

export default {
  data() {
    return {
      sampleX: [4, 1, 46, 24, 12, 61, 6, 26],
      sampleY: [3, 5, 8, 21, 73, 13, 34, 53],
      n: 24
    };
  },
  computed: {
    val_tTestTwoSample() {
      const oneline_data = this.AverageList(
        this.$store.getters["listup/oneline_files"]
      );
      const scroll_data = this.AverageList(
        this.$store.getters["listup/scroll_files"]
      );
      this.n =
        oneline_data.length <= scroll_data.length
          ? oneline_data.length
          : scroll_data.length;
      return tTestTwoSample(oneline_data, scroll_data, 0);
    },
    val_tTestTwoSampleList() {
      const sorted_filename = this.$store.getters["listup/sorted_filename"];
      const unique_users = this.$store.getters["listup/unique_users"];
      let user_tTestTwoSample = [];
      for (const iu in unique_users) {
        const user_oneline_data = this.AverageList(
          sorted_filename.filter(f => {
            return f.name === unique_users[iu] && f.whiteout === true;
          })
        );
        const user_scroll_data = this.AverageList(
          sorted_filename.filter(f => {
            return f.name === unique_users[iu] && f.whiteout === false;
          })
        );
        if (user_scroll_data.length > 1 && user_oneline_data.length > 1) {
          let tTTS = tTestTwoSample(user_oneline_data, user_scroll_data, 0);
          user_tTestTwoSample.push(tTTS);
        } else {
          user_tTestTwoSample.push(0);
        }
      }
      return user_tTestTwoSample;
    }
  },
  methods: {
    p_ttest(tscore, n) {
      return jStat.ttest(tscore, n);
    },
    AverageList(file) {
      let average_list = [];
      for (let i = 0; i < file.length; i++) {
        let onefile = file[i];
        let average =
          this.TimeToNumber(onefile.data[onefile.data.length - 1].time) /
          onefile.story.word_count;
        average_list.push(average);
      }
      return average_list;
    }
  }
};
</script>

<style lang="scss" scoped>
.p_of_all_data {
  padding: 20px 0;
}
</style>