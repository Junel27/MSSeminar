<template>
    <div class="audi-page">
        <v-row class="content my-0">
            <v-col cols="8" class="left">
                <v-btn
                    class="custom-btn"
                    :small="$vuetify.breakpoint.smAndDown"
                    @click="backToLobby"
                >
                    <v-icon>mdi-chevron-left</v-icon> Back to lobby
                </v-btn>

                <div style="padding:56.25% 0 0 0;position:relative; width: 100%;">
                    <iframe src="https://vimeo.com/event/819119/embed/f1dff802a9" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
                </div>
            </v-col>
            <v-col cols="4" class="right">
                <iframe src="https://vimeo.com/event/819119/chat/f1dff802a9" height="100%" width="100%" frameBorder="0"></iframe>
            </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
    components: {

    },

    data: () => ({

    }),
    methods: {
        backToLobby() {
            this.$router.push('/lobby')
            this.$store.dispatch('awit/dot', { main_key: 'Auditorium', sub_key: 'seminar',  data_action: 'leave' })
        },
    },
    mounted() {
        this.$store.dispatch('awit/dot', { main_key: 'Auditorium', sub_key: 'seminar',  data_action: 'enter' })
    },
    beforeDestroy() {
        this.$store.dispatch('awit/dot', { main_key: 'Auditorium', sub_key: 'seminar',  data_action: 'leave' })
    }
}
</script>

<style lang="scss" scoped>
.audi-page {
    height: 100vh;
    position: relative;
    background-image: url('~@/assets/images/bg.jpg');
    background-size: 100% 100%;

    .content {
        height: 100%;

        .left {
            height: 100%;
            padding: 0 0 0 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            .custom-btn {
                position: absolute;
                left: -23px;
                top: 20px;
                z-index: 3;

                background-color: #2c6bb8 !important;
                height: 50px !important;
                border-radius: 27px !important;
                padding: 15px 30px !important;
                color: #fff !important;
                font-size: 20px !important;
                box-shadow: inset 0px 0px 8px 3px #57dadd !important;
                margin: 15px;
            }
                    
        }

        .right {
            height: 100%;
            padding: 0 12px;
            background: #fff;
        }
    }
}
</style>