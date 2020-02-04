<template>
  <div>
    <div>
      <section class="ibe_select_container">
        <span>Enter the number of persons:</span>

        <select class="ibe_select" v-model="selectedPersons">
          <option selected disabled>Choose an option</option>
          <option :value="minPersons">{{ minPersons }}</option>
          <option v-for="item in totalPersons" :value="minPersons + item">{{ minPersons + item }}</option>
        </select>
      </section>
    </div>
    <div>
      <section>
        <div>
          <v-date-picker
            v-if="showCalendar"
            mode="range"
            v-model="selectedDate"
            color="green"
            is-inline
            :is-expanded="true"
            :max-date="maxDate"
            :min-date="minDate"
            :attributes="attrs"
            :columns="layout.columns"
            :rows="layout.rows"
          />
          <span v-else>Loading...</span>
          <!-- {{
          this.selectedDate
          ? moment(this.selectedDate.end).format("Do MMM YYYY")
          : ""
          }}-->
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
      selectedDate: null,
      showCalendar: false,
      arrivalDays: [],
      minPersons: 0,
      maxPersons: 0,
      totalPersons: 0,
      isFullView: true,
      selectedPersons: null
    };
  },
  watch: {
    totalPersons: function(newVal, oldVal) {}
  },
  created() {
    let arrivalPromise = axios.get(
      "https://virtserver.swaggerhub.com/mnediw/booking/1.0.1/housings/" +
        this.ibe_housingid +
        "/arrivaldays"
    );
    let generalPromise = axios.get(
      "https://virtserver.swaggerhub.com/mnediw/booking/1.0.1/housings/" +
        this.ibe_housingid
    );

    let freePromise = axios.get(
      "https://virtserver.swaggerhub.com/mnediw/booking/1.0.1/housings/" +
        this.ibe_housingid +
        "/freedays"
    );

    Promise.all([arrivalPromise, freePromise]).then(values => {
      console.log(values);
      const arrivalDays = values[0];
      this.arrivalDays = arrivalDays.data;
      arrivalDays.data.forEach(i => {
        let date = i.split("-");
        this.attrs[1].dates.push(
          new Date(date[0], Number(date[1]) - 1, date[2])
        );
      });

      const freeDays = values[1];
      freeDays.data.forEach(i => {
        let date = i.split("-");
        this.attrs[2].dates.push(
          new Date(date[0], Number(date[1]) - 1, date[2])
        );
      });
      this.showCalendar = true;
    });

    generalPromise.then(({ data }) => {
      this.minPersons = data.minPersons;
      this.maxPersons = data.maxPersons;
      this.totalPersons = this.maxPersons - this.minPersons;
    });
  },
  props: ["ibe_housingid"],
  async mounted() {},
  computed: {
    attrs() {
      return [
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
        },
        {
          // dates: {
          //   start: minDate, // Jan 1st, 2018
          //   end: maxDate, // Jan 1st, 2019
          //   weekdays: [1, 7] // ...on Sundays and Saturdays
          // },
          dates: [],
          highlight: {
            color: "blue",
            fillMode: "solid",
            contentClass: "italic" // Class provided by TailwindCSS
          }
        },
        {
          dot: {
            color: "orange",
            fillMode: "light",
            contentClass: "italic" // Class provided by TailwindCSS
          },
          dates: []
        }
      ];
    },
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
    },
    layout() {
      return this.$screens({
        // Default layout for mobile
        default: {
          columns: 1,
          rows: 1,
          isExpanded: true
        },
        // Override for large screens
        lg: {
          columns: 4,
          rows: 3,
          isExpanded: false
        }
      });
    }
  },
  methods: {
    downloadLocalStorage(step, stepObj) {
      let obj = {
        ibe_housingid: this.ibe_housingid,
        start: this.moment(this.selectedDate.start).format("Do MMM YYYY"),
        end: this.moment(this.selectedDate.end).format("Do MMM YYYY"),
        ...stepObj
      };
      localStorage.setItem("step" + step, JSON.stringify(obj));
    },
    getDateAndPersons() {
      return {
        date: this.selectedDate,
        persons: this.selectedPersons
      };
    }
  },
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
