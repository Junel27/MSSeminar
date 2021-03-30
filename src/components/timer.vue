<template>
  <div class="timer-component">
    <p class="label">auditorium opens in:</p>
    <p class="time" id="timer"></p>
    <p class="code">
      <span>hours</span>
      <span>minutes</span>
      <span>seconds</span>
    </p>
    <app-popup :showPrompt="showAuditorium" :stream="true" @hide="checkEnd"></app-popup>
  </div>
</template>

<script>
import moment from "moment";
import AppPopup from './popup.vue'
export default {
  components: {
    AppPopup
  },
  data: () => ({
    sched_start: '',
    sched_end: '',
    showAuditorium: false,
  }),
  methods: {
    countdownTimer() {
      var deadline = moment(this.sched_start); 
      var x = setInterval(() => { 
        var now = moment(); 
        var t = deadline - now; 

        var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var totalHours = days != 0 ? days * 24 + hours : hours
        let timer = document.getElementById("timer")

        if(timer) {
          timer.innerHTML = totalHours + " : " + minutes + " : " + seconds; 

          if(t < 120000) {
            this.showAuditorium = true
          }

          if (t < 0) { 
            clearInterval(x); 
            document.getElementById("timer").innerHTML = "00 : 00 : 00"; 
            this.checkEnd()
          } 
        }
      }, 1000); 
    },
    checkEnd() {
      var end = moment(this.sched_end); 
      var now = moment(); 
      var t = end - now; 
      this.showAuditorium = t < 1 ? false : true
    },
    getSchedule() {
      const { data } = this.$store.getters['settings/settings']
      this.sched_start = data.Live_Stream_Start
      this.sched_end = data.Live_Stream_End
      console.log(data)
      localStorage.setItem('Live_Stream_Start', this.sched_start)
      this.countdownTimer()
    },
  },
  mounted() {
    document.getElementById("timer").innerHTML = "00 : 00 : 00"; 
    setTimeout(() => {
      this.getSchedule()
    },300)

    // setInterval(() => {
    //   this.$store.dispatch('settings/fetchSettings', 'seminar')
    //   this.getSchedule()
    //   console.log('fetching every 30 secs')
    // },30000)
  }
}
</script>

<style lang="scss" scoped>
.timer-component {
  color: #fff;
  position: absolute;
  top: 40px;
  right: 0;
  line-height: 1;
  padding: 20px 30px 20px 60px;
  background-color: #c2ac73;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  z-index: 3;
  box-shadow: 0 3px 10px -2px #353535;

  .label {
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 0;
    font-weight: 600;
  }

  .code {
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time {
    font-size: 35px;
    margin: 10px 0;
    font-weight: 600;
    letter-spacing: 3px;
  }
}
@media screen and (max-width: 896px) {
  .timer-component {
    width: 250px;
    .label {
      font-size: 9px;

      font-weight: 600;
    }

    .code {
      text-transform: uppercase;
      font-size: 9px;
      margin-bottom: 0;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 12px;
    }
    .time {
      font-size: 20px;
      margin: 5px 0;
      font-weight: 600;
      letter-spacing: 5px;
    }
  }
}

@media screen and (max-width: 736px) {
  .timer-component {
    width: 210px;
    .label {
      font-size: 9px;
      font-weight: 500;
    }

    .code {
      font-size: 9px;
      font-weight: 500;

    }
    .time {
      font-size: 13px;
 
      font-weight: 500;
      letter-spacing: 4.5px;
    }
  }
}
</style>