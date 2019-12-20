<template>
  <div>
    <div class="menu" v-if="menuDisplay">
      <SettingMenu />
      <p>隙間：{{ crackPx }}px</p>
      <ul>
        <li v-for="(story, story_id) in storislist" :key="`storis-${story_id}`">
          <nuxt-link :to="`../stories/story_${story_id + 1}`"
            >{{ story.sourceBase.slice(0, -3) }} | {{ story.title }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SettingMenu from "~/components/molecules/SettingMenu.vue";
import summaryJson from "~/contents/summary.json";
export default {
  components: {
    SettingMenu
  },
  data() {
    return {
      storislist: []
    };
  },
  mounted() {
    this.updateStorislist();
  },
  computed: {
    menuDisplay() {
      return this.$store.state.menuDisplay;
    },
    crackPx() {
      return this.$store.state.crack_px;
    }
  },
  methods: {
    updateStorislist() {
      var summaryJsonMap = Object.entries(
        summaryJson.fileMap
      ).map(([key, value]) => ({ key, ...value }));
      this.storislist = summaryJsonMap.sort(function(a, b) {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
      });
      this.$store.commit("storislist", this.storislist);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  z-index: 3;
}
</style>
