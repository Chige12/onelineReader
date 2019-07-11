<template>
  <div class="container">
    <header>
      <h1>Oneline Reader</h1>
      <p>一行ずつ読む読書アプリです。</p>
      <p><a href="https://github.com/Chige12/onelinereader">Github repository</a></p>
    </header>
    <main>
      <ul>
        <li v-for="(story,story_id) in storylist" :key="`storis-${story_id}`">
          <nuxt-link :to="`../stories/story_${story_id+1}`">{{story.sourceBase.slice(0,-3)}} | {{story.title}}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="./file_listup">ファイル リストアップツール</nuxt-link>
        </li>
      </ul>
    </main>
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
  computed: {
    storylist(){
      return this.$store.state.storylist
    }
  }
}
</script>

<style>
</style>
