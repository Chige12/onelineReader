<template>
  <div class="whiteout" v-if="whiteout">
    <div class="whiteout_upper" id="whiteout_upper" :style="{marginTop:`${-(crackPx/2)}px`,marginBottom:`${crackPx}px`}"></div>
    <div class="whiteout_under" id="whiteout_under"></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    whiteout () {
      console.log("hoge3")
      return this.$store.state.whiteout
    },
    crackPx () {
      return this.$store.state.crack_px
    }
  }
}
</script>

<style lang="scss" scoped>
.whiteout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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