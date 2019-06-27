<template>
  <div>
    <div class="reader">
      <div class="container" id="container">
        <h2><a :href="link">{{ title }}</a></h2>
        <p>著者：{{writer}}</p>
        <!-- <div class="post-meta"><time>{{ created_at }}</time></div> -->
        <div v-html="bodyHtml" ref="documentBody"></div>
      </div>
    </div>
    <Whiteout/>
  </div>
</template>

<script>
import Whiteout from '~/components/atoms/whiteout.vue'
import summaryJson from '~/contents/summary.json'
import { SlowBuffer } from 'buffer';
export default {
  components:{
    Whiteout
  },
  data(){
    return {
      nowrow:null
    }
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/posts/${params.story}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/json/${params.story}.json`), { params });
  },
  mounted(){
    this.$nextTick(() => {
      let rowlist = this.$refs.documentBody.getElementsByTagName('p')
      let whiteupperH = document.getElementById('whiteout_upper').clientHeight
      for (let i = 0; i < rowlist.length; i++) {
        rowlist[i].setAttribute("id",`pg_${i}`);
      }
      console.log(rowlist)
      window.addEventListener('keydown', (e) => {
        console.log(e.key)
        this.$store.dispatch('KeyDown',e)

        if(e.key === 'ArrowUp'){
          this.arrowScrollUp(rowlist,e,whiteupperH)
        }
        if(e.key === 'ArrowDown'){
          e.preventDefault();
          this.arrowScrollDown(rowlist,e,whiteupperH)
        }
        console.log(this.nowrow)
      })
    })
  },
  methods:{
    arrowScrollUp(rowlist,e,whiteupperH){
      if(this.nowrow === 0){
        this.nowrow = null
      }
      if(this.nowrow > 0){
        e.preventDefault();
        this.$scrollTo(`#pg_${this.nowrow-1}`,100,{offset : -whiteupperH+(rowlist[this.nowrow-1].clientHeight/2)})
        console.log(rowlist[this.nowrow-1].clientHeight/2)
        this.nowrow--
      }
    },
    arrowScrollDown(rowlist,e,whiteupperH){
      if(this.nowrow === null){
        this.$scrollTo(`#pg_0`,100,{offset : -whiteupperH+(rowlist[0].clientHeight/2)})
        console.log(rowlist[0].clientHeight/2)
        this.nowrow = 0
      }else if(0 <= this.nowrow && this.nowrow < rowlist.length-1){
        this.$scrollTo(`#pg_${this.nowrow+1}`,100,{offset : -whiteupperH+(rowlist[this.nowrow+1].clientHeight/2)})
        console.log(rowlist[this.nowrow+1].clientHeight/2)
        this.nowrow++
      }
    }
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
