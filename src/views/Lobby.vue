<template>
    <div class="lobby-page"
        :style="{height: height+'px'}">
        <v-overlay
            absolute
            z-index="0"
            opacity="1"
        >
            <v-img 
                :src="bg"
                :style="{opacity:1, width:'100vw', height: '100vh',filter:'blur(10px)','-webkit-filter':'blur(10px)'}"></v-img>
        </v-overlay>

        <div :style="{
            position: 'absolute',
            width:'100%',
            height:'100%'
            }">
            <div
                class="ma-auto"
                :style="{
                    height: '100%',
                    width: '100%',
                    maxHeight:'50vw',
                    maxWidth:'200vh',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    zIndex:2,
                    position:'absolute',
                    top:0,
                    left:0,
                    bottom:0,
                    right:0
                }"
            >

            <!-- APP TIMER -->
            <app-timer></app-timer>

            <!-- CURSORS -->
            <v-img
                src="~@/assets/images/cursor.png"
                class="cursor-pulse"
                v-for="(item, key) of booths"
                :key="key"
                :style="{
                    position:'relative',
                    top: item.y,
                    left: item.x
                }"
                @click="openLink(item.name, item.link)"
                ></v-img>
            </div>
        </div>
        <app-popup
            :showPrompt="showAuditorium"
            :stream="false"
            @hide="showAuditorium = false"
            ></app-popup>
    </div>
</template>

<script>
import moment from "moment";
import AppTimer from './../components/timer.vue'
import AppPopup from './../components/popup.vue'

export default {
    components: {
        AppTimer,
        AppPopup
    },
    data: () => ({
        bg: require('@/assets/images/bg.jpg'),
        height: 0,
        showAuditorium: false,
        booths: [
            {
                name: 'booth1',
                x: '8%',
                y: '52%',
                link: '/booth/1'
            },
            {
                name: 'audi',
                x: '51%',
                y: '43%',
                link: '/auditorium'
            },
            {
                name: 'booth2',
                x: '69%',
                y: '59%',
                link: '/booth/2'
            },
        ]
    }),
    methods: {
        openLink(name, link) {
            if(name == 'audi') {
                this.getSchedule();
            } else {
                this.$router.push(link)
            }
        },
        getSchedule() {
            let start = localStorage.getItem("Live_Stream_Start");
            let deadline = moment(start);
            var now = moment();
            
            if (now.isBefore(deadline)) {
                console.log("aaa");
                this.showAuditorium = true;
            } else {
                this.$router.push("/auditorium");
                console.log("bbb");
            }
        },
        resize() {
            this.height = window.innerHeight
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
}
</script>

<style lang="scss" scoped>
.lobby-page {
    position: relative;
    overflow: hidden;
}

// pulse animation
.cursor-pulse {
  width: 3%;
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 0 0 0 0 rgba(255,255,255,.9);
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
  -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);

  &:hover {
    background-color: rgba(255,255,255, 0);
  }
}
@-webkit-keyframes pulse {to {box-shadow: 0 0 0 40px rgba(232, 76, 61, 0);}}
@-moz-keyframes pulse {to {box-shadow: 0 0 0 40px rgba(232, 76, 61, 0);}}
@-ms-keyframes pulse {to {box-shadow: 0 0 0 40px rgba(232, 76, 61, 0);}}
@keyframes pulse {to {box-shadow: 0 0 0 40px rgba(232, 76, 61, 0);}}

</style>