<template>
  <div>
    <div>
      <section class="ibe_select_container">
        <span>Enter the number of persons:</span>

        <select class="ibe_select">
          <option selected disabled>Choose an option</option>
          <option :value="minPersons">{{ minPersons }}</option>
          <option v-for="item in totalPersons" :value="minPersons + item">{{
            minPersons + item
          }}</option>
        </select>
      </section>
    </div>
    <div>
      <section>
        <div>
          <v-date-picker
            mode="range"
            :value="null"
            color="green"
            is-inline
            :is-expanded="false"
            :max-date="maxDate"
            :min-date="minDate"
            :attributes="attrs"
          />
        </div>
      </section>
      <section></section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "step1",
  data: function() {
    return {
      minPersons: 0,
      maxPersons: 0,
      totalPersons: 0,
      attrs: [
        {
          // dates: {
          //   start: minDate, // Jan 1st, 2018
          //   end: maxDate, // Jan 1st, 2019
          //   weekdays: [1, 7] // ...on Sundays and Saturdays
          // },
          dates: {
            weekdays: [1, 7]
          },
          highlight: {
            color: "red",
            fillMode: "light",
            contentClass: "italic" // Class provided by TailwindCSS
          }
        }
      ]
    };
  },
  watch: {
    totalPersons: function(newVal, oldVal) {}
  },
  props: ["ibe_housingid"],
  async mounted() {
    const { data } = await axios.get(
      "https://virtserver.swaggerhub.com/mnediw/booking/1.0.1/housings/" +
        this.ibe_housingid
    );
    console.log(data);
    this.minPersons = data.minPersons;
    this.maxPersons = data.maxPersons;
    this.totalPersons = this.maxPersons - this.minPersons;
  },
  computed: {
    maxDate() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 3, month, day);
      return c;
    },
    minDate() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year - 1, month, day);
      return c;
    }
  },
  methods: {},
  components: {}
};
</script>

<style scoped>
/* Select Box */

.ibe_select {
  border: none;
  padding: 5px;
}
.ibe_select_container {
  padding: 5px;
}
</style>
