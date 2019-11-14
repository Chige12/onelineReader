import Vue from 'vue'

Vue.mixin({
  methods: {
    zeroPadding(num, length) {
      return ('0000000000' + num).slice(-length);
    },
    TimeToNumber(time) {
      let timeArr = time.split(':')
      return Number(timeArr[0]) * 60 * 1000 + Number(timeArr[1]) * 1000 + Number(timeArr[2])
    },
    NumberToTime(number) {
      let min = this.zeroPadding(Math.floor(number / (60 * 1000)), 2)
      let sec = this.zeroPadding(Math.floor(number % (60 * 1000) / 1000), 2)
      let msec = this.zeroPadding(Math.floor(number % (60 * 1000) % 1000), 3)
      return `${min}:${sec}:${msec}`
    },
    NumberToTimeWithText(number) {
      let min = Math.floor(number / (60 * 1000))
      let sec = Math.floor(number % (60 * 1000) / 1000)
      let msec = Math.floor(number % (60 * 1000) % 1000)
      if(min===0 && sec!==0){
        return `${sec}s ${msec}msec`
      }
      if(min===0 && sec===0){
        return `${msec}msec`
      }
      return `${min}m ${sec}s ${msec}msec`
    },
    TimePerWordCount(word_count,all_time) {
      return this.NumberToTime(this.TimeToNumber(all_time) / word_count);
    },
    TimePerParagraphs(paragraphs,all_time) {
      return this.NumberToTime(this.TimeToNumber(all_time) / paragraphs);
    },
    OrgFloor(value, n) { //四捨五入
      let base = Math.pow(10,n)
      return Math.floor(value * base) / base;
    }
  }
})