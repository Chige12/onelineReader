<template>
  <div>
    <div style="margin:auto;width:80%;">
      <v-file-input label="File input" multiple key="jsonfile" id="files" @change="handleFileSelect"></v-file-input>
    </div>

    <div class="table_wrapper" v-for="(file,file_id) in sortedFileData" :key="`fileKey-${file_id}`">
      <DataList :file="file" :file_id="file_id"/>
    </div>
  </div>
</template>
<script>
import DataList from '~/components/organisms/DataList.vue'
import { isObject } from 'util';

export default {
  components:{
    DataList
  },
  data() {
    return {
      fileinput_text: "jsonファイルを読み込む"
    };
  },
  computed:{
    sortedFileData(){
      return this.$store.getters['listup/sorted_filename']
    }
  },
  methods: {
    handleFileSelect(files) {
      let file_names = this.$store.getters['listup/sorted_filename'].map(f => f.fileName);
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
        reader.onload = (e) => {
            let json_data = JSON.parse(e.target.result);
            json_data.fileName = f.name;

            data_list.push(json_data);
            if (data_list.length === unique_files.length) {
              this.$store.commit('listup/file_update', data_list);
            }
        }
        reader.readAsText(f);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
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
</style>