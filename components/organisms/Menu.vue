<template>
  <div class="menu">
    <ul v-if="menuDisplay == false">
      <li v-for="(story,story_id) in storis" :key="`storis-${story_id}`">
        <a :href="`./story_${story_id+1}`">{{story.name}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      menuDisplay: true,
      storis: [
        { name:'お話1'},
        { name:'お話2'},
        { name:'お話3'}
      ]
    }
  },
  mounted(){
    window.addEventListener('keydown', (e) => {
      this.KeyDown(e)
    })
  },
  methods:{
    KeyDown(event){
      console.log(event.key)
      if (event.key === 'm'){
        this.menuDisplay = this.menuDisplay ? false : true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  z-index: 3;
}
</style>

