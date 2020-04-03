<template lang="pug">
  .gazedatalist

</template>
<script>
export default {
  props: ["file", "file_id"],
  data() {
    return {};
  },
  computed: {
    FileName() {
      var files = this.file.fileName;
    },
    FileDataTable() {
      if(this.file.data){
        let d = this.file.data;
        for (let i = 0; i < d.length - 1; i++) {
          d[i].stayTime = this.StayTime(d[i].time, d[i + 1].time);
        }
        return d;
      }
      return []
    },
  },
  methods: {
  }
};
</script>