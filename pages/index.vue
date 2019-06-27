<template>
  <div class="container">
    <Whiteout/>
  </div>
</template>

<script>
import Whiteout from '~/components/atoms/whiteout.vue'
export default {
  components:{
    Whiteout
  },
  data(){
    return {
      storis: "hoge"
    }
  },
  mounted(){
    window.addEventListener('keydown', (e) => {
        console.log(e.key)
        this.$store.dispatch('KeyDown',e)
    })
  }
}
</script>

<style>
</style>
