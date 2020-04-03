<template>
  <v-app>
    <div class="container">
      <div class="whiteout_preview">
        <WhiteoutPrev/>
      </div>
      <header>
        <h1>Oneline Reader</h1>
        <div class="header_menu">
          <v-btn class="update_btn" @click="update()">更新</v-btn>
          <p>一行ずつ読む読書アプリです。</p>
          <p>
            <a href="https://github.com/Chige12/onelinereader"
              >Github repository</a
            >
          </p>
        </div>
      </header>
      <SettingMenu />
      <main>
        <ul>
          <li
            v-for="(story, story_id) in storylist"
            :key="`storis-${story_id}`"
            :style="`font-size: ${fontSize}px;`"
          >
            <nuxt-link :to="`../stories/story_${story_id + 1}`"
              >{{ story.sourceBase.slice(0, -3) }} |
              {{ story.title }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="./file_listup"
              >ファイル リストアップツール</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="./gaze_file"
              >視線データ</nuxt-link
            >
          </li>
        </ul>
      </main>
    </div>
  </v-app>
</template>

<script>
import WhiteoutPrev from "~/components/atoms/WhiteoutPrev.vue";
import SettingMenu from "~/components/molecules/SettingMenu.vue";
import summaryJson from "~/contents/summary.json";
export default {
  components: {
    WhiteoutPrev,
    SettingMenu
  },
  data() {
    return {
      storis: "hoge"
    };
  },
  mounted() {
    this.$store.commit("CloseMenuDisplay");
  },
  computed: {
    storylist() {
      return this.$store.state.storylist;
    },
    fontSize() {
      return this.$store.state.fontSize;
    }
  },
  methods: {
    update() {
      this.$store.commit("listup/updateSubjectName", "");
      this.updateStorislist();
    },
    updateStorislist() {
      var summaryJsonMap = Object.entries(
        summaryJson.fileMap
      ).map(([key, value]) => ({ key, ...value }));
      const storislist = summaryJsonMap.sort(function(a, b) {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
      });
      this.$store.commit("storislist", storislist);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 16px 0;
}
p,
li {
  margin: 4px 0;
}
.container {
  min-height: 100vh;
}
.whiteout_preview {
  z-index: -2;
}

.header_menu {
  display: flex;
  margin-bottom: 24px;
  .update_btn {
    margin-right: 20px;
  }
}
</style>
