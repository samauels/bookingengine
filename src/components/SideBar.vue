<template>
  <div>
    <h4>Summary</h4>
    <!-- <div>
      <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p class="message">
              Already registered?
              <a href="#">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>-->
    <div style="padding-left:30px">
      <b-list-group>
        <b-list-group-item v-if="startDate && endDate">
          <b>Duration:</b>
          {{ startDate }} to {{ endDate }}
        </b-list-group-item>
        <b-list-group-item v-if="price">
          <b>Price:</b>
          {{ price }}
        </b-list-group-item>
        <!-- <b-list-group-item>
          <b>Family Name:</b> Test
        </b-list-group-item>
        <b-list-group-item>
          <b>First Name:</b> Test
        </b-list-group-item>
        <b-list-group-item>
          <b>Street:</b> Test
        </b-list-group-item>
        <b-list-group-item>
          <b>ZIP:</b> Test
        </b-list-group-item>-->
      </b-list-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SideBar",
  data: function() {
    return {
      startDate: null,
      endDate: null,
      minPersons: 0,
      maxPersons: 0,
      totalPersons: 0,
      price: null
    };
  },
  watch: {
    totalPersons: function(newVal, oldVal) {}
  },
  props: ["ibe_housingid"],
  mounted() {},
  methods: {
    updateDatesAndPrice() {
      const { start, end, price } = JSON.parse(localStorage.getItem("step1"));
      this.startDate = start;
      this.endDate = end;
      this.price = price;
    },
    updatePrice() {}
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

@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  padding: 45px;
  text-align: center;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
</style>
