<template>
  <div class="filelist_container">
    <div style="margin:auto;width:80%;">
      <v-file-input
        label="File input"
        multiple
        key="jsonfile"
        id="files"
        @change="handleFileSelect"
      ></v-file-input>
    </div>
    <div>
      <v-container
        class="grey lighten-5 wrapper_contents"
      >File count : {{this.$store.state.listup.file_data.length}} files</v-container>
    </div>
    <!-- 表示方法別情報 -->
    <DisplayCompareData />
    <!-- ストーリー別情報 -->
    <StoryCompareData />
    <!-- 分布グラフ -->
    <TimeDistribution />

    <Statistics />

    <v-container>
      <v-expansion-panels class="table_wrapper">
        <v-expansion-panel v-for="(file,file_id) in sortedFileData" :key="`fileKey-${file_id}`">
          <v-expansion-panel-header>{{file.fileName}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <DataList :file="file" :file_id="file_id" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<script>
import DataList from "~/components/organisms/DataList.vue";
import DisplayCompareData from "~/components/organisms/DisplayCompareData.vue";
import StoryCompareData from "~/components/organisms/StoryCompareData.vue";
import TimeDistribution from "~/components/molecules/TimeDistribution.vue";
import Statistics from "~/components/atoms/Statistics.vue";
import { isObject } from "util";

export default {
  components: {
    DisplayCompareData,
    StoryCompareData,
    TimeDistribution,
    DataList,
    Statistics
  },
  data() {
    return {
      fileinput_text: "jsonファイルを読み込む"
    };
  },
  computed: {
    sortedFileData() {
      return this.$store.getters["listup/sorted_filename"];
    }
  },
  methods: {
    handleFileSelect(files) {
      //すでにあるファイルをはじく
      let state_file = [...this.$store.state.listup.file_data];
      let file_names = state_file.map(f => f.fileName);
      let unique_files = [];
      for (let i = 0; i < files.length; i++) {
        if (file_names.indexOf(files[i].name) === -1) {
          file_names.push(files[i].name);
          unique_files.push(files[i]);
        }
      }

      let data_list = [];
      for (let i = 0; i < unique_files.length; i++) {
        let f = unique_files[i];
        if (f.type !== "application/json") {
          continue;
        }

        var reader = new FileReader();
        reader.onload = e => {
          let json_data = JSON.parse(e.target.result);
          json_data.fileName = f.name;

          data_list.push(json_data);
          if (data_list.length === unique_files.length) {
            let new_data_list = state_file.concat(data_list);
            this.$store.commit("listup/file_update", new_data_list);
          }
        };
        reader.readAsText(f);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.filelist_container {
  max-width: 1200px;
  margin: auto;
}
.file_upload {
  position: relative;
  display: inline-block;
  padding: 2px 1em;
  border: 3px solid;
}
.file_upload input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}
.table_wrapper {
  padding-top: 80px;
}
</style>