<template>
  <div class="ibe_wrapper" @click.capture="toggleCookieConsent">
    <div class="ibe_header">
      <section class="ibe_steps">
        <button
          :style="{ visibility: currentStep > 1 ? 'visible' : 'hidden' }"
          class="ibe_btn_secondary"
          @click="previousStep"
        >Previous</button>
        <div class="ibe_steps_progress_container">
          <span class="ibe_steps_progress" :style="{ width: currentStep * 20 + '%' }"></span>
        </div>

        <button
          class="ibe_btn_secondary"
          :style="{ visibility: currentStep < 5 ? 'visible' : 'hidden' }"
          @click="nextStep"
        >Next</button>
      </section>
      <div>
        <label class="ibe_steps_title">Step {{ currentStep }} of {{ maxSteps }}</label>
      </div>
    </div>
    <div class="ibe_main">
      <div class="ibe_left_panel">
        <Step1 v-show="currentStep == 1" :ibe_housingid="ibe_housingid" ref="step1"></Step1>
        <Step2 v-show="currentStep == 2" @proceed="proceedToNextStep" ref="step2"></Step2>
      </div>
      <SideBar ref="sidebar"></SideBar>
    </div>
    <div class="ibe_header">
      <section class="ibe_steps">
        <button
          class="ibe_btn_secondary"
          :style="{ visibility: currentStep > 1 ? 'visible' : 'hidden' }"
          @click="previousStep"
        >Previous</button>
        <button
          :style="{ visibility: currentStep < 5 ? 'visible' : 'hidden' }"
          class="ibe_btn_secondary"
          @click="nextStep"
        >Next</button>
      </section>
    </div>
    <cookie-consent v-if="cookieConsent">
      <template slot="message">
        This website uses cookies
        <a style="color:blue">Read more</a>
      </template>
      <template slot="button">
        <button class="btn btn-info">Accept</button>
      </template>
    </cookie-consent>
  </div>
</template>

<script>
import axios from "axios";
import Step1 from "@/components/Step1.vue";
import Step2 from "@/components/Step2.vue";
import SideBar from "@/components/SideBar.vue";

var ibe_housingid = 999;
export default {
  name: "app",
  data: function() {
    return {
      maxSteps: 5,
      currentStep: 1,
      ibe_housingid: ibe_housingid,
      cookieConsent: false
    };
  },
  async mounted() {},
  methods: {
    nextStep: async function() {
      if (this.currentStep + 1 <= this.maxSteps) {
        let stepObj = {
          ibe_housingid: this.ibe_housingid,
          cookieConsent: this.cookieConsent,
          currentStep: this.currentStep
        };
        let currentStep = this.currentStep;
        let validationComplete = false;
        switch (currentStep) {
          case 1:
            let data = this.$refs.step1.getDateAndPersons();
            if (!data.date.start || !data.date.end) {
              break;
            }
            let price = await axios.get(
              `https://virtserver.swaggerhub.com/mnediw/booking/1.0.1/housings/
                ${this.ibe_housingid}/price?persons=${
                data.persons
              }&arrival=${this.getDateFormatted(
                new Date(data.date.start)
              )}&departure=${this.getDateFormatted(new Date(data.date.end))}`
            );
            stepObj["price"] = price.data;
            this.$refs.step1.downloadLocalStorage(currentStep, stepObj);
            this.$refs.sidebar.updateDatesAndPrice();
            validationComplete = true;
            break;
          case 2:
            this.$refs.step2.validateData();
            validationComplete = true;
            break;
        }
        debugger;
        if (this.currentStep != 2 && validationComplete) {
          this.proceedToNextStep();
        }
      }
    },
    previousStep: function() {
      if (this.currentStep - 1 > 0) {
        this.currentStep--;
      }
    },
    toggleCookieConsent() {
      this.cookieConsent = true;
    },
    proceedToNextStep() {
      this.currentStep++;
    },
    getDateFormatted(dateObj) {
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      let newdate = day + "/" + month + "/" + year;
      return newdate;
    }
  },
  components: {
    Step1,
    Step2,
    SideBar
  }
};
</script>

<style>
/* div.ibe_wrapper *,
div.ibe_wrapper ::before,
div.ibe_wrapper ::after {
  margin: 0;
  padding: 0;
} */

@media only screen and (max-width: 500px) {
  .ibe_main {
    display: grid;
    grid-template-rows: 1fr auto;
  }
}

@media only screen and (min-width: 501px) {
  .ibe_main {
    display: grid;
    grid-template-columns: 70% 30%;
  }
}

div.ibe_wrapper {
  width: 100%;
  box-sizing: border-box;
  font-size: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1;
  background: #ffffff;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

/* Header */
div.ibe_header {
  padding: 10px;
}
section.ibe_steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ibe_steps_title {
}

/* Main Content */
/* .ibe_main {
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr 70px;
  padding: 30px;
} */

.ibe_left_panel {
  overflow-x: auto;
}

/* Buttons */
button.ibe_btn_secondary {
  padding: 5px 20px;
  background-color: white;
  border: 2px solid rgb(73, 73, 73);
  border-radius: 3px;
}
button.ibe_btn_secondary:hover {
  background-color: rgb(236, 236, 236);
}
button.ibe_btn_secondary:active {
  background-color: rgb(212, 212, 212);
}

/* Pregress bar */
.ibe_steps_progress_container {
  width: 70%;
  background-color: rgb(202, 202, 202);
  height: 10px;
  border-radius: 5px;
  margin: 0px 15px;
}

.ibe_steps_progress {
  float: left;
  width: 10px;
  background-color: rgb(10, 163, 10);
  height: 10px;
  border-radius: 5px;
}
</style>
