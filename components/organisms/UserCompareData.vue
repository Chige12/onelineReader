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
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
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
        user_data_list_once.name = user_list[i]
        user_data_list_once.files = one_user_list
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
</style>