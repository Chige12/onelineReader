<template>
  <div>
    <Menu/>
    <nuxt />
  </div>
</template>

<script>
import Menu from '~/components/organisms/Menu.vue'

export default {
  components: {
    Menu
  }
}
</script>

<style>
html,body{
  margin: 0;
}
</style>
