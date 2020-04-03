<template lang="pug">
  .gazePointMove
    v-btn(@click="toggleGazeFixation") Toggle
    v-range-slider(
      v-model="range"
      :max="max"
      :min="min"
      hide-details
      step="100"
      ticks
      tick-size="0"
      @change="rangeMove()"
    )
    v-slider(
      v-model="move"
      :max="max"
      :min="min"
      hide-details
      @change="sliderMove()"
      @mousemove="sliderMove()"
    )
    ScatterChart(:data="GazePointY")
    ScatterChart(:data="GazePointX")
</template>
<script>
import colors from "vuetify/es5/util/colors";
import ScatterChart from "~/components/atoms/gazeData/ScatterChart.vue"
export default {
  components: {
    ScatterChart
  },
  props: {
    file: Array
  },
  data(){
    return {
      move: 50,
      range: [0, 100],
      min: 0,
      max: 100,
      setcolumn: 0,
      columnName: {
        x: 'GazePointX (ADCSpx)',
        y: 'GazePointY (ADCSpx)'
      }
    }
  },
  computed: {
    GazePointY(){
      if(this.file[0]){
        let datasets = []
        let data = this.file[0].data
        this.max = data[data.length - 1]['RecordingTimestamp']//レコーディングの開始から測ったタイム（ミリ秒
        let xy_dataset = []
        for (let i = 0; i < data.length; i++) {
          let xy_obj = {}
          if(this.range[0] <= data[i]['RecordingTimestamp'] && this.range[1] >= data[i]['RecordingTimestamp']){
            if(data[i][this.columnName.y]!==""){
              xy_obj.x = data[i]['RecordingTimestamp']
              xy_obj.y = -data[i][this.columnName.y]
              xy_dataset.push(xy_obj) 
            }
          }
        }
        let lavel_data = {}
        lavel_data.data = xy_dataset
        lavel_data.label = [this.columnName.y]
        lavel_data.backgroundColor = colors.green.lighten1
        datasets.push(lavel_data)
        return datasets
      }
    },
    GazePointX(){
      if(this.file[0]){
        let datasets = []
        let KeyEvent = ['', 'KeyEvent']
        for (let ke = 0; ke < KeyEvent.length; ke++) {
          let data = this.file[0].data
          this.max = data[data.length - 1]['RecordingTimestamp']
          let xy_dataset = []
          for (let i = 0; i < data.length; i++) {
            let xy_obj = {}
            if(this.range[0] <= data[i]['RecordingTimestamp'] && this.range[1] >= data[i]['RecordingTimestamp']){
              if(data[i]['KeyPressEvent']!=="" && KeyEvent[ke]==='KeyEvent'){
                  xy_obj.x = data[i]['RecordingTimestamp']
                  xy_obj.y = 400
                  xy_dataset.push(xy_obj)
                }
              if(data[i][this.columnName.x]!=="" && KeyEvent[ke]===''){
                  xy_obj.x = data[i]['RecordingTimestamp']
                  xy_obj.y = data[i][this.columnName.x]
                  xy_dataset.push(xy_obj)
              }
            }
          }
          let lavel_data = {}
          lavel_data.data = xy_dataset
          lavel_data.label = KeyEvent[ke]
          lavel_data.backgroundColor = (KeyEvent[ke]==='') ? colors.green.lighten1 : colors.orange.lighten1
          datasets.push(lavel_data)
        }
        return datasets
      }
    }
  },
  methods:{
    toggleGazeFixation() {
      let arr_x = [
        'GazePointX (ADCSpx)',
        'FixationPointX (MCSpx)'
      ]
      let arr_y = [
        'GazePointY (ADCSpx)',
        'FixationPointY (MCSpx)'
      ]
      this.setcolumn++
      if(arr_x.length <= this.setcolumn){
        this.setcolumn = 0
      }
      this.columnName = {
        x: arr_x[this.setcolumn],
        y: arr_y[this.setcolumn],
      }
    },
    rangeMove() {
      this.move = (this.range[1] - this.range[0]) / 2 + this.range[0]
    },
    sliderMove() {
      let beforemove = (this.range[1] - this.range[0]) / 2 + this.range[0]
      let def = this.move - beforemove
      this.range = [this.range[0] + def, this.range[1] + def]
    }
  }
}
</script>