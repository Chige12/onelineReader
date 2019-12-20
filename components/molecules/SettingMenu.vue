<template>
  <div class="setting">
    <v-text-field
      v-model="fontSize"
      class="setting_property"
      label="font size"
      max="50"
      min="1"
      step="1"
      style="width: 125px"
      type="number"
    ></v-text-field>
    <v-text-field
      v-model="whiteBlur"
      class="setting_property"
      label="Blur (%)"
      max="100"
      min="0"
      step="1"
      style="width: 125px"
      type="number"
    ></v-text-field>
    <v-switch v-model="WhiteOut" class="ma-2 setting_property" color="#43A047" label="WhiteOut"></v-switch>
  </div>
</template>
<script>
export default {
  computed: {
    fontSize: {
      get(){
        return this.$store.state.fontSize;
      },
      set(newval){
        this.$store.commit("SetFontSize", newval);
      }
    },
    whiteBlur: {
      get(){
        return this.$store.state.white_blur
      },
      set(val){
        this.$store.commit("ChangeBlur", val);
      }
    },
    WhiteOut: {
      get(){
        return this.$store.state.whiteout
      },
      set(val){
        this.$store.commit("ChangeWhiteOut",val);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.setting {
  display: flex;
}
.setting_property {
  margin: 4px;
}
.v-application--wrap {
  min-height: 0px;
}
</style>