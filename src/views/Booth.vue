<template>
    <div class="lobby-page"
        :style="{height: height+'px'}">
        <v-overlay
            absolute
            z-index="0"
            opacity="1"
        >
            <v-img 
                :src="boothData[boothID].bg"
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
                    maxHeight:'63vw',
                    maxWidth:'162vh',
                    backgroundImage: `url(${boothData[boothID].bg})`,
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
                <!-- BACK BUTTON -->
                <div class="back-btn">
                    <v-btn @click="backToLobby">
                        <v-icon>mdi-chevron-left</v-icon> Back to lobby
                    </v-btn>
                </div>

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
                    @click="cursorClick(item.name)"
                    ></v-img>
            </div>
        </div>

        <!-- VIDEO -->
        <v-dialog 
            v-model="videosModal"
            v-if="videosModal"
            content-class="video-wall"
            max-width="1000px"
            width="100%"
            persistent>
            <div class="videowall-dialog" id="dialogVid">
                <div class="content"
                    :style="{height: vidHeight+'px'}">
                    <v-icon
                        style="border-radius: 50%; border: 2px solid #ff081b; z-index: 5; color: #ff081b; padding: 2px; position: absolute; top: 20px; right: 20px"
                        class="ml-auto"
                        @click="videosModal = false">
                        mdi-close
                    </v-icon>
                    <iframe id="vidWall" 
                        @load="setCss"
                        :src="boothData[boothID].videoSrc" 
                        frameborder="0" 
                        :style="{width: vidWidth+'px'}"
                        allow="autoplay; fullscreen" 
                        allowfullscreen></iframe>
                </div>
            </div>
        </v-dialog>

        <!-- BROCHURE LIST DIALOG -->
        <v-dialog v-model="brochuresModal"  
            fullscreen
            overlay-opacity="0.7">
            <brochure-selector
                :brochures="boothData[boothID].brochureList"
                @close="brochuresModal=false">
            </brochure-selector>
        </v-dialog>
    </div>
</template>

<script>
import BrochureSelector from '../components/brochure-selector.vue'

export default {
    components: {
        BrochureSelector,
    },
    data: () => ({
        height: 0,
        vidWidth:0,
        vidHeight: 0,
        videosModal: false,
        brochuresModal: false,
        boothID: null,
        minimize: true,
        booths: [
            {
                name: 'brochures',
                x: '16%',
                y: '54%',
            },
            {
                name: 'videos',
                x: '86%',
                y: '33%',
            },
        ],
        boothData: [
            { 
                id: 1, 
                brochureList: [
                    {
                        src: '12WuuCYQaM23vaFwq9XsZLV6krHwsbEeJ',
                        thumbnail: require('@/assets/images/BROCHURES1/Doctors-Leaflet-NCTF-1.jpg'),
                        name: '<b>NCTF</b> BROCHURE'
                    },
                    {
                        src: '1v2mlz7gvgNkpl6yZR92sjTJNGo41eyxw',
                        thumbnail: require('@/assets/images/BROCHURES1/NANOSOFT-1.jpg'),
                        name: '<b>NANOSOFT</b> BROCHURE'
                    }
                ],
                videoSrc: 'https://www.youtube.com/embed/CID-sYQNCew',
                bg: require('@/assets/images/booth.jpg'),
            },
            { 
                id: 2, 
                brochureList: [
                    {
                        src: '1DFbJ3ryk_rrjB3JWVRQfQE6xiKmEHco5',
                        thumbnail: require('@/assets/images/BROCHURES1/Peels-Brochure-1.png'),
                        name: '<b>PEELS</b> BROCHURE'
                    }
                ],
                videoSrc: 'https://www.youtube.com/embed/i1P-9IspBus',
                bg: require('@/assets/images/booth.jpg'),
            },
        ],
        isFirst: true,
        slug: ''
    }),
    methods: {
        cursorClick(val) {
            if(val == 'videos') {
                this.videosModal = true
            } else {
                this.brochuresModal = true
            }
        },

        resize() {
            this.height = window.innerHeight
            if(this.videosModal) {
                this.setCss()
            }
        },

        // Ratio 16 x 9 calculate height
        calculateRatioHeight(width){
            let height = Math.round((width/16)*9); 
            let innerHeight = window.innerHeight
            return innerHeight > height ? height: height - 100; 
        },

        // Ratio 16 x 9 calculate width
        calculateRatioWidth(height){
            let width = Math.round((height/9)*16); 
            return width
        },

        checkPath() {
            let path = this.$route.path 
            this.boothID = path == '/booth/1' ? 0:1
        },

        // Set video wall heigth and width by 16x9 ratio
        setCss() {
            let frame = document.getElementById('dialogVid')
            this.vidHeight = this.calculateRatioHeight(frame.offsetWidth)
            this.vidWidth = this.calculateRatioWidth(this.vidHeight)
        },

        backToLobby() {
            this.$router.push('/lobby')
        },
    },
    created() {
        this.checkPath()
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
    // height: 100%;
    position: relative;
    overflow: hidden;
}

.back-btn {
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 3;
}

.videowall-dialog {
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
        position:relative;
        width: 100%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;

        #vidWall {
            border-radius: 10px; 
            border: 2px solid #ff081b;
            background: transparent; 
            height:100%;
        }
    }
}
  // pulse animation
.cursor-pulse, ::v-deep .pnlm-hotspot-base{
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

::v-deep .v-dialog {
  &.video-wall {
    max-height: 100% !important;
    background: transparent !important;
    border-radius: 0!important;
    border: none;
    box-shadow: none !important;
  }
}
</style>