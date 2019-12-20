<template>
  <div class="whiteout" v-if="whiteout">
    <div
      class="whiteout_upper" id="whiteout_upper"
      :style="{
        marginTop:`${-(crackPx/2)}px`,
        marginBottom:`${crackPx}px`,
        background: `linear-gradient( to bottom, rgba(67,160,71,1) ${100 - whiteBlur}%, rgba(67,160,71,0) )`
      }">
    </div>
    <div class="whiteout_under" id="whiteout_under"
      :style="{
        background: `linear-gradient( to top, rgba(67,160,71,1) ${100 - whiteBlur}%, rgba(67,160,71,0) )`
      }"
    ></div>
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
      return this.$store.state.whiteout
    },
    whiteBlur () {
      return this.$store.state.white_blur
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
  right: 0;
  width: 80px;
  height: 100vh;
  z-index: 0;
}
.whiteout_upper{
  width: 100%;
  height: 50vh;
}
.whiteout_under{
  width: 100%;
  height: 50vh;
}
</style>