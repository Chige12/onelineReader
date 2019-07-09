<template>
  <div class="container">
    <header>
      <h1>Oneline Reader</h1>
      <p>一行ずつ読む読書アプリです。</p>
      <p><a href="https://github.com/Chige12/onelinereader">Github repository</a></p>
    </header>
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
