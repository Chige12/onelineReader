<template>
  <div class="whiteout" v-if="whiteout">
    <div class="whiteout_upper" id="whiteout_upper"></div>
    <div class="whiteout_under" id="whiteout_under"></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      whiteout: true,
      crack_px: 16
    }
  },
  mounted(){
    window.addEventListener('keydown', (e) => {
      this.KeyDown(e)
    })
  },
  methods:{
    KeyDown(event){
      if (event.key === 'w'){
        this.whiteout = this.whiteout ? false : true
      }
      if (event.key === '['){
        this.crack_px += 2
      }
      if (event.key === ']'){
        this.crack_px -= 2
      }
    },
    ChangeCrackSize(){

    }
  }
}
</script>

<style lang="scss" scoped>
.whiteout {
  z-index: 2;
}
.whiteout_upper{
  width: 100%;
  height: 50vh;
  background: linear-gradient(to bottom, rgba(#fff, 1) 90%, rgba(#fff, 0)),;
}
.whiteout_under{
  width: 100%;
  height: 50vh;
  background: linear-gradient(to top, rgba(#fff, 1) 90%, rgba(#fff, 0)),;
}
</style>