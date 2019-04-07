<template>
  <div id="app">
    <k-guage 
      :value="valInt"
      :width="500"
      :height="300"
      :max="300"
      label-text="GB"
      :show-min-max="false"
      :doughnut="false" />
      <input type="range" min="0" max="300" v-model="theVal" />
  </div>
</template>

<script>
import KGuage from "./components/KGuage.vue";

export default {
  name: "app",
  components: {
    KGuage
  },
  data() {
    return {
      theVal: 20
    }
  },
  computed: {
    valInt() {
      return parseInt(this.theVal);
    }
  }
};
</script>

<style lang="sass">
#app 
  width: 300px
  height: 300px

body
  background: #FFF
</style>
