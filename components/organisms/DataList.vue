<template>
  <div>
    <p>{{FileDay}}</p>
  </div>
</template>
<script>
export default {
  props:['file','file_id'],
  data(){
    return {

    }
  },
  computed:{
    FileDay(){
      var files = this.file.fileName.split('_')
      return `日付: ${files[0].split('-').join('/')}　時刻: ${files[1].split('-').join(':')}　物語: ${files[3]}. ${this.file.story.title}　被験者: ${this.file.name}`
    }
  }
}
</script>

