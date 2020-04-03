<template lang="pug">
  .FixationPointList
    .one_file(v-for="(file, file_id) in FixationPointList")
      p {{file.maxFixation}}
      p {{file.recordingDate}}
      p {{file.author}}
      p {{file.testingTime}}
      p {{file.whiteOut}}
      p {{file.story}}
</template>
<script>
export default {
  props:["files"],
  computed:{
    FixationPointList(){
      let newlist = []
      for (let i = 0; i < this.files.length; i++) {
        let newObj = {}
        const file = this.files[i];
        newObj.fileName = file.fileName
        newObj.author = file.data[0].ParticipantName
        newObj.recordingDate = file.data[0].RecordingDate
        let fileNameArr = file.fileName.split('_')
        newObj.testingTime = fileNameArr[2].slice( -2 )
        newObj.whiteOut = fileNameArr[3]==="on" ? 'Oneline' : 'Scroll'
        newObj.story = fileNameArr[4].slice( 2, -5 )
        newObj.maxFixation = this.maxFixation(file.data)
        newlist.push(newObj)
      }
      console.log(newlist)
      this.$store.commit("listup/addGazeData",newlist);
      return newlist
    }
  },
  methods: {
    maxFixation(data){
      let fixationIndexArr = data.map(obj => obj["FixationIndex"]).filter(i => i)
      return fixationIndexArr[fixationIndexArr.length - 1]
    }
  }
}
</script>