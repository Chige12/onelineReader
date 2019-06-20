<template>
  <div>
    <div class="reader">
      <div class="container">
        <h1>{{ title }}</h1>
        <div class="post-meta"><time>{{ params.date }}</time></div>
        <div v-html="bodyHtml"></div>
      </div>
    </div>
    <Whiteout/>
  </div>
</template>

<script>
import Whiteout from '~/components/atoms/whiteout.vue'
import summaryJson from '~/contents/summary.json'
export default {
  components:{
    Whiteout
  },
  data(){
    return {
      storis: "hoge"
    }
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/posts/${params.story}.md`);
  },
  asyncData({ params }) {
    console.log(params)
    return Object.assign({}, require(`~/contents/json/${params.story}.json`), { params });
  },
  mounted(){
  }
}
</script>

<style>
.reader{
  padding: calc(50vh - 2rem) 0 calc(50vh - 2rem);
}
.container {
  max-width: 980px;
  margin: auto;
}
</style>
