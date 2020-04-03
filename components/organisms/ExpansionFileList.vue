<template>
  <v-container class="all_file_wrapper">
    <h4>ファイル一覧</h4>
    <v-expansion-panels >
      <v-expansion-panel v-for="(file,file_id) in file" :key="`fileKey-${file_id}`">
        <v-expansion-panel-header>
          <div>{{file.fileName}}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn icon small dark @click="DeleteFile(file_id)" color="#ff0000">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <div v-if="type == 'time'">
            <DataList :file="file" :file_id="file_id" />
          </div>
          <div v-if="type == 'gaze'">
            <GazeDataList :file="file" :file_id="file_id" />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
import DataList from "~/components/organisms/DataList.vue";
import GazeDataList from "~/components/organisms/GazeDataList.vue";

export default {
  components: {
    DataList,
    GazeDataList
  },
  props: ["file","type"],
  methods: {
    DeleteFile(id){
      this.$emit('DeleteFile',id)
    }
  }
}
</script>
<style lang="scss" scoped>
.all_file_wrapper {
  padding-top: 80px;
}
</style>