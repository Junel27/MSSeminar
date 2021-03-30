<template>
  <v-dialog
    v-model="showPrompt"
    persistent
    overlay-opacity=".6"
    overlay-color="black"
    width="1000px"
    content-class="auditorium">
    <v-btn class="close-btn" icon color="#d7d7d7" @click="hidePrompt">
      <v-icon x-large>mdi-close-circle-outline</v-icon>
    </v-btn>
    <div class="prompt d-flex justify-center" v-if="!stream">
      The Auditorium Will Open Soon
    </div>
    <div class="prompt prompt-2" v-if="stream">
      The Program will start in a few minutes. <br>
      please enter the auditorium
      <v-btn class="enter-btn" @click="$router.push('/auditorium')">enter here</v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props:{
    showPrompt:Boolean,
    stream:Boolean,
  },
  methods:{
    hidePrompt(){
        this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scope>
.prompt{
    font-size: 70px;
    font-weight: 600;
    color: #e7d49a;
    text-align: center;
    padding: 150px;
    text-transform: uppercase;

  &.prompt-2 {
    font-size: 40px;
    padding: 150px 30px;
  } 
}
.auditorium,
.booth-dialog {
  background-size: 100% 100%;
  border-radius: 15px !important;
  border: 3px solid #e7d49a;
  padding: 20px 30px;
  position: relative;
}
.auditorium {
  background-image: url("~@/assets/images/popup.png");
}

.enter-btn {
  display: block;
  margin: 0 auto;
  box-shadow: 0 3px 10px -2px #353535, inset 0px 0px 8px 3px #57dadd !important;
  border-radius: 20px;
  font-size: 30px !important;
  height: auto !important;
  padding: 10px 50px !important;
  background-color: #2c6bb8 !important;
  color: #fff !important;
  margin-top: 30px;
  font-weight: bold;

}
</style>