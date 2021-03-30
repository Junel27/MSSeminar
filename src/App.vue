<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <orientation-blocker></orientation-blocker>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    OrientationBlocker: () => import('@/components/OrientationBlocker.vue'),
  },

  data: () => ({
    //
  }),
  methods: {
    resize() {
      if (window.innerWidth <= window.innerHeight) {
        this.$store.commit("orientation/setRequired", "landscape");
      } else {
        this.$store.commit("orientation/disableRequired");
      }
    },
  },
  created() {
    window.addEventListener('resize', this.resize)
  },
  mounted() {
    this.resize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }

};
</script>
