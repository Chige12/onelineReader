<template>
  <div>
    <v-container class="grey lighten-5" v-if="UserList!==[]">
      <h4>ユーザー別情報</h4>
      <div class="wrapper_contents">
        <v-card
          class="com_card"
          outlined
          v-for="(user_list,user_key) in UserList()"
          :key="`user_datalist_${user_key}`"
        >
          <v-card-title>{{user_list.name}}</v-card-title>
          <v-divider></v-divider>
          <ScatterChart :data="UserStoryTimeDataSets(user_list.files)" :xticks="xticks"/>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">読み順</th>
                  <th class="text-left">UI読み順</th>
                  <th class="text-left">平均読み時間</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, utl_key) in userTableList(user_list.files)" :key="`utl_${utl_key}`">
                  <td>{{ item.story }}</td>
                  <td>{{ item.ui }}</td>
                  <td>{{ item.avgTime }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
          <div v-for="(file, file_key) in user_list.files" :key="`file_${file_key}`">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{file_key+1}}. 模範解答</th>
                    <th class="text-left">解答</th>
                    <th class="text-left">正確性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(judgment, judgment_key) in file.judgment" :key="`judgment_${judgment_key}`">
                    <td>{{ judgment.Model }}</td>
                    <td>{{ judgment.Answer }}</td>
                    <td>
                      <JudgmentChange :judgment="judgment" :judgment_key="judgment_key" :file="file"/>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-divider></v-divider>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import colors from "vuetify/es5/util/colors";
import ScatterChart from "~/components/atoms/ScatterChart.vue"
import JudgmentChange from "~/components/atoms/JudgmentChange.vue"
export default {
  data() {
    return {
      xticks : {
        max: 8,
        min: 1,
        stepSize: 1
      },
    };
  },
  components: {
    ScatterChart,
    JudgmentChange
  },
  methods: {
    updateJudgment(file_name,judgment_key,judge){
      this.$store.commit("listup/judgmentUpdate", {file_name:file_name,judgment_key:judgment_key,judge:judge});
    },
    AddJudgeFile(list){
      for (let file_key = 0; file_key < list.length; file_key++) {
        for (let jud_key = 0; jud_key < list[file_key].judgment.length; jud_key++) {
          if(list[file_key].judgment[jud_key].judge === undefined){
            list[file_key].judgment[jud_key].judge = "?"
          }
        }
      }
      return list
    },
    UserStoryTimeDataSets(files){
      let datasets = []
      let lavels = ['Oneline','Scroll']
      for (let i = 0; i < lavels.length; i++) {
        let xy_dataset = []
        for (let file_key = 0; file_key < files.length; file_key++) {
          let xy_obj = {}
          if(lavels[i]==='Scroll' && files[file_key].whiteout === false){
            xy_obj.x = file_key+1
            xy_obj.y = this.TimePerWordCount(files[file_key])
          }
          if(lavels[i]==='Oneline' && files[file_key].whiteout === true){
            xy_obj.x = file_key+1
            xy_obj.y = this.TimePerWordCount(files[file_key])
          }
          xy_dataset.push(xy_obj)
        }
        let lavel_data = {}
        lavel_data.data = xy_dataset
        lavel_data.label = lavels[i]
        lavel_data.backgroundColor = lavels[i]==='Oneline' ? colors.red.lighten1 : colors.blue.lighten1
        datasets.push(lavel_data)
      }
      return datasets
    },
    UniqueUser() {
      return this.$store.getters["listup/unique_users"]
    },
    UserList() {
      let user_list = this.UniqueUser();
      let user_data_list = [];
      for (let i = 0; i < user_list.length; i++) {
        let user_data_list_once = {}
        let one_user_list = this.$store.getters[
          "listup/sorted_filename"
        ].filter(f => f.name === user_list[i]);
        let one_user_judge_list = this.AddJudgeFile(one_user_list)
        user_data_list_once.name = user_list[i]
        user_data_list_once.files = one_user_judge_list
        user_data_list.push(user_data_list_once);
      }
      console.log(user_data_list)
      return user_data_list;
    },
    userTableList(files){
      let usl = []
      for (let i = 0; i < files.length; i++) {
        let usl_obj = {}
        usl_obj.story = `${files[i].story.id.split('_')[1]}. ${files[i].story.title}`
        usl_obj.ui = files[i].whiteout ? 'Oneline':'Scroll'
        usl_obj.avgTime = this.AvgTime(files[i])
        usl.push(usl_obj)
      }
      return usl
    },
    AllTime(data) {
      let alltime = data[data.length - 1].time;
      return alltime;
    },
    AvgTime(file){
      let time = this.TimeToNumber(this.AllTime(file.data))
      let word_count = file.story.word_count;
      let AvgTime = this.NumberToTimeWithText(time / word_count);
      return AvgTime;
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
    TimePerWordCount(files){
      let time = this.TimeToNumber(files.data[files.data.length - 1].time)
      return time / files.story.word_count
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper_contents {
  display: flex;
  flex-wrap: wrap;
}
.com_card {
  width: calc(50% - 8px);
  margin: 4px;
}
thead {
  background: #eee;
}
.judge_select {
  padding: 0 4px;
  text-align: center;
}
</style>