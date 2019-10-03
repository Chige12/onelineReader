<template>
  <div>
    <p>{{FileDay}}</p>
    <table class="table">
      <tr class="table_header">
        <th>Number</th>
        <th>Press Key</th>
        <th>Time</th>
        <th>Row</th>
        <th>Row Height</th>
        <th>Stay Time</th>
        <th>Word</th>
      </tr>
      <tr class="table_row" v-for="(action,action_id) in FileDataTable" :key="`actionKey-${action_id}`">
        <td>{{action_id+1}}</td>
        <td>{{action.key}}</td>
        <td>{{action.time}}</td>
        <td>{{(action.row==null ? "": action.row+1)}}</td>
        <td>{{action.height}}</td>
        <td>'{{action.stayTime}}</td>
        <td>{{action.word}}</td>
      </tr>
      <tr class="table_row_end">
        <td>-</td><td>-</td><td>'{{AllTime()}}</td><td>-</td><td>-</td>
        <td>=SUM()</td><td>-</td>
      </tr>
      <tr class="table_row_detail">
        <td>whiteout</td>
        <td>{{file.whiteout}}</td>
        <td>crack px</td>
        <td>{{file.crack_px}}</td>
        <td></td><td></td><td></td>
      </tr>
      <tr class="table_row_detail">
        <td>word count</td>
        <td>{{file.story.word_count}}</td>
        <td>1文字あたりの時間</td>
        <td>'{{TimePerChar}}</td>
        <td></td><td></td><td></td>
      </tr>
      <tr class="table_row_detail">
        <td>paragraphs</td>
        <td>{{file.story.paragraphs}}</td>
        <td>1段落あたりの時間</td>
        <td>'{{TimePerPara}}</td>
        <td></td><td></td><td></td>
      </tr>
      <tr class="table_row_detail">
        <td>judgment</td><td>Model</td><td>Answer</td><td></td><td></td><td></td><td></td>
      </tr>
      <tr class="table_row_detail" v-for="(jud,jud_id) in file.judgment" :key="`judgmentKey-${jud_id}`">
        <td></td>
        <td>{{jud.model}}</td>
        <td>{{jud.Answer}}</td>
        <td></td><td></td><td></td><td></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["file", "file_id"],
  data() {
    return {};
  },
  computed: {
    FileDay() {
      var files = this.file.fileName.split("_");
      let dayArr = files[0].split("-")
      let timeArr = files[1].split("-")
      let day = `${dayArr[0]}/${this.zeroPadding(dayArr[1],2)}/${this.zeroPadding(dayArr[2],2)}`
      let time = `${this.zeroPadding(timeArr[0],2)}:${this.zeroPadding(timeArr[1],2)}`
      return `日付: ${day}　時刻: ${time}　物語: ${files[3]}. ${this.file.story.title}　被験者: ${this.file.name}`;
    },
    FileDataTable(){
      let d = this.file.data
      for (let i = 0; i < d.length-1; i++) {
        d[i].stayTime = this.StayTime(d[i].time,d[i+1].time)
      }
      return d
    },
    TimePerChar(){
      return this.TimePerHoge(this.file.story.word_count)
    },
    TimePerPara(){
      return this.TimePerHoge(this.file.story.paragraphs)
    }
  },
  methods:{
    StayTime(start,end){
      let st_time = this.TimeToNumber(start)
      let ed_time = this.TimeToNumber(end)
      let staytime = ed_time - st_time
      return this.NumberToTime(staytime)
    },
    TimePerHoge(hoge){
      return this.NumberToTime(this.TimeToNumber(this.AllTime()) / hoge)
    },
    AllTime(){
      let alltime = this.file.data[this.file.data.length-1].time
      return alltime
    },
    zeroPadding(num,length){
      return ('0000000000' + num).slice(-length);
    },
    TimeToNumber(time){
      let timeArr = time.split(':')
      return Number(timeArr[0])*60*1000 + Number(timeArr[1])*1000 + Number(timeArr[2])
    },
    NumberToTime(num){
      let min = this.zeroPadding(Math.floor(num/(60*1000)),2)
      let sec = this.zeroPadding(Math.floor(num%(60*1000)/1000),2)
      let msec = this.zeroPadding(Math.floor(num%(60*1000)%1000),3)
      return `${min}:${sec}:${msec}`
    }
  }
};
</script>