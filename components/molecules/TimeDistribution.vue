<template>
  <v-container>
    <h4>被験者別1文字当たりの時間分布</h4>
    <ScatterChart :data="UserTimeDataSets"/>
    <div class="user_name_list">
      <div v-for="(user,user_key) in UniqueUsers()" :key="`UTD_key_${user_key}`" class="user_name_box">{{user}}</div>
    </div>
  </v-container>
</template>
<script>
import colors from "vuetify/es5/util/colors";
import ScatterChart from "~/components/atoms/ScatterChart.vue"
export default {
  components: {
    ScatterChart,
  },
  computed:{
    UserTimeDataSets(){
      let datasets = []
      let lavels = ['Oneline','Scroll']
      for (let i = 0; i < lavels.length; i++) {
        let unique_users = this.UniqueUsers()
        let users_list = this.UsersList()
        let xy_dataset = []
        for (let iu = 0; iu < unique_users.length; iu++) {
          let user_data = users_list.find(val => {return val.name === unique_users[iu]}).files
          for (let io = 0; io < user_data.length; io++) {
            let xy_obj = {}
            if(lavels[i]==='Scroll' && user_data[io].whiteout === false){
              xy_obj.x = iu
              xy_obj.y = this.TimePerWordCount(user_data[io])
              xy_dataset.push(xy_obj)
            }
            if(lavels[i]==='Oneline' && user_data[io].whiteout === true){
              xy_obj.x = iu
              xy_obj.y = this.TimePerWordCount(user_data[io])
              xy_dataset.push(xy_obj)
            }
          }
        }
        let lavel_data = {}
        lavel_data.data = xy_dataset
        lavel_data.label = lavels[i]
        lavel_data.backgroundColor = lavels[i]==='Oneline' ? colors.red.lighten1 : colors.blue.lighten1
        datasets.push(lavel_data)
      }
      console.log("datasets",datasets)
      return datasets
    }
  },
  methods:{
    UniqueUsers() {
      return this.$store.getters["listup/unique_users"]
    },
    UsersList() {
      let users_list = this.UniqueUsers();
      let user_data_list = [];
      for (let i = 0; i < users_list.length; i++) {
        let user_data_list_once = {}
        let one_users_list = this.$store.getters[
          "listup/sorted_filename"
        ].filter(f => f.name === users_list[i]);
        user_data_list_once.user_key = `user_${this.zeroPadding(i,3)}`
        user_data_list_once.name = users_list[i]
        user_data_list_once.files = one_users_list
        user_data_list.push(user_data_list_once);
      }
      return user_data_list;
    },
    TimePerWordCount(files){
      let time = this.TimeToNumber(files.data[files.data.length - 1].time)
      return time / files.story.word_count
    }
  }
}
</script>

<style lang="scss">
.user_name_list {
  display: flex;
  flex-wrap: nowrap;
  padding-left: 25px;
  padding-right: 8px;//56px;
}
.user_name_box {
  width: 100%;
  writing-mode: vertical-rl;
}
</style>