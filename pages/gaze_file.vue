<template lang="pug">
  v-app.gaze_file
    .gazefile_container
      v-container
        v-btn(nuxt small to="/") Back
        v-file-input(
          label="File input"
          multiple
          key="jsonfile"
          id="files"
          @change="handleFileSelect"
        )
      FixationPointList(:files="sortedFileData")
      p {{fileInfo.ParticipantName}}
      p {{fileInfo.RecordingDate}} {{fileInfo.RecordingName}}
      GazePointMove(:file="sortedFileData")
      ExpansionFileList(:file="sortedFileData" :type="'gaze'" @DeleteFile="DeleteFile")
</template>
<script>
import ExpansionFileList from "~/components/organisms/ExpansionFileList.vue";
import GazePointMove from "~/components/atoms/gazeData/GazePointMove.vue";
import FixationPointList from "~/components/atoms/gazeData/FixationPointList.vue";

export default {
  components: {
    ExpansionFileList,
    FixationPointList,
    GazePointMove
  },
  computed: {
    fileInfo(){
      let info = this.$store.getters["gazefile/sorted_filename"];
      console.log(info)
      if(info[0]){
        return info[0].data[0]
      }else{
        return '';
      }
    },
    sortedFileData() {
      return this.$store.getters["gazefile/sorted_filename"];
    }
  },
  methods: {
    handleFileSelect(files) {
      //すでにあるファイルをはじく
      let state_file = [...this.$store.state.gazefile.file_data];
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
          let file = {}
          let json_data = JSON.parse(e.target.result);
          file.fileName = f.name;
          file.data = json_data
          data_list.push(file);
          if (data_list.length === unique_files.length) {
            let new_data_list = state_file.concat(data_list);
            this.$store.commit("gazefile/file_update", new_data_list);
            console.log(new_data_list)
          }
        };
        reader.readAsText(f);
      }
    },
    DeleteFile(key){
      this.$store.commit("gazefile/file_delete", key);
    }
  }
}
</script>
<style lang="scss" scoped>
.gazefile_container {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
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
.all_file_wrapper {
  padding-top: 80px;
}
</style>