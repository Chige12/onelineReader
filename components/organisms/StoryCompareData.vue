<template>
  <div>
    <v-container class="grey lighten-5" v-if="StoryList!==[]">
      <h4>ストーリー別情報</h4>
      <div class="wrapper_contents">
        <v-card
          class="com_card"
          outlined
          v-for="(story_list,story_key) in StoryList()"
          :key="`story_datalist_${story_key}`"
        >
          <v-card-title>{{story_list.story.title}}</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>文字数(空白なし):</v-list-item-content>
              <v-list-item-content class="align-end">{{story_list.story.word_count}}</v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>段落数:</v-list-item-content>
              <v-list-item-content class="align-end">{{story_list.story.paragraphs}}</v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>被験者数:</v-list-item-content>
              <v-list-item-content class="align-end">{{story_list.files.length}}</v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>平均時間(1文字当たり):</v-list-item-content>
              <v-list-item-content class="align-end">{{StoryAvgTime(story_key)}}</v-list-item-content>
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
    
  },
  methods: {
    UniqueStory() {
      return this.$store.getters["listup/unique_stories"]
    },
    StoryList() {
      let story_list = this.UniqueStory();
      let story_data_list = [];
      for (let i = 0; i < story_list.length; i++) {
        let story_data_list_once = {}
        let one_story_list = this.$store.getters[
          "listup/sorted_filename"
        ].filter(f => f.story.id === story_list[i].id);
        story_data_list_once.story = story_list[i]
        story_data_list_once.files = one_story_list
        story_data_list.push(story_data_list_once);
      }
      return story_data_list;
    },
    StoryAvgTime(story_key) {
      let one_story_files = this.StoryList()[story_key].files
      return this.AllAvgTime(one_story_files);
    },
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
  flex-wrap: wrap;
}
.com_card {
  width: calc(33.33% - 8px);
  margin: 4px;
}
</style>