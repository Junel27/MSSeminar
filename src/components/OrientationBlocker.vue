<template>
  <!-- go to landscape notifier -->
  <v-overlay
    v-model="notifyOrientationChange"
    opacity="1"
    color="grey darken-4"
    style="z-index:99"
  >
    <v-container
      fill-height
      fluid
    >
      <v-row
        justify="center"
        align="center"
      >
        <v-col>
          <v-img
            v-if="requireOrientation == 'portrait'"
            class="mx-auto"
            src="@/assets/orientation-blocker/rotate-to-portrait.gif"
            width="50%"
            style="filter: hue-rotate(180deg)"
          ></v-img>
          <v-img
            v-else
            class="mx-auto"
            src="@/assets/orientation-blocker/rotate-to-landscape.gif"
            width="50%"
            style="filter: hue-rotate(180deg);"
          ></v-img>
          <h4 class="text-center">
            Flip to {{ requireOrientation  }} mode for better experience
          </h4>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
  export default {
    name: 'OrientationBlocker',

    computed: {
      /** 
       * gets the global store of orientation 
       * (will change if the store changes from anywhere in the app) 
       * */
      requireOrientation() {
        return this.$store.getters['orientation/required']
      },
    },

    data: ()=> ({
      /** opens the overlay that notifies user to change orientation */
      notifyOrientationChange: false,
    }),


    watch: {
      /** extra methods to be activated via requiredorientation change */
      requireOrientation(val) {
        this.checkOrientationRequirement()

        var _delayOrientationChangeCheck = function() {
          setTimeout(()=>{
            this.checkOrientationRequirement
          },4000);
        } 
        if (val) {
          // // change check screen ration upon orientation change or resize
          window.addEventListener("orientationchange", _delayOrientationChangeCheck);
          window.addEventListener("resize", this.checkOrientationRequirement);
        }
        else {
          // reduces memory intake by removing listeners when not needed
          window.removeEventListener("orientationchange", _delayOrientationChangeCheck);
          window.removeEventListener('resize', this.checkOrientationRequirement)
        }
      }
    },

    methods: {
      /**
       * Checks if the orientation meets the requirement set by the app
       */
      checkOrientationRequirement() {
        var val = this.requireOrientation
        var _height = window.innerHeight
        var _width = window.innerWidth
        console.log(val)
        if ( (val == 'landscape' &&  _height > _width) 
        || (val == 'portrait' && _height < _width &&  this.$vuetify.breakpoint.smAndDown) )
          this.notifyOrientationChange = true
        else
          this.notifyOrientationChange = false
      }
    },

    mounted() {
      // require the app to go to landscape
      this.checkOrientationRequirement()
    }
  }
</script>

<style lang="scss" scoped>

</style>