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
    <StopWatch @reset="reset"/>
  </div>
</template>

<script>
import StopWatch from '~/components/atoms/stopWatch.vue'
import Whiteout from '~/components/atoms/whiteout.vue'
import summaryJson from '~/contents/summary.json'
import { SlowBuffer } from 'buffer';
export default {
  components:{
    Whiteout,
    StopWatch
  },
  data(){
    return {
      nowrow:null,
      rowlist:[],
      whiteupperH:0
    }
  },
  validate({ params }) {
    return summaryJson.sourceFileArray.includes(`contents/posts/${params.story}.md`);
  },
  asyncData({ params }) {
    return Object.assign({}, require(`~/contents/json/${params.story}.json`), { params });
  },
  mounted(){
    this.rowlist = this.$refs.documentBody.getElementsByTagName('p')
    this.whiteupperH = document.getElementById('whiteout_upper').clientHeight
    for (let i = 0; i < this.rowlist.length; i++) {
      this.rowlist[i].setAttribute("id",`pg_${i}`);
    }
  },
  created(){
    if (process.browser) {
      window.addEventListener('keydown', this.KeydownEvent)
    }
  },
  beforeDestroy(){
    if (process.browser) {
      window.removeEventListener("keydown", this.KeydownEvent)
    }
  },
  methods:{
    reset(){
      this.nowrow = null
    },
    KeydownEvent(e) {
      this.$store.dispatch('KeyDown',e)

      if(e.key === 'ArrowUp'){
        this.arrowScrollUp(e)
      }
      if(e.key === 'ArrowDown'){
        e.preventDefault();
        this.arrowScrollDown(e)
      }
    },
    arrowScrollUp(e){
      let height
      if(this.nowrow === 0){
        this.nowrow = null
      }
      if(this.nowrow > 0){
        e.preventDefault();
        height = this.rowlist[this.nowrow-1].clientHeight/2
        this.$scrollTo(`#pg_${this.nowrow-1}`,100,{offset : -this.whiteupperH+height})
        this.nowrow--
      }
      this.$store.commit('Timer',{key:"ScrollUp",row:this.nowrow,height:height})
    },
    arrowScrollDown(e){
      let height
      if(this.nowrow === null){
        height = this.rowlist[0].clientHeight/2
        this.$scrollTo(`#pg_0`,100,{offset : -this.whiteupperH+(height)})
        this.nowrow = 0
      }else if(0 <= this.nowrow && this.nowrow < this.rowlist.length-1){
        height = this.rowlist[this.nowrow+1].clientHeight/2
        this.$scrollTo(`#pg_${this.nowrow+1}`,100,{offset : -this.whiteupperH+(height)})
        this.nowrow++
      }
      this.$store.commit('Timer',{key:"ScrollDown",row:this.nowrow,height:height})
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
